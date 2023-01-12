const express = require('express');
var router = express.Router({mergeParams:true});
const primiumController = require("../controllers/primium");
const {isAuthentic, isPrimium } = require("../utils/utils");
// const { route } = require('./expense');
router.get(isAuthentic,primiumController.purches);

router.get("/leadboard",isAuthentic,isPrimium,primiumController.leadboard)
router.get("/download/",isAuthentic,isPrimium,primiumController.downloadFile)
router.post("/success/",isAuthentic,primiumController.successPurches);
router.post("/fail",isAuthentic,primiumController.failPurches)
module.exports = router;