const express = require("express");
const { walletHandler, walletIdHandler } = require("../controllers/wallet");
const {
  addCreditHandler,
  transactionsHandler,
  purchaseHandler,
} = require("../controllers/transaction");

const router = express.Router();

router.post("/", walletHandler);
router.get("/:walletId", walletIdHandler);
router
  .route("/:walletId/transaction")
  .post(addCreditHandler)
  .get(transactionsHandler);
router.post("/:walletId/purchase", purchaseHandler);

module.exports = router;
