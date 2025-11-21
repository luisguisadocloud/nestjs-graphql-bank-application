import { Account } from 'src/banking/accounts/entities/account.entity';
import {
  Currency,
  TransactionStatus,
  TransactionType,
} from 'src/banking/models/banking.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({
    name: 'from_account',
    foreignKeyConstraintName: 'FK_TRANSACTION_FROM_ACCOUNT',
  })
  fromAccount?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({
    name: 'to_account',
    foreignKeyConstraintName: 'FK_TRANSACTION_TO_ACCOUNT',
  })
  toAccount?: Account;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  amount: string;

  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @Column({
    name: 'description',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
