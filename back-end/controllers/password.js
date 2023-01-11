
const User = require('../models/user');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// import { v4 as uuidv4 } from 'uuid'; 
const { v4: uuidv4 } = require('uuid');
const PasswordLink = require('../models/forgotPassword');


const transporter = nodemailer.createTransport({
  service: "gmail",
  host:'smtp.gmail.com',
  secure:false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});




module.exports.forgot = (req, res, next) => {
    const link = uuidv4();
    const { email } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset link",
        text: `http://localhost:3000/password/reset/${link}`,
    };

    User.findOne({ where: { email } }).then(user => {
        if (user) { 
            user.createPasswordLink({id:link,isActive:true});
            res.json({message:"e-mail send to your mail id to reset password and will expire in 10 minutes"});
            return   transporter.sendMail(mailOptions, async function (error, info) {
                if (error) console.log(error); 
                else {
                  const linkUp = await PasswordLink.findOne({
                    where:{
                      id:link,
                      isActive:true
                    }
                  });
                  if(linkUp){
                    setTimeout(() => {
                      linkUp.update({isActive:false});
                    }, 10*60*1000);
                  }
                }
              });

        }else return res.status(404).send("email not found")

    }) 
}

module.exports.resetForm = async (req, res, next) => {
  const link = await PasswordLink.findOne({
    where:{
      id:req.params.id,
      isActive:true
    },
    include:{
      model:User,
    }
  });
  if(link){
   
    return res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h3>Link will expire in 10 minutes</h3>
        <form action="http://localhost:3000/password/reset/${req.params.id}" method="post">
            <label for="pass">Password</label>
            <input type="text" name="password" id="pass">
            <button>Set password</button>
        </form>
    </body>
    </html>`)
  } 
  return res.send("Link is invalid or expired");
}

module.exports.reset = async (req, res, next) => {
  const {password} = req.body
  const user = await  User.findOne({
    include:{
      model:PasswordLink,
      where:{
        id:req.params.id,
        isActive:true
      }
    }
  });
  if(user){
    const hash = bcrypt.hashSync(password, saltRounds);
   await user.update({password:hash});
   const link = await PasswordLink.findOne({where:{ id:req.params.id }})
   link.isActive = false;
   await link.save();
    return res.send(`Password is reset`)
  }
  return res.send("Link is invalid or expired");
}