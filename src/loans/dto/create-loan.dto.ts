import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Loan } from '../entities/loan.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  static createFromDto(dto: CreateLoanDto): Loan {
    const loan = new Loan();

    loan.applicantName = dto.applicantName;
    loan.requestedAmount = dto.requestedAmount;

    return loan;
  }

  @IsString()
  @ApiProperty({
    example: 'John Doe',
  })
  applicantName: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 10000 })
  requestedAmount: number;
}
