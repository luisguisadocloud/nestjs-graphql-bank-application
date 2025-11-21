import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionModel } from '../models/banking-graphql-types';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { TransferFundsInput } from './dto/transfer-funds.input';

@Resolver(() => TransactionModel)
export class TransactionsResolver {
  constructor(private readonly transactionService: TransactionsService) {}

  @Query(() => [TransactionModel])
  transactionByAccount(
    @Args('accountId', { type: () => ID }) accountId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.listByAccount(accountId);
  }

  @Mutation(() => TransactionModel)
  transferFunds(
    @Args('input') input: TransferFundsInput,
  ): Promise<Transaction> {
    return this.transactionService.transferFunds(input);
  }
}
