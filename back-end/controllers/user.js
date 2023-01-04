const User = require("../models/user");


exports.addUser = async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = User.build({name,email,password});
    await user.save();
    res.send("succefuly saved")
}