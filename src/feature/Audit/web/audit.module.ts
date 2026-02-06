import { AuditController } from './audit.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuditService } from '../domain/audit.service';

@Module({
  imports: [],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
