const { Schema, model } = require("mongoose");
const moment = require("moment");

const now = new Date();
const localDate = now.toLocaleDateString();
const localTime = now.toLocaleTimeString();
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
    default: `${localDate}, ${localTime}`,
  },
});

const Link = model("Link", linkSchema);

module.exports = Link;
