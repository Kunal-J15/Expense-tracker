const User = require("../models/user");
const bcrypt = require('bcrypt');
const {hashId} = require("../utils/utils");
const saltRounds = 10;

exports.addUser = async(req,res,next)=>{
    try {
    const {name,email,password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = User.build({name,email,password:hash});
    await user.save();
    res.send("succefuly saved")
   
    } catch (error) {
        console.log(error);
        res.status(404).send("user already exist try with different email")
    }
    
}

exports.login = async(req,res,next)=>{
    try {
    const {email,password} = req.body;
    const user = await User.findOne({where:{email}});
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(err) return res.sendStatus(300).send("something went wrong")
            if(result) res.json({success:true,message:"logine successful", id:hashId(user.id)});
            else res.status(401).send("Incorrect Password or Email")
        });
    }else throw new Error();
    } catch (error) {
        // console.log(error);
        res.status(404).send("user do not exist")
    }
    
}