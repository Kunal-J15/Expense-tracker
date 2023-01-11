const express = require('express');
var router = express.Router({mergeParams:true});
const password = require("../controllers/password");
const {isAuthentic } = require("../utils/utils");
router.post("/forgot",password.forgot);
router.get("/reset/:id",password.resetForm);
router.post("/reset/:id",password.reset);

module.exports = router