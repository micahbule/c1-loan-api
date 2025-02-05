import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Loan as LoanEntity } from './entities/loan.entity';

@Module({
  imports: [MikroOrmModule.forFeature([LoanEntity])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
