const mongoose = require("mongoose");
const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");
const expenseSchema = new mongoose.Schema({
    value:{
        type:Number,
        require:true
    },
    description:String,
    category:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})
// expenseSchema.plugin(autoIncrement.plugin, 'Expense');
module.exports = mongoose.model("Expense",expenseSchema);
const Expense = sequelize.define("expense",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    value:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING
    }
}) 
