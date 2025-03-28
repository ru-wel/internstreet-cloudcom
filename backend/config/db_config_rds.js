import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const rds_sequelize = new Sequelize(
 "postgres", // Database name
  "postgres", // Username
  "internstreetcloudcomputing", // Password
  {
    host: "internstreet-logs.c9gogia02y98.ap-southeast-1.rds.amazonaws.com", // RDS Endpoint
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
    logging: false
  }
);

// Test Connection
rds_sequelize
  .authenticate()
  .then(() => console.log('Connected to RDS successfully!'))
  .catch(err => console.error('Unable to connect to RDS:', err));

  // rds_sequelize.sync({ force: true }) // This will drop and recreate all tables!
  // .then(() => console.log('Database synced successfully'))
  // .catch(err => console.error('Error syncing database:', err));

 export { rds_sequelize };