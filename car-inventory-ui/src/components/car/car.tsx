import React, { useState } from "react";
import "./car.scss";
import FormInput from "../form/form";
import { CarInterface } from "../../interfaces/car-interface";

interface Props {
  data: CarInterface;
  onResults: (data: CarInterface, action: "adding" | "editing") => void;
  onDelete: (id: string) => void;
}

const Car = (props: Props) => {
  // props destructuring
  const { data, onResults, onDelete } = props;

  // states
  const [show, setShow] = useState(false);
  // handling the close button
  const handleClose = () => setShow(false);

  // handling the modal
  const handleShow = () => setShow(true);

  /**
   * removing a car
   */
  async function onDeleteCar() {
    const carUrl = `/cars/${data.id}`;
    try {
      const response = await fetch(carUrl, {
        method: "DELETE",
      });
      const results = await response.json();
      console.log(results);

      onDelete(data.id || "");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // displaying a car item
    <div className="car">
      <p>Model: {data.model}</p>
      <p>Make: {data.make}</p>
      <p>Color: {data.color}</p>
      <p>Registration number: {data.registrationNumber}</p>
      <p>Owner: {data.owner}</p>
      <p>Address: {data.address}</p>

      {/* showing the form input if its true ,to make edits */}
      {show && (
        <FormInput
          show={show}
          handleClose={handleClose}
          isAdding={false}
          onResults={onResults}
          carData={data}
        />
      )}

      <div className="car-btns">
        <button className="btn btn-primary edit-btn" onClick={handleShow}>
          Edit
        </button>
        <button className="btn btn-primary  delete-btn" onClick={onDeleteCar}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Car;
