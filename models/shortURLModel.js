const { Schema, model } = require("mongoose");
const moment = require("moment");

const linkSchema = new Schema({
  longURL: {
    type: String,
    trim: true,
    // required: true,
  },
  shotLink: {
    type: String,
  },
  shortURL: {
    type: String,
    trim: true,
  },
  totalHits: {
    type: Number,
    default: 0,
  },

  dateTime: {
    type: String,
    default: moment().format("D-MMM-YYYY, h:mm:ss A"),
  },
});

const Link = model("Link", linkSchema);

module.exports = Link;
