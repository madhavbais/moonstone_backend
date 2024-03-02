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
        }

    }
)

module.exports = mongoose.model('Events', eventsSchema)