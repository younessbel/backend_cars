const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const CarPart = sequelize.define('CarPart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  short_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diagram_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = CarPart; 