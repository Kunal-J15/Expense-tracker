const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isPrimium:Sequelize.BOOLEAN,
    lastTime:{
        type:Sequelize.DATE,
        defaultValue:new Date()
        }
});

module.exports = User;