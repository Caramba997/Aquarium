const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  species: String,
  date_since: Date,
  date_death: Date,
  sex: String,
  colors: [String],
  characteristics: [String],
  preview_image: {
    url: String
  },
  photos: [{
    url: String
  }]
});

module.exports = mongoose.model("fish", itemSchema);