const catchAsync = require('../utils/catchAsync');
// ............REQUIRED MODELS AND ROUTES...............
const Expense = require('../models/expense.js');

module.exports.getAllExpenses = (async(req,res,next)=>{
    // .......FIND ALL........
    const clients = await Expense.findAll({where:{userId : req.user.id}}); 
    res.send(clients)
  });

  module.exports.postExpense = catchAsync(async(req,res,next)=>{
    // .......... ADD ONE
    const {value,description,category} = req.body;
    let client = await Expense.build({value:parseInt(value) ,description, category,userId : req.user.id});
    await client.save();
    res.send(client)
  })

  module.exports.updateExpense = catchAsync(async(req,res,next)=>{
    // ....................UPDATE SPECIFIC
    const {value,description,category} = req.body;

    // console.log(req.body,req.params.id);
    let client = await Expense.update({value:parseInt(value),description,category},{where:{ id:req.params.id ,userId : req.user.id}}); 
    res.send(client);
});

module.exports.deleteExpense = catchAsync(async(req,res,next)=>{
    let client = await Expense.destroy({where:{
      id:req.params.id, userId : req.user.id
    }});
    res.send("deleted");
  });

