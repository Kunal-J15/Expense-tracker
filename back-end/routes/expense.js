const express = require('express');
var router = express.Router({mergeParams:true});
const expense = require("../controllers/expense");

router.route("/")
  .get(expense.getAllExpenses)
  .post(expense.postExpense)

 
// ...................................

  router.route("/:id")
  .put(expense.updateExpense)
  .delete(expense.deleteExpense)

  module.exports = router;
