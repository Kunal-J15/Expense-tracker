const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");

const PasswordLink = sequelize.define("PasswordLink",{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true, 
    },
    isActive:{
        type:Sequelize.BOOLEAN  
    }
})

module.exports = PasswordLink;