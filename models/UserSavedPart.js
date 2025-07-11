const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserSavedPart = sequelize.define('UserSavedPart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  car_part_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  saved_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = UserSavedPart; 