const Sequelize  = require("sequelize");
const sequelize = require("../utils/database");

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    paymentId:String,
    orderId:String,
    status:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})
module.exports = mongoose.model("Order",orderSchema);
const Order = sequelize.define("Order",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})

// module.exports = Order;