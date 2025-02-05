import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { LoanStatus } from '../entities/loan.entity';
import { IsEnum } from 'class-validator';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @IsEnum(LoanStatus)
  status?: LoanStatus;
}
