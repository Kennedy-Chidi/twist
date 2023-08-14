const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
  heading: String,
  body: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Terms = mongoose.model("Terms", termsSchema);

module.exports = Terms;
