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

exports.login = async(req,res,next)=>{
    try {
    const {email,password} = req.body;
    const user = await User.findOne({where:{email}});
    if(user){
        if(password===user.password) res.send("Login successful");
        else res.status(401).send("Incorrect Password or Email")
    }else throw new Error();
    } catch (error) {
        // console.log(error);
        res.status(404).send("user do not exist")
    }
    
}