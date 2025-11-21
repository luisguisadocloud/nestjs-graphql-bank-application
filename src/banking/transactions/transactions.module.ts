import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';
import { TransactionsResolver } from './transactions.resolver';

@Module({
  providers: [TransactionsService, TransactionsResolver],
  imports: [TypeOrmModule.forFeature([Transaction, Account])],
})
export class TransactionsModule {}
