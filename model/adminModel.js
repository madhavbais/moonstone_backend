const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        adminID: {
            type:String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        superAdmin: {
            type: Boolean,
            default: false
        },
        registrationDesk: {
            type: Boolean,
            default: false
        },
        finance: {
            type: Boolean,
            default: false
        },

    }
)

module.exports = mongoose.model('Admin', adminSchema)