/*
    https://docs.nestjs.com/providers#services
    */

import { Injectable } from '@nestjs/common';
import { DataNotFoundException } from 'util/exception/DataNotFoundException';
import { AuthenticatedUser } from 'src/feature/user/domain/AuthenticatedUser';
import { ValidationException } from 'util/exception/ValidationException';
import { APIFeatures } from 'util/API/Feature';
import { ExpenseEntity } from '../data/model/ExpensesEntity';
import { AddExpenseDto } from '../data/dto/AddExpenseDto';
import { UpdateExpenseDto } from '../data/dto/UpdateExpenseDto';
import { GameSaleEntity } from 'src/feature/gameSales/data/model/GameSalesEntity';
import { AggregateTotal, resolveDateRange } from 'util/API/AggregateHelper';
import { AuditEntity } from 'src/feature/Audit/data/model/AuditEntity';

@Injectable()
export class ExpensesService {
  async getExpenses(query) {
    let getExpenses: any = ExpenseEntity.find({});

    //   if (deleted)
    //     getExpenses = ExpenseEntity.find({
    //       active: false,
    //     });
    const Expense = new APIFeatures(getExpenses, query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const data = await Expense.query;
    return data;
  }

  async updateExpense(id, expense: UpdateExpenseDto) {
    try {
      const before = await ExpenseEntity.findById(id);
      const data = await ExpenseEntity.findByIdAndUpdate(id, expense);
      const user = AuthenticatedUser.getInstance().userId;

      await AuditEntity.create({
        entity: 'EXPENSE',
        entityId: data._id,
        action: 'UPDATE',
        performedBy: user,
        before,
        after: expense,
      });
    } catch (error) {
      throw new ValidationException('cant update');
    }
    return 'updated';
  }
  async getExpenseDate(input: string | { from: Date; to: Date }) {
    let from, to;
    if (typeof input !== 'string') {
      from = new Date(input.from);
      to = new Date(input.to);
    } else {
      from = resolveDateRange(input).from;
      to = resolveDateRange(input).to;
    }

    const expenseData = await ExpenseEntity.find({
      createdAt: {
        $gt: from,
        $lt: to,
      },
    });
    return expenseData;
  }
  async createExpense(expenseData: AddExpenseDto) {
    const user = AuthenticatedUser.getInstance().userId;
    expenseData.recordedBy = user;

    const data = await ExpenseEntity.create(expenseData);
    await AuditEntity.create({
      entity: 'EXPENSE',
      entityId: data._id,
      action: 'CREATE',
      performedBy: user,
    });
  }
  async getFinancialReport(input: string | { from: Date; to: Date }) {
    let from, to;
    if (typeof input !== 'string') {
      from = new Date(input.from);
      to = new Date(input.to);
    } else {
      from = resolveDateRange(input).from;
      to = resolveDateRange(input).to;
    }
    console.log(from, to);

    const income = await AggregateTotal(
      GameSaleEntity,
      'totalAmount',
      'createdAt',
      from,
      to,
    );

    const expense = await AggregateTotal(
      ExpenseEntity,
      'amount',
      'createdAt',
      from,
      to,
    );

    return {
      from,
      to,
      income,
      expense,
      profit: income - expense,
    };
  }

  async getExpenseById(id) {
    const expense = await ExpenseEntity.findById(id);

    if (!expense) throw new DataNotFoundException('expense Not Found');
    return expense;
  }

  async deleteExpense(id: string) {
    const found: any = await ExpenseEntity.findById(id);
    if (!found) {
      throw new DataNotFoundException('Expense Not Found');
    }
    const old = found.toObject();
    found.isDeleted = true;
    const user = AuthenticatedUser.getInstance().userId;
    await found.save();
    await AuditEntity.create({
      entity: 'EXPENSE',
      entityId: found._id,
      before: old,
      action: 'DELETE',
      performedBy: user,
    });
  }
}
