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
const countRoute = require('./routes/CountsRoute');
const utrRoute =require('./routes/utrRoute');
const registrationRoute = require('./routes/registrationRoute')
const { errorhandler } = require('./middleware/errorhandler');
const cookieparser = require('cookie-parser');
//database connectivity
dbConnect();
//configurations
app.use(bodyparser.json());
app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended:false}))

//routing
app.use('/events',eventRoute);
app.use('/utrs', utrRoute);
app.use('/counts', countRoute);
// app.use('/count',CountsRoute)
app.use('/admin', adminRoute)
app.use('/registration', registrationRoute)
app.use(errorhandler)
app.listen(PORT,()=>{
    console.log(`server is starting !! at ${PORT}`);
})