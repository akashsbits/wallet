const express = require("express");
const { walletHandler, walletIdHandler } = require("../controllers/wallet");

const router = express.Router();

router.get("/", (req, res) => res.status(200).send("Welcome to Wallet APIs."));
router.post("/wallet", walletHandler);
router.get("/:walletId", walletIdHandler);

module.exports = router;
