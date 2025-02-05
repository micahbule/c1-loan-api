import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Loan, LoanStatus } from './entities/loan.entity';
import { EntityManager } from '@mikro-orm/core';

async function buildLoanService(
  providers: Provider[] = [
    { provide: getRepositoryToken(Loan.name), useValue: {} },
    { provide: EntityManager, useValue: {} },
  ],
) {
  const module: TestingModule = await Test.createTestingModule({
    providers: [LoansService, ...providers],
  }).compile();

  return module.get<LoansService>(LoansService);
}

describe('LoansService', () => {
  it('should be defined', async () => {
    const service = await buildLoanService();
    expect(service).toBeDefined();
  });

  it('should create loan', async () => {
    const service = await buildLoanService([
      {
        provide: getRepositoryToken(Loan.name),
        useValue: { create: jest.fn() },
      },
      { provide: EntityManager, useValue: { persistAndFlush: jest.fn() } },
    ]);

    const loan = await service.create({
      applicantName: 'John Doe',
      requestedAmount: 10000,
    });

    expect(loan).toBeInstanceOf(Loan);
    expect(loan.applicantName).toEqual('John Doe');
    expect(loan.requestedAmount).toEqual(10000);
    expect(loan.status).toEqual(LoanStatus.PENDING);
  });

  it('should find loans', async () => {
    const service = await buildLoanService([
      {
        provide: getRepositoryToken(Loan.name),
        useValue: {
          find: jest.fn(() => [{ id: '1a', applicantName: 'John Doe' }]),
        },
      },
      { provide: EntityManager, useValue: {} },
    ]);

    const loans = await service.find();
    expect(loans).toEqual([{ id: '1a', applicantName: 'John Doe' }]);
  });

  it('should find loan by id', async () => {
    const service = await buildLoanService([
      {
        provide: getRepositoryToken(Loan.name),
        useValue: {
          findOneOrFail: jest.fn(() => ({
            id: '1a',
            applicantName: 'John Doe',
          })),
        },
      },
      { provide: EntityManager, useValue: {} },
    ]);

    const loan = await service.findById('1a');
    expect(loan).toEqual({ id: '1a', applicantName: 'John Doe' });
  });

  it('should partially update loan by id', async () => {
    const service = await buildLoanService([
      {
        provide: getRepositoryToken(Loan.name),
        useValue: {
          findOneOrFail: jest.fn(() => ({
            id: '1a',
            applicantName: 'John Doe',
          })),
        },
      },
      { provide: EntityManager, useValue: { flush: jest.fn() } },
    ]);

    const loan = await service.update('1a', { applicantName: 'Jane Doe' });
    expect(loan).toEqual({ id: '1a', applicantName: 'Jane Doe' });
  });

  it('should remove loan by id', async () => {
    const service = await buildLoanService([
      {
        provide: getRepositoryToken(Loan.name),
        useValue: {
          getReference: jest.fn(),
        },
      },
      { provide: EntityManager, useValue: { removeAndFlush: jest.fn() } },
    ]);

    await expect(service.remove('1a')).resolves.toBeUndefined();
  });
});
