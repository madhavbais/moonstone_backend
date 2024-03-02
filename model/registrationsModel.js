const { date } = require('joi');
const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const registrationSchema = new Schema({
    reg_id:{
        type: Number
    },
    receipt_id: {
        type: Number
    },
    name: {
        type: String
    },
    phone_no: {
        type: Number
    },

    aadhar_no: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    event_category: {
        type: String
    },
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    team_name: {
        type: String
    },
    enrollment_no: {
        type: String
    },
    college: {
        type: String
    },
    fees: {
        type: Number
    },
    participant_status: {
        type: String
    },
    payment_status: {
        type: String
    },
    utr: {
        type:String
    },
    date_of_registration: {
        type: date
    }
})

module.exports = mongoose.model('Registration', registrationSchema)