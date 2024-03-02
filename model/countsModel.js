const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;

const countsSchema = new Schema({
    visitor: {
        type: Number
    },
    registration: {
        type: Number
    },
    cultural_registration:{
      type:Number
    },
    sports_registration: {
        type: Number
    },
    nights_registration: {
        type: Number
    },
    techno_registration: {
        type: Number
    },
    participants: {
        type:Number
    }
    })

module.exports = mongoose.module('Counts', countsSchema);