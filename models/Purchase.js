const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Purchase = sequelize.define('Purchase', {
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
  status: {
    type: DataTypes.ENUM('completed', 'pending', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  purchase_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Purchase; 