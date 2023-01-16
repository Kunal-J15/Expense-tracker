if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override');
const helmet = require("helmet");
const morgan = require('morgan');
const path = require("path");
const fs  = require("fs");

const app = express();
const port = 3000;
const expenseRoute = require('./routes/expense');
const userRoute = require("./routes/users");
const primiumRoute = require("./routes/primium");
const passwordRoute = require("./routes/password");


const sequelize = require('./utils/database.js');
const cors = require("cors");
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const PasswordLink = require('./models/forgotPassword');
const FileUrl = require('./models/fileUrl');

app.use(cors());
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));


// ........................................... ULRencoder, methodOverride................
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

User.hasMany(Expense);
Expense.belongsTo(User);
Order.belongsTo(User);
User.hasMany(Order);
PasswordLink.belongsTo(User);
User.hasMany(PasswordLink);

User.hasMany(FileUrl);
FileUrl.belongsTo(User);

sequelize.sync({/*force:true*/}).then(()=>{
    app.listen(process.env.PORT)
 }).catch(e=>{
     console.log(e);
 })


app.use("/expense/",expenseRoute);
app.use("/user/",userRoute);
app.use("/primium/",primiumRoute);
app.use("/password/",passwordRoute);
app.get('/', (req, res) => {
  res.send('Hello World!')
})


