const mongoose = require('mongoose');

const dbConnect = async()=>{
    const conn = await mongoose.connect(process.env.mongourl,{
        dbName:"moonstone",
    })
    if(conn){
        return console.log("database connected successfully");
    }
    return console.log(err)
}

module.exports =dbConnect;