const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://itish_jain:12345@cluster0.vxfie1s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbConnect = async()=>{
    const conn = await mongoose.connect(mongoURI,{
        dbName:"moonstone",
    })
    if(conn){
        return console.log("database connected successfully");
    }
    return console.log(err)
}

module.exports = dbConnect;