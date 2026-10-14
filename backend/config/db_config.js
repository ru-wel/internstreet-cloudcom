import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Locally, add it to backend/.env; on Vercel, add it under Settings > Environment Variables and redeploy.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  // Passed in directly because Sequelize loads pg with a dynamic require that Vercel's bundler can't see
  dialectModule: pg,
  dialectOptions: {
    keepDefaultTimezone: false,
    ssl: { require: true },
  },
  timezone: 'Asia/Manila',
});

export { sequelize };
