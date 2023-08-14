const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const relatedSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please fill in your username"],
    minlength: [2, "Username must be greater than 3 characters"],
    unique: [true, "A user with this username already exist"],
    trim: true,
  },

  income: String,
  maritalStatus: String,
  gender: String,

  residentAddress1: String,
  residentAddress2: String,
  residentDistrict: String,
  residentState: String,
  residentZipCode: String,
  residentCountry: String,

  originAddress1: String,
  originAddress2: String,
  originDistrict: String,
  originState: String,
  originZipCode: String,
  originCountry: String,

  phoneNumber2: String,
  kinFullName: String,
  kinRelationship: String,
  kinAddress: String,
  kinEmail: String,
  kinPhoneNumber: String,
});

const Related = mongoose.model("Related", relatedSchema);

module.exports = Related;
