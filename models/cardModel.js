const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const cardSchema = new mongoose.Schema({
  cardType: {
    type: String,
    require: [true, "Please fill in your username"],
    minlength: [2, "Username must be greater than 3 characters"],
    unique: [true, "A user with this username already exist"],
    trim: true,
  },
  cardImage: String,
  totalNumber: Number,
  issued: Number,
  duration: Number,
  userId: String,
  cardNumber: Number,
  cvNumber: Number,
  status: {
    type: Boolean,
    default: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
