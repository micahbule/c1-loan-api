import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity({ tableName: 'loans' })
export class Loan {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @ApiProperty()
  id: string;

  @Property()
  @ApiProperty()
  applicantName: string;

  @Property()
  @ApiProperty()
  requestedAmount: number;

  @Enum(() => LoanStatus)
  @ApiProperty({ enum: LoanStatus })
  status = LoanStatus.PENDING;

  @Property()
  @ApiProperty({ type: 'string' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty({ type: 'string' })
  updatedAt = new Date();
}
