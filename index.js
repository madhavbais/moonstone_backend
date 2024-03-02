const express = require('express');
const app = express()
const env = require('dotenv').config();
const  bodyparser = require("body-parser");
const dbConnect = require('./config/dbconnect');
const cors = require('cors')
const PORT = process.env.PORT||8000;
const eventRoute = require('./routes/eventRoute');
const { errorhandler } = require('./middleware/errorhandler');
//database connectivity
dbConnect();
//configurations
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

//routing
app.use('/events',eventRoute);
app.use('/admin', adminRoute)
app.use(errorhandler)
app.listen(PORT,()=>{
    console.log(`server is starting !! at ${PORT}`);
})