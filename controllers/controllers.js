const express = require("express");
const Car = require("../models/car");

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

// getting all cars
const getAllCars = (req, res) => {
  Car.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "failed to get cars" });
    });
};

// updating car
const updateCar = (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Car.findByIdAndUpdate(id, update)
    .then((result) => {
      if (!result) {
        // If no matching document was found
        return res.status(404).json({ message: "Car not found" });
      }
      res.json({ message: "Car updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failed to update a car" });
    });
};

// Updating a cars
const updateCars = (req, res) => {
  const update = req.body;

  Car.findByIdAndUpdate(update)
    .then((result) => {
      if (!result) {
        // If no matching document was found
        return res.status(404).json({ message: "Car not found" });
      }
      res.json({ message: "Car updated successfully" });
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
      res.json({ car: result, message: "Successfully deleted the car" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Failed to delete the car" });
    });
};

module.exports = {
  addCar,
  getAllCars,
  getCar,
  updateCar,
  updateCars,
  deleteCars,
};
