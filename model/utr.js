const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utrSchema = new Schema(
    {
        utr: {
            type: String,
            required: true
        },
        reg_id: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Utr', utrSchema)