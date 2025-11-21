import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { TransactionStatus, TransactionType } from '../models/banking.enums';
import { DepositInput } from './dto/deposit-funds.input';
import { TransferFundsInput } from './dto/transfer-funds.input';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private readonly dataSource: DataSource,
  ) {}

  transferFunds(transferFundsInput: TransferFundsInput) {
    const { fromAccountId, toAccountId, amount, description } =
      transferFundsInput;

    if (fromAccountId === toAccountId) {
      throw new BadRequestException(`Cannot transfer to the same account`);
    }

    return this.dataSource.transaction(async (manager) => {
      const from = await manager.findOne(Account, {
        where: { id: fromAccountId },
      });
      const to = await manager.findOne(Account, { where: { id: toAccountId } });

      if (!from)
        throw new NotFoundException(
          `From account with id=${fromAccountId} not found`,
        );
      if (!to)
        throw new NotFoundException(
          `To account with id=${toAccountId} not found`,
        );

      if (from.currency !== to.currency) {
        throw new BadRequestException('Currency mismatch between accounts');
      }

      const fromBalance = Number(from.balance);
      if (fromBalance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      from.balance = (fromBalance - amount).toString();
      to.balance = (Number(to.balance) + amount).toString();

      await manager.save([from, to]);

      const transaction = this.transactionRepository.create({
        fromAccount: from,
        toAccount: to,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.COMPLETED,
        amount: amount.toString(),
        currency: from.currency,
        description: description,
      });

      await manager.save(transaction);

      return transaction;
    });
  }

  listByAccount(accountId: string) {
    return this.transactionRepository.find({
      where: [
        { fromAccount: { id: accountId } },
        { toAccount: { id: accountId } },
      ],
      relations: { fromAccount: true, toAccount: true },
      order: { createdAt: 'DESC' },
    });
  }

  deposit(depositInput: DepositInput) {
    const { toAccountId, amount, description } = depositInput;

    return this.dataSource.transaction(async (manager) => {
      const account = await manager.findOne(Account, {
        where: { id: toAccountId },
      });
      if (!account) {
        throw new NotFoundException(
          `To account with id=${toAccountId} not found`,
        );
      }

      account.balance = (Number(account.balance) + amount).toString();
      await manager.save(account);

      const transaction = this.transactionRepository.create({
        fromAccount: undefined,
        toAccount: account,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.COMPLETED,
        amount: amount.toString(),
        currency: account.currency,
        description,
      });

      await manager.save(transaction);

      return transaction;
    });
  }
}
