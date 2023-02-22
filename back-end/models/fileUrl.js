const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");

const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("FileUrl",fileSchema);
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

// module.exports = FileUrl;