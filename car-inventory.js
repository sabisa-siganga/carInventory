const express = require("express");
const { connectToDatabase } = require("./db-setup");
const router = require("./routes/routes");
require("dotenv").config();

const app = express();

// using middleware to parse JSON data
app.use(express.json());
const PORT = process.env.PORT || 8080;

// initiating database connection
connectToDatabase();

app.use(router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
