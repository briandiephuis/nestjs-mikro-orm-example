const host = process.env.DB_HOSTNAME || 'localhost';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const user = process.env.DB_USERNAME || 'test_user';
const password = process.env.DB_PASSWORD || 'test_password';
const dbName = process.env.DB_DATABASE || 'test_db';

const db = {
  host,
  port,
  user,
  password,
  dbName,
  clientUrl: `postgresql://${user}:${password}@${host}/${dbName}`,
};

export const environment = {
  db,
  isDevelopment: process.env.APP_ENV === 'development',
};
