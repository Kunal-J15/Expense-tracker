const catchAsync = require('../utils/catchAsync');
// ............REQUIRED MODELS AND ROUTES...............
const Expense = require('../models/expense.js');
var perPage = 10;
module.exports.getAllExpenses = (async(req,res,next)=>{
    // .......FIND ALL........
    if(req.query.perPage!="null") perPage = parseInt(req.query.perPage);
    const page = req.query.page>1?parseInt(req.query.page):1;
    const exp = Expense.findAndCountAll({where:{userId : req.user.id},
      offset: perPage*(page-1),
      limit: perPage});
    const files = req.user.getFileUrls();
    return Promise.all([exp,files,page,perPage]).then(msg=>{
      if(!msg[0].count)msg[0].count = 1; // to avoid unexpected behav at front end at pagination
      res.json(msg)
    })
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

