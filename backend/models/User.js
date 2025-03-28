import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const User = sequelize.define('try_users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  user_role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user"},
  location: { type: DataTypes.STRING, allowNull: true },
  number: { type: DataTypes.STRING(11), allowNull: true },
  bio: { type:DataTypes.STRING(300), allowNull: true },
  }, { createdAt: false, updatedAt: true, }
);

export default User;