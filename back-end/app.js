if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override');
const helmet = require("helmet");
const morgan = require('morgan');
const path = require("path");
const fs  = require("fs");
var autoIncrement = require('mongoose-auto-increment');
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const expenseRoute = require('./routes/expense');
const userRoute = require("./routes/users");
const primiumRoute = require("./routes/primium");
const passwordRoute = require("./routes/password");


// const sequelize = require('./utils/database.js');
const cors = require("cors");
// const User = require('./models/user');
// const Expense = require('./models/expense');
// const Order = require('./models/order');
// const PasswordLink = require('./models/forgotPassword');
// const FileUrl = require('./models/fileUrl');


app.use(cors({
  origin:"*",
}));
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));

// ........................................... ULRencoder, methodOverride................
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// User.hasMany(Expense);
// Expense.belongsTo(User);
// Order.belongsTo(User);
// User.hasMany(Order);
// PasswordLink.belongsTo(User);
// User.hasMany(PasswordLink);

// User.hasMany(FileUrl);
// FileUrl.belongsTo(User);

mongoose.connect(process.env.MONGO).then(connection=>{
  autoIncrement.initialize(connection);
  app.listen(process.env.PORT)
}).catch(e=>{
  console.log(e);
})

app.use("/expense/",expenseRoute);
app.use("/user/",userRoute);
app.use("/primium/",primiumRoute);
app.use("/password/",passwordRoute);
// app.use((req, res) => {
//   console.log(req.url);
//   res.sendFile(path.join(__dirname,"public",req.url))
// })


