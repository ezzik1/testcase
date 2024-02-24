import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WRITE_CONNECTION_NAME } from './connection-names.const';
import { provideDatabaseConfig } from './database.config';
import { TransactionsEntity } from '../../../src/entities/transactions.entity';

const entities = [TransactionsEntity];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(provideDatabaseConfig)],
      name: WRITE_CONNECTION_NAME,
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('databaseWrite.host'),
        logging: false,
        useUTC: true,
        username: configService.getOrThrow('databaseWrite.username'),
        database: configService.getOrThrow('databaseWrite.database'),
        password: configService.getOrThrow('databaseWrite.password'),
        port: configService.getOrThrow('databaseWrite.port'),
        entities,
        schema: configService.getOrThrow('databaseWrite.schema'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmRootModule {}
