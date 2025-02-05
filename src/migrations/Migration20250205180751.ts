import { Migration } from '@mikro-orm/migrations';

export class Migration20250205180751 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "loans" ("id" uuid not null default gen_random_uuid(), "applicant_name" varchar(255) not null, "requested_amount" int not null, "status" text check ("status" in ('PENDING', 'APPROVED', 'REJECTED')) not null default 'PENDING', "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "loans_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "loans" cascade;`);
  }

}
