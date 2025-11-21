import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  AccountType,
  Currency,
  TransactionStatus,
  TransactionType,
} from './banking.enums';

registerEnumType(AccountType, { name: 'AccountType' });
registerEnumType(Currency, { name: 'Currency' });
registerEnumType(TransactionType, { name: 'TransactionType' });
registerEnumType(TransactionStatus, { name: 'TransactionStatus' });

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AccountModel {
  @Field(() => ID)
  id: string;

  @Field()
  accountNumber: string;

  @Field({ nullable: true })
  alias?: string;

  @Field(() => AccountType)
  type: AccountType;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => Float)
  balance: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => UserModel)
  user: UserModel;
}

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id: string;

  @Field(() => AccountModel, { nullable: true })
  fromAccount?: AccountModel | null;

  @Field(() => AccountModel, { nullable: true })
  toAccount?: AccountModel | null;

  @Field(() => TransactionType)
  type: TransactionType;

  @Field(() => TransactionStatus)
  status: TransactionStatus;

  @Field(() => Float)
  amount: number;

  @Field(() => Currency)
  currency: Currency;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;
}
