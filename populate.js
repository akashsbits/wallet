require("dotenv").config();

const connectDB = require("./db");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!");
    // Tell Node.js to terminate the process with a 'success' exit code 0.
    process.exit(0);
  } catch (error) {
    console.log(error);
    // Tell Node.js to terminate the process with a 'failure' exit code 1.
    process.exit(1);
  }
};

start();
