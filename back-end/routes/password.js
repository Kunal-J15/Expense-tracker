const express = require('express');
var router = express.Router({mergeParams:true});
const password = require("../controllers/password");
const {isAuthentic } = require("../utils/utils");
router.post("/forgot",password.forgot);

module.exports = router