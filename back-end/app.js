require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const expenseRoute = require('./routes/expense');
const userRoute = require("./routes/users")
const sequelize = require('./utils/database.js');
const cors = require("cors");
app.use(cors());




// ........................................... ULRencoder, methodOverride................
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

sequelize.sync(/*{force:true}*/).then(u=>{
    app.listen(port, () => {
        console.log(`Booking app listening on port ${port}`)
      })
 }).catch(e=>{
     console.log(e);
 })


app.use("/expense/",expenseRoute);
app.use("/user/",userRoute);
app.get('/', (req, res) => {
  res.send('Hello World!')
})


