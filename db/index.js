const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

module.exports = (url) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};
