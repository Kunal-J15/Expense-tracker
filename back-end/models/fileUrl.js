const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");

const FileUrl = sequelize.define("FileUrl",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    link:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

module.exports = FileUrl;