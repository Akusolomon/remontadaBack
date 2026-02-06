/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameSaleService } from '../domain/gamesale.service';
import { JwtAuthGuard } from 'util/auth/jwt/JwtAuthGuard';
import { UpdateGameDto } from '../data/dto/UpdateGameDto';
import { AddGameDto } from '../data/dto/AddGameDto';

@Controller('game')
export class GameSaleController {
    constructor(
        private gameService: GameSaleService
    ){}  
  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getGames(@Query() query) {
    const data = this.gameService.getGames(query);
    return data;
  }
    @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateGame(@Param('id') id, @Body() game: UpdateGameDto) {
    return this.gameService.updateGame(id, game);
  }

    @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createGame(
    @Body() gameData: AddGameDto) {
      console.log('Creating game with data:', gameData);
    return this.gameService.createGame(gameData);
  }
@Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getGameById(@Param('id') id) {
    return this.gameService.getGameById(id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  } 
    @Get('/game/byDate')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    getExpenseDate(@Query() data) {
      return this.gameService.getSaleDate(data);
    }
}
