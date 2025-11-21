import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionModel } from '../models/banking-graphql-types';
import { DepositInput } from './dto/deposit-funds.input';
import { TransferFundsInput } from './dto/transfer-funds.input';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Resolver(() => TransactionModel)
export class TransactionsResolver {
  constructor(private readonly transactionService: TransactionsService) {}

  @Query(() => [TransactionModel])
  transactionsByAccount(
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

  @Mutation(() => TransactionModel)
  deposit(@Args('input') input: DepositInput): Promise<Transaction> {
    return this.transactionService.deposit(input);
  }
}
