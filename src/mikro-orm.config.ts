import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Loan as LoanEntity } from './loans/entities/loan.entity';

export default defineConfig({
  driver: PostgreSqlDriver,
  entities: [LoanEntity],
  extensions: [Migrator],
  debug: true,
  dbName: 'loans_db',
  user: 'postgres',
  password: 'password',
});
