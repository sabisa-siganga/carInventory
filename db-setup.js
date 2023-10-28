const mongoose = require("mongoose");
require("dotenv").config();
// connecting to mongo data base
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectToDatabase };
