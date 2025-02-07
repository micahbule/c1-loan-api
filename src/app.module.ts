import { Module } from '@nestjs/common';
import { LoansModule } from './loans/loans.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoansModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          ...mikroOrmConfig,
          host: configService.get('DB_HOST') || 'localhost',
          port: configService.get('DB_PORT') || 5432,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
