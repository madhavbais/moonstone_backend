const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const utrSchema = new Schema(
    {
        utr: {
            type: String
        },
        reg_id: {
            type: Number
        }
    }
)

module.exports = mongoose.model('Utr', utrSchema)