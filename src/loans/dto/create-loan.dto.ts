import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Loan } from '../entities/loan.entity';

export class CreateLoanDto {
  static createFromDto(dto: CreateLoanDto): Loan {
    const loan = new Loan();

    loan.applicantName = dto.applicantName;
    loan.requestedAmount = dto.requestedAmount;

    return loan;
  }

  @IsString()
  applicantName: string;

  @IsNumber()
  @IsPositive()
  requestedAmount: number;
}
