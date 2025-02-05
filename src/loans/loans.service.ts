import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Loan } from './entities/loan.entity';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: EntityRepository<Loan>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    const loan = CreateLoanDto.createFromDto(createLoanDto);

    this.loanRepository.create(loan);
    await this.entityManager.persistAndFlush(loan);

    return loan;
  }

  async find(query: FilterQuery<Loan>) {
    return await this.loanRepository.find(query);
  }

  async findById(id: string) {
    return await this.loanRepository.findOneOrFail({ id });
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const loan = await this.loanRepository.findOneOrFail({ id });

    if (updateLoanDto.applicantName) {
      loan.applicantName = updateLoanDto.applicantName;
    }

    if (updateLoanDto.requestedAmount) {
      loan.requestedAmount = updateLoanDto.requestedAmount;
    }

    if (updateLoanDto.status) {
      loan.status = updateLoanDto.status;
    }

    await this.entityManager.flush();

    return loan;
  }

  async remove(id: string) {
    const loanRef = this.loanRepository.getReference(id);
    await this.entityManager.removeAndFlush(loanRef);
  }
}
