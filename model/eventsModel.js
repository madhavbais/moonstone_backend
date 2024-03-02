const mongoose = require('mongoose')
const eventsSchema = new mongoose.Schema(
    {
        event_image_link:{
            type:String,
            default:"hello"
        },
        eventName: {
            type: String,
            required:true,
        },
        aboutEvent:{
            type:String,
            required:true
        },
        instruction: {
            type: String,
            required:true
        },
        event_category: {
            type: String,
            required:true
        },
        max_team_size: {
            type: Number,
            max:11,
            required:true,
        },
        min_team_size: {
            type: Number,
            min:1,
            required: true
        },
        start_registration_date:{
            type:Date,
            default: Date.now(),
            min:Date.now(),
        },
        end_registration_date:{
            type:Date,
            min:Date.now(),
            default:Date.now()
        },
        status:{
            type:Boolean,
            default:false
        },
        Eventdate:{
            type:Date, 
            default:Date.now()       
        },
        fees:{
            type:Number,
            default:0,
            min:0
        }
    }
)

module.exports = mongoose.model('Events', eventsSchema)