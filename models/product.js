const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const productSchema = new Schema({
  productId: { type: String, default: v4 },
  amount: { type: Number, required: true },
  description: { type: String, maxlength: 100, required: true },
});

module.exports = model("Product", productSchema);
