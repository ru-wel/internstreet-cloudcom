import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const Application = sequelize.define('try_application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  email: { type: DataTypes.STRING, allowNull: false },
  c_name: { type: DataTypes.STRING, allowNull: false },
  c_location: { type: DataTypes.STRING, allowNull: false },
  c_position: { type: DataTypes.STRING, allowNull: false },
  resume: { type: DataTypes.STRING, allowNull: false },
  cover_letter: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  job_id: { type: DataTypes.INTEGER, allowNull: false, 
    references: {
      model: 'try_jobs', // TO BE CHANGED,
      key: 'id',
    } },
}, { timestamps: false }
);

export default Application;