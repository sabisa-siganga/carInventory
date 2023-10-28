import React from "react";
import "./car.scss";
import FormInput from "../form/form";

const onEdit = () => {};

const Car = () => {
  return (
    <div className="car-container pb-5">
      <div className="car">
        <p>Model:</p>
        <p>Make:</p>
        <p>Colour:</p>
        <p>Registration number:</p>
        <p>Owner:</p>
        <p>Address:</p>
        <div className="car-btns">
          <button className="btn btn-primary edit-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-primary  delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Car;
