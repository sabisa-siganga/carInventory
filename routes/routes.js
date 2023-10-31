// importing express
const express = require("express");

// importing router
const router = express.Router();

// importing controllers
const carControllers = require("../controllers/controllers");

// routes
router.get("/cars", carControllers.getAllCars); // get cars
router.get("/cars/carModel", carControllers.fetchFiveYearOldCars); //get all cars older than 5 years
router.get("/cars/:id", carControllers.getCar); // get car
router.post("/cars", carControllers.addCar); // Add car
router.delete("/cars/:id", carControllers.deleteCars); //delete car
router.put("/cars/:id", carControllers.updateCar); //edit car details
router.put("/cars", carControllers.updateCars); //edit cars' details

module.exports = router;
