// importing express
const express = require("express");
// importing the car model
const Car = require("../models/car");
const { model } = require("mongoose");

// adding a car
const addCar = (req, res) => {
  const addCarRequest = req.body;
  console.log(addCarRequest);
  const car = new Car(addCarRequest);

  car
    .save()
    .then((result) => {
      res.status(200).json({ car: result, message: "Car successfully added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Failed to add a car" });
    });
};

//getting a car
const getCar = (req, res) => {
  const id = req.params.id;
  Car.findById(id)
    .then((result) => {
      res.status(200).json({ car: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Failed to get a car" });
    });
};

// fetching all cars
async function fetchAllCars() {
  try {
    const result = await Car.find();

    return result;
  } catch (error) {
    return [];
  }
}

// getting all cars
const getAllCars = async (req, res) => {
  const result = await fetchAllCars();

  res.json(result);
};

// updating a car
const updateCar = (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Car.findByIdAndUpdate(id, update)
    .then((result) => {
      if (!result) {
        // throw an error message if no matching car document was found
        return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json({ message: "Car updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failed to update a car" });
    });
};

// Updating cars based on a common field
const updateCars = (req, res) => {
  const update = req.body;

  // Defining the carfilter based on the common field (which is owner in this case)
  const carFilter = {
    owner: update.owner,
  };

  Car.updateMany(carFilter, update)
    .then(async (result) => {
      if (result.nModified === 0) {
        return res.status(404).json({ message: "No matching cars found" });
      }

      const cars = await fetchAllCars();

      res.json(cars);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failed to update the cars" });
    });
};

// deleting cars
const deleteCars = (req, res) => {
  const id = req.params.id;

  Car.findByIdAndDelete(id)
    .then((result) => {
      res
        .status(200)
        .json({ car: result, message: "Successfully deleted the car" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Failed to delete the car" });
    });
};

// Getting cars older than 5 years
const fetchFiveYearOldCars = (req, res) => {
  const fiveYearsAgo = new Date().getFullYear() - 5;

  Car.find({ model: { $lt: fiveYearsAgo.toString() } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Cannot find cars older than 5 years" });
    });
};

module.exports = {
  addCar,
  getAllCars,
  getCar,
  updateCar,
  updateCars,
  deleteCars,
  fetchFiveYearOldCars,
};
