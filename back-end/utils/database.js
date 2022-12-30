const Sequelize  = require("sequelize");
const sequelize = new Sequelize('appoint-app', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = sequelize;