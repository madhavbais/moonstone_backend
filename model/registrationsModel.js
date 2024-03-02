const { date } = require('joi');
const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const registrationSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
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
        required: true
    },
    date_of_registration: {
        type: Date,
        required: true
    },
    accept: {
        type: String,
        required: true
    },
    reg_id: {
        type: String,
        required: true
    },
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    
})

module.exports = mongoose.model('Registration', registrationSchema)