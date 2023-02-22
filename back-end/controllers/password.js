
const User = require('../models/user');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// import { v4 as uuidv4 } from 'uuid'; 
const { v4: uuidv4 } = require('uuid');
// const PasswordLink = require('../models/forgotPassword');


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

    User.findOne({ email }).then(async(user) => {
        if (user) { 
          console.log(user.name);
            user.passwordLink.push({link:link,isActive:true});
            await user.save();
            res.json({message:"e-mail send to your mail id to reset password and will expire in 10 minutes"});
            return   transporter.sendMail(mailOptions, async function (error, info) {
                if (error) console.log(error); 
                else {
                  const linkUp = user.passwordLink.find(e=> e.link.toString() == req.params.id.toString() && isActive==true);
                  if(linkUp){
                    setTimeout(() => {
                      linkUp.isActive = false;
                      linkUp.save();
                    }, 10*60*1000);
                  }
                }
              });

        }else return res.status(404).send("email not found")

    }) 
}

module.exports.resetForm = async (req, res, next) => {
  console.log(req.params.id);
  const link = await User.findOne({$and:[{'passwordLink.link':req.params.id,},{
    'passwordLink.isActive': true }]});
  console.log(link);
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
  const user = await  User.findOne({$and:[
    {'passwordLink.link': req.params.id},
    {'passwordLink.isActive':true }
  ]});
  if(user){
    const hash = bcrypt.hashSync(password, saltRounds);
    user.password = hash;
   const link = user.passwordLink.find(e=> e.link.toString() == req.params.id.toString() && e.isActive==true);
   link.isActive = false;
   await user.save();
    return res.send(`Password is reset`)
  }
  return res.send("Link is invalid or expired");
}