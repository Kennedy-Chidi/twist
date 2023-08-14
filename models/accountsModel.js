const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountType: String,
  fullName: String,
  username: String,
  balance: Number,
  accountNumber: String,
  currency: String,
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
