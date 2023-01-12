require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit"); // Prevent DDOS
const cors = require("cors");
const express = require("express");
const connectDB = require("./db");
const walletRouter = require("./routes/wallet");
const transactionRouter = require("./routes/transaction");
const notFound = require("./middlewares/not-found");
const error = require("./middlewares/error");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// app behind a reverse proxy
app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(helmet()); // Add some extra headers for app security
app.use(cors()); // Allows cross origin resource sharing

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
