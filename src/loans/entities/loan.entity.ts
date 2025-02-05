import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Loan {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  applicantName: string;

  @Property()
  requestedAmount: number;

  @Enum(() => LoanStatus)
  status = LoanStatus.PENDING;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
