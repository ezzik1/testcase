export const provideDatabaseConfig = () => ({
  databaseWrite: {
    type: 'postgres',
    host: process.env.DB_HOST ?? '127.0.0.1',
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    schema: process.env.DB_SCHEMA,
  },
});
