/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AddGameDto } from '../data/dto/AddGameDto';
import { UpdateGameDto } from '../data/dto/UpdateGameDto';
import { DataNotFoundException } from 'util/exception/DataNotFoundException';
import { GameSaleEntity } from '../data/model/GameSalesEntity';
import { AuthenticatedUser } from 'src/feature/user/domain/AuthenticatedUser';
import { ValidationException } from 'util/exception/ValidationException';
import { APIFeatures } from 'util/API/Feature';
import { AuditEntity } from 'src/feature/Audit/data/model/AuditEntity';
import { resolveDateRange } from 'util/API/AggregateHelper';

@Injectable()
export class GameSaleService {
  async getGames(query) {
    let getGames: any = GameSaleEntity.find();

    //   if (deleted)
    //     getGames = GameSaleEntity.find({
    //       active: false,
    //     });
    const Game = new APIFeatures(getGames, query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const data = await Game.query.populate('recordedBy', 'name');
    return data;
  }

  async updateGame(id, game: UpdateGameDto) {
    try {
      const before = await GameSaleEntity.findById(id);
      const gameData = await GameSaleEntity.findByIdAndUpdate(id, game);
      const user = AuthenticatedUser.getInstance().userId;

      await AuditEntity.create({
        entity: 'GAME_SALE',
        entityId: gameData._id,
        action: 'UPDATE',
        performedBy: user,
        before,
        after: game,
      });
    } catch (error) {
      throw new ValidationException('cant update');
    }
    return 'updated';
  }

  async createGame(gameData: AddGameDto) {
    const user = AuthenticatedUser.getInstance().userId;
    gameData.recordedBy = user;

    const game = await GameSaleEntity.create(gameData);
    await AuditEntity.create({
      entity: 'GAME_SALE',
      entityId: game._id,
      action: 'CREATE',
      performedBy: user,
    });
    return 'Success';
  }
  async getSaleDate(input: string | { from: Date; to: Date }) {
    let from, to;
    if (typeof input !== 'string') {
      from = new Date(input.from);
      to = new Date(input.to);
    } else {
      from = resolveDateRange(input).from;
      to = resolveDateRange(input).to;
    }
    console.log(from, to);
    const gameSale = await GameSaleEntity.find({
      createdAt: {
        $gt: from,
        $lt: to,
      },
    });
    return gameSale;
  }
  async getGameById(id) {
    const game = await GameSaleEntity.findById(id);

    if (!game) throw new DataNotFoundException('Game Not Found');
    return game;
  }

  async deleteGame(id: string) {
    const found: any = await GameSaleEntity.findById(id);
    if (!found) {
      throw new DataNotFoundException('Game Not Found');
    }
    const old = found.toObject();
    found.isDeleted = true;
    await found.save();
    await AuditEntity.create({
      entity: 'GAME_SALE',
      entityId: found._id,
      before:old,
      action: 'DELETE',
      performedBy: AuthenticatedUser.getInstance().userId,
    });
  }
}
