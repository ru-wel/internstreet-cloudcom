import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const Job = sequelize.define('try_jobs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  title: { type: DataTypes.STRING, allowNull: false },
  // description: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.JSONB, allowNull: false },
  logo: { type: DataTypes.STRING, allowNull: true },
  }, { createdAt: false, updatedAt: true, }
);

export default Job;