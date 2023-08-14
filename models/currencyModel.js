const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  symbol: String,
  name: {
    type: String,
    unique: [true, "This currency already exist"],
  },
  address: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
