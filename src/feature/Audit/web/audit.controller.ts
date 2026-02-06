/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuditService } from '../domain/audit.service';
import { JwtAuthGuard } from 'util/auth/jwt/JwtAuthGuard';

@Controller('audit')
export class AuditController {
  constructor(private auditService: AuditService) {}
    @Get('/logs')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async getAuditLogsSe(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('admin') admin?: string,
    @Query('action') action?: string,
    @Query('entity') entity?: string,
    @Query('search') search?: string,
  ) {
    // Convert dates if provided
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    // Build query string for APIFeatures
    const queryStr: any = {};
    if (search) queryStr.search = search;

    const logs = await this.auditService.getAuditLogss(
      queryStr,
      action,
      admin,
      entity,
      fromDate,
      toDate,
    );

    return {
      success: true,
      data: logs,
    };
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAuditLogs() {
    return this.auditService.getAuditLogs();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAuditLogById(@Param('id') id: string) {
    return this.auditService.getAuditLogById(id);
  }
  @Get('entity/:entity/:entityId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAuditLogsByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditService.getAuditLogsByEntity(entity, entityId);
  }
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAuditLogsByUser(@Param('userId') userId: string) {
    return this.auditService.getAuditLogsByUser(userId);
  }
  @Get('from-to/:from/:to')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAuditFromToDates(@Param('from') from: Date, @Param('to') to: Date) {
    return this.auditService.getAuditFromToDates(from, to);
  }

  // audit.controller.ts - Add this endpoint

}
