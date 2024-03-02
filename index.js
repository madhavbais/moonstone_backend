const express = require('express');
const app = express()
const env = require('dotenv').config();
const  bodyparser = require("body-parser");
const dbConnect = require('./config/dbconnect');
const cors = require('cors')
const PORT = process.env.PORT||8000;
const eventRoute = require('./routes/eventRoute');
const adminRoute=require('./routes/adminRoute');
// const CountsRoute =require('./routes/CountsRoutes');
const registrationRoute = require('./routes/registrationRoute')
const { errorhandler } = require('./middleware/errorhandler');
//database connectivity
dbConnect();
//configurations
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

//routing
app.use('/events',eventRoute);
// app.use('/count',CountsRoute)
app.use('/admin', adminRoute)
app.use('/registration', registrationRoute)
app.use(errorhandler)
app.listen(PORT,()=>{
    console.log(`server is starting !! at ${PORT}`);
})