import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AccountType, Currency } from 'src/banking/models/banking.enums';

@InputType()
export class OpenAccountInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  alias?: string;

  @Field(() => AccountType)
  @IsEnum(AccountType)
  type: AccountType;

  @Field(() => Currency)
  @IsEnum(Currency)
  currency: Currency;
}
