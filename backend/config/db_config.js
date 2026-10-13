import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    keepDefaultTimezone: false,
    ssl: { require: true },
  },
  timezone: 'Asia/Manila',
});

export { sequelize };
