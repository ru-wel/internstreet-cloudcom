import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const Log = sequelize.define('try_logs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  executed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  email: { type: DataTypes.STRING, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  ip_address: { type: DataTypes.STRING, allowNull: false },
  os_version: { type: DataTypes.STRING, allowNull: false },
  processor: { type: DataTypes.STRING, allowNull: false },
  browser_type: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false }
);

export default Log;
