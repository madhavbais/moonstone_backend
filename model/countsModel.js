const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countsSchema = new Schema({
  visitor: {
    type: Number,
    default: 0,
  },
  registration: {
    type: Number,
    default: 0,
  },
  cultural_registration: {
    type: Number,
    default: 0,
  },
  sports_registration: {
    type: Number,
    default: 0,
  },
  nights_registration: {
    type: Number,
    default: 0,
  },
  techno_registration: {
    type: Number,
    default: 0,
  },
  participants: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Counts", countsSchema);
