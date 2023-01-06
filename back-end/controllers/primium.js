const Razorpay = require('razorpay');
const Order = require('../models/order');


exports.purches = async (req,res,next)=>{
    var instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET,
      });
      const amount =2500;
      instance.orders.create({ "amount": amount, "currency": "INR"},(err,order)=>{
        if(err) {console.log(err); throw new Error();}
        req.user.createOrder({orderId:order.id,status:"Pending"})
        .then(res.status(201).json({order,key_id:instance.key_id}))
        .catch(e=>{
            throw new Error(e);
        });
      }
      )
}

exports.successPurches = async(req,res,next)=>{
   const {razorpay_payment_id:payment_id,razorpay_order_id:order_id}  = req.body;
   Promise.all([Order.update({paymentId : payment_id,status : "completed"},{where:{orderId:order_id}}),req.user.update({isPrimium:true}).then(()=>{
    return res.status(202).json({success:true,message:"transaction successful"});
   })]);
}

exports.failPurches = async(req,res,next)=>{
   const {order_id}  = req.body;
   Order.update({status : "failed"},{where:{orderId:order_id}}).then(()=>{
    return res.status(202).json({success:false,message:"transaction failed"});
   })
}
