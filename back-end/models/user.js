const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isPrimium:Boolean,
    lastTime:{
        type:String,
        defaultValue:new Date()
        },
    passwordLink:[
        {
            isActive:{
                type:Boolean 
            },
            link:{
                type:String
            }
        }
    ]
})

module.exports = mongoose.model("User",userSchema);
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
    isPrimium:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    lastTime:{
        type:Sequelize.DATE,
        defaultValue:new Date()
        }
});

// module.exports = User;