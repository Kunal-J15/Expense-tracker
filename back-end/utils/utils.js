const User = require("../models/user");
var jwt = require('jsonwebtoken');

exports.hashId = function (id) {
    return jwt.sign({id}, process.env.SECRET);
}

exports.isAuthentic = async(req,res,next)=>{
    try {
        const hash = req.headers.athentication;
        var decoded = jwt.verify(hash, process.env.SECRET);
        req.user =  await User.findOne({where:{id:decoded.id}});
        if(req.user) return next();
        console.log("incomming");
        res.status(401).send("Login first")
    } catch (error) {
        res.status(401).send("Login first")
    }
    

    // const user = await User.findOne({where:{id}});
    // if(user) {
    //     console.log("yup");
    //     next();
    // }
    // else{
    //     console.log("no");
    //     res.status(401).send("login first");
    // }
}