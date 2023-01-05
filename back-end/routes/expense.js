const express = require('express');
var router = express.Router({mergeParams:true});
const expense = require("../controllers/expense");
const {isAuthentic } = require("../utils/utils");
router.route("/")
  .get(isAuthentic, expense.getAllExpenses)
  .post(isAuthentic, expense.postExpense)

 
// ...................................

  router.route("/:id")
  .put(isAuthentic, expense.updateExpense)
  .delete(isAuthentic, expense.deleteExpense)

  module.exports = router;
