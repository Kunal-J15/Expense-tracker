const express = require('express');
var router = express.Router({mergeParams:true});
const primiumController = require("../controllers/primium");
const {isAuthentic } = require("../utils/utils");
router.route("/")
            .get(isAuthentic,primiumController.purches);
router.post("/success/",isAuthentic,primiumController.successPurches);
router.post("/fail",isAuthentic,primiumController.failPurches)
module.exports = router;