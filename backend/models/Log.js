import { DataTypes } from 'sequelize';
import { rds_sequelize } from '../config/db_config_rds.js';

const Log = rds_sequelize.define('logs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  executed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  email: { type: DataTypes.STRING, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  ip_address: { type: DataTypes.STRING, allowNull: false },
  os_version: { type: DataTypes.STRING, allowNull: false },
  processor: { type: DataTypes.STRING, allowNull: true }, // change later
  browser_type: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false }
);

export default Log;
