const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  banner: String,
  name: String,
  title: String,
  content: String,
  headerColor: String,
  footerColor: String,
  mainColor: String,
  greeting: String,
  warning: String,
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
