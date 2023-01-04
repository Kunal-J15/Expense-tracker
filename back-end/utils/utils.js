const User = require("../models/user");
exports.isAuthentic = async(req,res,next)=>{
    const {id} = req.params;
    const user = await User.findOne({where:{id}});
    if(user) {
        console.log("yup");
        next();
    }
    else{
        console.log("no");
        res.status(401).send("login first");
    }
}