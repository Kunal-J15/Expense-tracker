const Razorpay = require('razorpay');
const Expense = require('../models/expense');
const FileUrl = require('../models/fileUrl');
const Order = require('../models/order');
const User = require('../models/user');
const sequelize = require('../utils/database');
const {uploadToAWS } = require("../utils/utils");

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

exports.leadboard =async(req,res,next)=>{
  const expenses = await User.findAll(
    {
      attributes:['id','name',[sequelize.fn("sum",sequelize.col("expenses.value")), "total"]],
      include:[
        {
          model: Expense,
          attributes:[]
        }
      ],
      group:['user.id'],
      order:[["total","DESC"]]
    }
  );
  res.json(expenses);
}

exports.downloadFile = async(req,res,next)=>{
  const expenses = await req.user.getExpenses()
  if(!expenses.length) return res.status(404).json({message:"No expense present"});

  const files = await req.user.getFileUrls({
    limit: 1, 
    order: [ [ 'createdAt', 'DESC' ]]
  });
  if(files.length && (new Date(req.user.lastTime).getTime()< new Date(files[files.length-1].updatedAt).getTime())){
    console.log("local link");
    return res.send(files[files.length-1].link);
  }
      


const data = JSON.stringify(expenses);
const name = `Expense${req.user.id + process.env.DB_HOST}/${Date.now()}.txt`;

const url = await uploadToAWS(data,name);
await FileUrl.create({link:url,userId : req.user.id})
  res.send(url);
}
