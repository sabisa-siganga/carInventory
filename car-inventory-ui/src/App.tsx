import React, { useEffect, useState } from "react";
import "./App.scss";
import Car from "./components/car/car";
import FormInput from "./components/form/form";
import { CarInterface } from "./interfaces/car-interface";
import UpdateCars from "./components/updateCars/updateCars";

// creating a car inventory to allow the user to add, get, update and delete car(s) and get all cars older than 5 years

// extending the results interface from the carInterface
interface Results extends CarInterface {
  _id: string;
  registration_number: string;
}

function App() {
  // states
  const [show, setShow] = useState(false);
  const [editCars, setEditCars] = useState(false);
  const [cars, setCars] = useState<CarInterface[]>([]);

  // handling closing of the modal
  const handleClose = () => setShow(false);
  // handling display of the modal
  const handleShow = () => setShow(true);

  /**
   * triggering updating the cars
   */
  const editCarItems = (isDisplay: boolean) => {
    setEditCars(isDisplay);
  };

  /**
   * Fetching cars from an api
   */
  async function fetchCars(data: string) {
    const response = await fetch(data);
    const results = await response.json();

    // data representing results
    const newResults: CarInterface[] = (results as Results[]).map((result) => {
      return {
        model: result.model,
        make: result.make,
        color: result.color,
        registrationNumber: result.registration_number,
        owner: result.owner,
        address: result.address,
        id: result._id,
      };
    });

    // state update
    setCars(newResults);
  }

  useEffect(() => {
    fetchCars("/cars");
  }, []);

  /**
   *Displaying results or updating results
   */
  const onResults = (car: CarInterface, action: "adding" | "editing") => {
    if (action === "adding") {
      setCars((prev) => {
        return [...prev, car];
      });
    } else {
      const carList = cars.map((carItem) => {
        if (carItem.id === car.id) {
          carItem = car;
        }

        return carItem;
      });

      setCars(carList);
    }
  };

  // delete car document
  const onDeleteItem = (id: string) => {
    const filterSelectedCar = cars.filter((carItem) => {
      return carItem.id !== id;
    });

    // state update
    setCars(filterSelectedCar);
  };

  /**Getting cars older than 5 years */
  async function fetchFiveYearOldCars() {
    fetchCars("/cars/carModel");
  }
  /**Getting all cars  */
  async function fetchCarList() {
    fetchCars("/cars");
  }

  // Displaying the updates made
  const updatedCarsResults = (carList: CarInterface[]) => {
    setCars(carList);
  };

  return (
    <div className="app-container">
      <h1 className="my-5">Car Inventory</h1>
      <div className="app">
        <div className="addBtn-container">
          <button className="btn add-btn" onClick={fetchCarList}>
            Car list
          </button>
          <button className="btn add-btn" onClick={handleShow}>
            Add car
          </button>
          <button className="btn add-btn" onClick={fetchFiveYearOldCars}>
            5y cars
          </button>
          <button className="btn add-btn" onClick={() => editCarItems(true)}>
            Edit cars
          </button>
        </div>
        {editCars && (
          <UpdateCars
            show={editCars}
            handleClose={() => editCarItems(false)}
            onResults={updatedCarsResults}
          />
        )}

        {/* Adding a new car */}
        <FormInput
          show={show}
          handleClose={handleClose}
          isAdding={true}
          onResults={onResults}
        />
        <div className="car-container pb-5">
          {/* displaying all cars */}
          {cars.map((car, index) => {
            return (
              <Car
                key={`car-item-${index}`}
                data={car}
                onResults={onResults}
                onDelete={onDeleteItem}
              />
            );
          })}

          {cars.length === 0 && <div>Please add a new car</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
