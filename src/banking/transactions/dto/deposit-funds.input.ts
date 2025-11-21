import { Field, Float, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

@InputType()
export class DepositInput {
  @Field()
  @IsUUID()
  toAccountId: string;

  @Field(() => Float)
  @IsPositive()
  amount: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
