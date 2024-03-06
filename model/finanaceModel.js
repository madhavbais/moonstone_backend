const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const financeSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  eventid:{
    type:String,
    required:true,
  },
  amount:{
    type:Number,
    amount:true,
  }
});
module.exports = mongoose.model("Finanace", financeSchema);
