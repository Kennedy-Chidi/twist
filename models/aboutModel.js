const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  staffPositions: String,
  content: String,
  vision: String,
  visionList: Array,
  certificate: String,
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
