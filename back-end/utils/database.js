const Sequelize  = require("sequelize");
const sequelize = new Sequelize('expense-app', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  module.exports = sequelize;