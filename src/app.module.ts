import { AuditModule } from './feature/Audit/web/audit.module';
import { AuditService } from './feature/Audit/domain/audit.service';
import { ExpensesModule } from './feature/Expenses/web/expenses.module';
import { ExpensesService } from './feature/Expenses/domain/expenses.service';
import { GameSaleService } from './feature/gameSales/domain/gamesale.service';
import { GameSaleModule } from './feature/gameSales/web/gamesale.module';
import { GameSaleController } from './feature/gameSales/web/gamesale.controller';
import { UserModule } from './feature/user/web/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'util/auth/jwt/JwtStrategy';
@Module({
  imports: [
        AuditModule, 
    ExpensesModule,
    GameSaleModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [ JwtStrategy],
})
export class AppModule {}
