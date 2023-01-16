const express = require('express');
var router = express.Router({mergeParams:true});
const expense = require("../controllers/expense");
const {isAuthentic,updateLastTime } = require("../utils/utils");
router.route("/")
  .get(isAuthentic, expense.getAllExpenses)
  .post(isAuthentic, updateLastTime,expense.postExpense)

 
// ...................................

  router.route("/:id")
  .put(isAuthentic, updateLastTime,expense.updateExpense)
  .delete(isAuthentic,updateLastTime, expense.deleteExpense)

  module.exports = router;
