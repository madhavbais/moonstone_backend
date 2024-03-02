const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {
            type: String
        },
        enrollment_no: {
            type: String
        },
        gender: {
            type: String
        },
        phone_no: {
            type: Number
        },
        email: {
            type: String
        }

    }
)

module.exports = mongoose.model('Team', teamSchema)