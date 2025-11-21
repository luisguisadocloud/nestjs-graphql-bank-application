import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { OpenAccountInput } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  public constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async openAccount(openAccountInput: OpenAccountInput): Promise<Account> {
    const { userId, alias, type, currency } = openAccountInput;
    const user: User | null = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }

    const account: Account = this.accountRepository.create({
      accountNumber: this.generateAccountNumber(),
      alias,
      type,
      currency,
      balance: '0',
      user,
    });

    await this.accountRepository.save(account);
    return account;
  }

  generateAccountNumber() {
    return `ACC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  async findById(id: string): Promise<Account> {
    const account: Account | null = await this.accountRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!account) throw new NotFoundException(`Account with ${id} not found`);
    return account;
  }

  async findByUser(userId: string): Promise<Account[]> {
    return await this.accountRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
