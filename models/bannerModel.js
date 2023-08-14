const mongoose = require("mongoose");
const validator = require("validator");

const bannerSchema = new mongoose.Schema({
  bannerCategory: String,
  bannerIntro: String,
  bannerTitle: String,
  bannerSubtitle: String,
  bannerImage: String,
  status: {
    type: Boolean,
    default: false,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
