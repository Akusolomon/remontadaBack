/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from '../domain/expenses.service';
import { JwtAuthGuard } from 'util/auth/jwt/JwtAuthGuard';
import { AddExpenseDto } from '../data/dto/AddExpenseDto';
import { UpdateExpenseDto } from '../data/dto/UpdateExpenseDto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getExpenses(@Query() query) {
    const data = this.expensesService.getExpenses(query);
    return data;
  }
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateExpenses(@Param('id') id, @Body() expenses: UpdateExpenseDto) {
    return this.expensesService.updateExpense(id, expenses);
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createExpense(@Body() expenseData: AddExpenseDto) {
    return this.expensesService.createExpense(expenseData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  deleteExpense(@Param('id') id: string) {
    return this.expensesService.deleteExpense(id);
  }

  @Get('/financial/byDate')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getFinancialReportByDate(@Query() data) {
    return this.expensesService.getFinancialReport(data);
  }
  @Get('report/:date')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getFinancialReport(@Param('date') data) {
    return this.expensesService.getFinancialReport(data);
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getExpenseById(@Param('id') id) {
    return this.expensesService.getExpenseById(id);
  }
  @Get('/expense/byDate')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getExpenseDate(@Query() data) {
    return this.expensesService.getExpenseDate(data);
  }
}
