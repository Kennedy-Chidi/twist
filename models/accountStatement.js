const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: String,
  totalBalance: Number,
  accounts: Array,
  currency: String,
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
