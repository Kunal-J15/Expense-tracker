const Sequelize  = require("sequelize");

if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  });

  module.exports = sequelize;