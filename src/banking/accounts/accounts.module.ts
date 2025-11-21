import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AccountResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Module({
  providers: [AccountsService, AccountResolver],
  imports: [TypeOrmModule.forFeature([Account, User])],
  exports: [AccountsService],
})
export class AccountsModule {}
