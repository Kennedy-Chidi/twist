const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    unique: true,
  },
  planPeriod: {
    type: String,
    default: "Daily",
  },
  planStatus: {
    type: Boolean,
    default: false,
  },
  planDuration: Number,
  planPercentage: Number,
  planMinimum: Number,
  planMaximum: Number,
  planBanner: String,
  planDescription: String,
  planTags: Array,
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
