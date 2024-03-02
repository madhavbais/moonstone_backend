const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {
            type: String
        },
        aadhar_no: {
            type: String
        }
    })

module.exports = mongoose.model('Team', teamSchema)