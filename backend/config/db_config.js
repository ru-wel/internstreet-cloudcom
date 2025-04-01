import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(`postgresql://postgres.zfjzgvyyjhpbgbpmpeox:${process.env.JWT_SECRET}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`, {
  dialect: 'postgres',
  dialectOptions: {
    keepDefaultTimezone: false,
  },
  timezone: 'Asia/Manila',
});

export { sequelize };