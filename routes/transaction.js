const express = require("express");
const {
  addCreditHandler,
  transactionsHandler,
  purchaseHandler,
} = require("../controllers/transaction");

const router = express.Router();

router
  .route("/:walletId/transaction")
  .post(addCreditHandler)
  .get(transactionsHandler);
router.post("/:walletId/purchase", purchaseHandler);

module.exports = router;
