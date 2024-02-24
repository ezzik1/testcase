import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WRITE_CONNECTION_NAME } from '../config/database/typeorm/connection-names.const';
import { HttpModule } from '@nestjs/axios';
import { TransactionsRepository } from './app.repository';
import { AppSchedulle } from './app.schedulle';
import { TransactionsEntity } from './entities/transactions.entity';
import { TypeOrmRootModule } from '../config/database/typeorm/typeorm-root.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmRootModule,
    TypeOrmModule.forFeature([TransactionsEntity], WRITE_CONNECTION_NAME),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransactionsRepository, AppSchedulle],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly service: AppService) {}

  public async onModuleInit(): Promise<void> {
    this.service.addInformationToDb();
  }
}
