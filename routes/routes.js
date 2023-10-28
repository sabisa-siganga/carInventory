const express = require("express");
const router = express.Router();

const carControllers = require("../controllers/controllers");

router.get("/cars", carControllers.getAllCars); // get cars
router.get("/cars/:id", carControllers.getCar); // get car
router.post("/cars", carControllers.addCar); // Add car
router.delete("/cars/:id", carControllers.deleteCars);
router.put("/cars/:id", carControllers.updateCar);
router.put("/cars", carControllers.updateCars);

module.exports = router;
