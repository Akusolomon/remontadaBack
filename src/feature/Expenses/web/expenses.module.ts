import { ExpensesController } from './expenses.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ExpensesService } from '../domain/expenses.service';

@Module({
  imports: [],
  controllers: [
        ExpensesController, ],
  providers: [ExpensesService],
})
export class ExpensesModule {}
