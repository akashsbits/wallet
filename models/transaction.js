const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const transactionSchema = new Schema({
  balance: { type: Number, required: true },
  transactionId: { type: String, default: v4 },
  walletId: { type: String, index: true, required: true },
  description: { type: String, maxlength: 100, default: null },
  productId: { type: String, default: null },
  type: { type: String, enum: ["credit", "debit"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Transaction", transactionSchema);
