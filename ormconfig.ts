import { DataSource } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['config/database/migrations/*.ts'],
  schema: process.env.DB_SCHEMA,
});
