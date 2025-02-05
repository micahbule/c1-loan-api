import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoansModule } from './loans/loans.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Loan as LoanEntity } from './loans/entities/loan.entity';

@Module({
  imports: [
    LoansModule,
    MikroOrmModule.forRoot({
      entities: [LoanEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
