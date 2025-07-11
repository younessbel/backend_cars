const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize; 