const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

const walletHandler = async (req, res) => {
  try {
    if (!req.body.name || !req.body.balance) {
      throw new Error("name and balance are required fields.");
    }

    const { name: _name, balance: _balance } = req.body;
    const data = await Wallet.create({ name: _name, balance: _balance });

    if (!data) {
      throw new Error("Unable to create wallet.");
    }

    const { balance, name, walletId, createdAt: date } = data;

    const transaction = await Transaction.create({
      balance,
      walletId,
      type: "credit",
    });

    if (!transaction) {
      throw new Error("Unable to perform transaction.");
    }

    const { transactionId } = transaction;

    res.status(200).json({ walletId, balance, transactionId, name, date });
  } catch (err) {
    console.error(err);
  }
};

const walletIdHandler = async (req, res) => {
  try {
    if (!req.params.walletId) {
      throw new Error("Wallet Id is required.");
    }

    const { walletId: _walletId } = req.params;
    const data = await Wallet.findOne({ walletId: _walletId });

    if (!data) {
      throw new Error("Wallet not found.");
    }

    const { walletId, balance, name, createdAt } = data;
    res.status(200).json({ walletId, balance, name, createdAt });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { walletHandler, walletIdHandler };
