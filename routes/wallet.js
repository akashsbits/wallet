const express = require("express");
const { walletHandler, walletIdHandler } = require("../controllers/wallet");

const router = express.Router();

router.get("/", (req, res) =>
  res
    .status(200)
    .send(
      '<h2>Welcome to Wallet APIs.</h2><br><a href="/api/docs"><h3>API Documentation</h3></a>'
    )
);
router.post("/wallet", walletHandler);
router.get("/:walletId", walletIdHandler);

module.exports = router;
