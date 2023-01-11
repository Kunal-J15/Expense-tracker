require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override');

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
app.use(cors());




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


sequelize.sync({/*force:true*/}).then(u=>{
    app.listen(port, () => {
        console.log(`Booking app listening on port ${port}`)
      })
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


