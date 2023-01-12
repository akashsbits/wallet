const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");
const Product = require("../models/product");

const addCreditHandler = async (req, res, next) => {
  try {
    if (!req.params.walletId) {
      throw new Error("Wallet id is required.");
    }
    if (!req.body.amount) {
      throw new Error("amount is a required field.");
    }

    const { walletId } = req.params;
    const { amount } = req.body;
    const description = req.body.description;

    const data = await Wallet.findOneAndUpdate(
      { walletId },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!data) {
      throw new Error("Wallet not found.");
    }

    const { balance, walletId: _walletId } = data;

    const _data = await Transaction.create({
      balance,
      walletId: _walletId,
      description,
      type: "credit",
    });

    if (!_data) {
      throw new Error("Unable to perform transaction.");
    }

    const {
      balance: _balance,
      transactionId,
      description: _description,
      type,
      createdAt,
    } = _data;

    res.status(200).json({
      balance: _balance,
      transactionId,
      description: _description,
      type,
      createdAt,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const transactionsHandler = async (req, res, next) => {
  try {
    if (!req.params.walletId) {
      throw new Error("walletId is a required parameter.");
    }

    const skip = req.query.skip ? req.query.skip : null;
    const limit = req.query.limit ? req.query.limit : null;
    const { walletId } = req.params;

    const transactions = await Transaction.find(
      { walletId },
      { walletId: 0 },
      { skip, limit }
    );

    if (!transactions) {
      res.status(200).json({ transactions: null });
    }

    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const purchaseHandler = async (req, res, next) => {
  try {
    if (!req.body.productId) {
      throw new Error("productId is a required field.");
    }

    const { productId } = req.body;

    const product = await Product.findOne({ productId });

    if (!product) {
      throw new Error("Product not found.");
    }

    const { amount } = product;
    const { walletId } = req.params;

    const wallet = await Wallet.findOneAndUpdate(
      { walletId },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const { balance, walletId: _walletId } = wallet;

    const transaction = await Transaction.create({
      balance,
      walletId: _walletId,
      productId,
      type: "debit",
    });

    if (!transaction) {
      throw new Error("Unable to perdform transaction.");
    }

    const { transactionId, type, createdAt } = transaction;

    res.status(200).json({
      balance,
      transactionId,
      type,
      productId,
      createdAt,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { addCreditHandler, transactionsHandler, purchaseHandler };
