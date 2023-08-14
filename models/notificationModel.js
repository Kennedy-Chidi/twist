const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  username: String,
  message: String,
  subject: String,
  date: String,
  dateCreated: Number,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
