const catchAsync = require('../utils/catchAsync');
// ............REQUIRED MODELS AND ROUTES...............
const Expense = require('../models/expense.js');
var perPage = 10;
module.exports.getAllExpenses = (async(req,res,next)=>{
    // .......FIND ALL........
    if(req.query.perPage!="null") perPage = parseInt(req.query.perPage);
    const page = req.query.page>1?parseInt(req.query.page):1;
    const exp = Expense.find({userId : req.user._id}).skip(perPage*(page-1)).limit(perPage);
    const expCount = Expense.find({userId : req.user._id}).count();
    const files = 0//req.user.getFileUrls();
    return Promise.all([exp,files,page,perPage,expCount]).then(msg=>{
      console.log(msg[0]);
      // msg[0].count = expCount||1; // to avoid unexpected behav at front end at pagination
      console.log(msg[0]);
      res.json(msg)
    })
  });

  module.exports.postExpense = catchAsync(async(req,res,next)=>{
    // .......... ADD ONE
    const {value,description,category} = req.body;
    let client = await Expense.create({value:parseInt(value) ,description, category,userId : req.user._id});
    // await client.save();
    res.send(client)
  })

  module.exports.updateExpense = catchAsync(async(req,res,next)=>{
    // ....................UPDATE SPECIFIC
    const {value,description,category} = req.body;

    // console.log(req.body,req.params.id);
    let client = await Expense.updateOne({ _id:req.params.id ,userId : req.user._id},{value:parseInt(value),description,category}); 
    res.send(client);
});

module.exports.deleteExpense = catchAsync(async(req,res,next)=>{
    let client = await Expense.deleteOne({
      _id:req.params.id, userId : req.user._id
    });
    res.send("deleted");
  });

