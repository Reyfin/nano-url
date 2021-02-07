const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
    },
    shortenedUrl:{
      type: String,
      required: true
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
