import { PartialType } from '@nestjs/swagger';
import { CreateLoanDto } from './create-loan.dto';
import { LoanStatus } from '../entities/loan.entity';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @IsEnum(LoanStatus)
  @ApiProperty({ enum: LoanStatus })
  status?: LoanStatus;
}
