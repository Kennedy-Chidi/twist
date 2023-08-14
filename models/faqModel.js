const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
