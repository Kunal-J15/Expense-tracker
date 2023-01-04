const User = require("../models/user");


exports.addUser = async(req,res,next)=>{
    try {
    const {name,email,password} = req.body;
    const user = User.build({name,email,password});
    await user.save();
    res.send("succefuly saved")
    } catch (error) {
        // console.log(error);
        res.status(404).send("user already exist")
    }
    
}