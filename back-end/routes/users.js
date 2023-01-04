const express = require('express');
const  router = express.Router({mergeParams:true});
const userController = require('../controllers/user');
const catchAsync = require("../utils/catchAsync");


router.route("/")
        .get(catchAsync (async(req,res,next)=>{
            console.log(req.body);
        }))
        .post(catchAsync (userController.addUser))

router.post("/login",userController.login);

module.exports = router;