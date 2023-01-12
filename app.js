const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const walletRouter = require("./routes/wallet");
const transactionRouter = require("./routes/transaction");
const notFound = require("./middlewares/not-found");
const error = require("./middlewares/error");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", walletRouter);
app.use("/wallet", transactionRouter);

app.use(notFound);
app.use(error);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
