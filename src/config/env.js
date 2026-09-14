// src/config/env.js
import 'dotenv/config';

export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'pay_center',
    user: process.env.DB_USER || 'app_user',
    password: process.env.DB_PASSWORD || '',
  },
  expiration: {
    cron: process.env.EXPIRATION_JOB_CRON || '*/5 * * * *',
  },
};