const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const walletSchema = new Schema({
  walletId: { type: String, default: v4 },
  balance: { type: Number, required: true },
  name: { type: String, minlength: 2, maxlength: 50, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Wallet", walletSchema);
