/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GameSaleController } from './gamesale.controller';
import { GameSaleService } from '../domain/gamesale.service';

@Module({
  imports: [],
  controllers: [GameSaleController],
  providers: [GameSaleService],
})
export class GameSaleModule {}
