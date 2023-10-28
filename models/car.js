// import mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
