import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const rds_sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_NAME, // Username
  process.env.DB_PASS, // Password
  {
    host: process.env.RDS_DB_HOST, // RDS Endpoint
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