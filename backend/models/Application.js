import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const Application = sequelize.define('try_application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  email: { type: DataTypes.STRING, allowNull: false },
  c_name: { type: DataTypes.STRING, allowNull: false },
  c_position: { type: DataTypes.STRING, allowNull: false },
  resume: { type: DataTypes.STRING, allowNull: false },
  cover_letter: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false }
);

export default Application;