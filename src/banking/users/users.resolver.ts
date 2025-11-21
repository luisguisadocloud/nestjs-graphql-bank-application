import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/banking-graphql-types';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserModel)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}
