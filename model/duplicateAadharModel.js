const mongoose = require('mongoose')
const duplicateAadharSchema = new mongoose.Schema(
    {
        eventid:{
            type:String,
            required:true
        },
        aadhar_list:[
            {
            aadhar_no:{
                type:String,
                required:true
            }
        }
        ]
    }
)

module.exports = mongoose.model('DuplicateAadhar', duplicateAadharSchema)