import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { LoanStatus } from '../entities/loan.entity';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  status?: LoanStatus;
}
