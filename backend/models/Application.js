import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const Application = sequelize.define('try_application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  c_name: { type: DataTypes.STRING, allowNull: false },
  c_location: { type: DataTypes.STRING, allowNull: false },
  c_position: { type: DataTypes.STRING, allowNull: false },
  c_logo: { type: DataTypes.STRING, allowNull: false },
  resume: { type: DataTypes.STRING, allowNull: false },
  cover_letter: { type: DataTypes.STRING, allowNull: false },
  // Matches migration 004's CHECK constraint
  status: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['pending', 'approved', 'denied']] } },
  job_id: { type: DataTypes.INTEGER, allowNull: false, 
    references: {
      model: 'try_jobs',
      key: 'id',
    } },
  // Owner; null once the user is deleted. Applications are looked up by this, not email
  user_id: { type: DataTypes.INTEGER, allowNull: true,
    references: {
      model: 'try_users',
      key: 'id',
    } },
  }, { createdAt: false, updatedAt: true,
    // Matches migration 003: one application per student per job
    indexes: [{ unique: true, fields: ['user_id', 'job_id'] }],
  }
);

export default Application;