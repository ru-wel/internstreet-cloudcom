import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, 'supabase_user', process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'postgresql' 
// });

const sequelize = new Sequelize(process.env.DB_HOST);
// const sequelize = new Sequelize('postgresql://postgres.zfjzgvyyjhpbgbpmpeox:internstreetcloudcomputing@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres');

export { sequelize };