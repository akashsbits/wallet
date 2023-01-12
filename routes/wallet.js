const express = require("express");
const { walletHandler, walletIdHandler } = require("../controllers/wallet");

const router = express.Router();

router.post("/wallet", walletHandler);
router.get("/:walletId", walletIdHandler);

module.exports = router;
