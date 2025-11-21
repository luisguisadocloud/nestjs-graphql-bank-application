import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountModel } from '../models/banking-graphql-types';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { OpenAccountInput } from './dto/create-account.dto';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => AccountModel)
  async account(@Args('id', { type: () => ID }) id: string) {
    return this.accountsService.findById(id);
  }

  @Query(() => [AccountModel])
  async accountByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Account[]> {
    return this.accountsService.findByUser(userId);
  }

  @Mutation(() => AccountModel)
  async openAccount(@Args('input') input: OpenAccountInput): Promise<Account> {
    return this.accountsService.openAccount(input);
  }
}
