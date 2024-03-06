const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const registrationSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone_no: {
        type: Number,
        required: true
    },
    aadhar_no: {
        type: String,
        required: true
    },
    utr: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventID: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "not registered",
    },
    date_of_registration: {
        type:String
    },
    accept: {
        type: Boolean,
        default: false,
        
    },
    reg_id: {
        type: Number,
        required: true
    },
    team: [
        {
        name: {
            type: String
        },
        aadhar_no: {
            type: String
        } 
        }
    ],
    
})

module.exports = mongoose.model('Registration', registrationSchema)