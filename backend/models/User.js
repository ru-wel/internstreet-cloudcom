import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db_config.js';

const User = sequelize.define('try_users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  name: { type: DataTypes.STRING(100), allowNull: false, validate: {
    notNull: { msg: 'Enter a name.' },
    notBlank(value) { if (!String(value).trim()) throw new Error('Enter a name.'); },
    len: { args: [1, 100], msg: 'Name must be 100 characters or fewer.' },
  } },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true, validate: {
    notNull: { msg: 'Enter an email address.' },
    isEmail: { msg: 'Enter a valid email address.' },
    len: { args: [1, 100], msg: 'Email must be 100 characters or fewer.' },
  } },
  password: { type: DataTypes.STRING, allowNull: false },
  // Matches migration 005's CHECK constraint
  user_role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user", validate: { isIn: [['user', 'admin']] } },
  location: { type: DataTypes.STRING, allowNull: true },
  number: { type: DataTypes.STRING(11), allowNull: true },
  bio: { type:DataTypes.STRING(300), allowNull: true },
  }, { createdAt: false, updatedAt: true, }
);

export default User;