import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CarInterface } from "../../interfaces/car-interface";

// props interface
interface Props {
  show: boolean;
  handleClose: () => void;
  isAdding: boolean;
  onResults: (data: CarInterface, action: "adding" | "editing") => void;
  /**
   * Data representing info to be edited
   */
  carData?: CarInterface;
}

const FormInput = (props: Props) => {
  // props destructuring
  const { show, handleClose, isAdding, carData, onResults } = props;

  // defining default car state
  const defaultState: CarInterface = {
    make: "",
    model: "",
    color: "",
    registrationNumber: "",
    owner: "",
    address: "",
  };

  // state
  const [formField, setForm] = useState<CarInterface>(carData || defaultState);

  /**
   * accessing the input value and name
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    // updating the state
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /**
   * Closing the modal after saving
   */
  function cleanUp() {
    handleClose();

    // updating the state
    setForm(defaultState);
  }

  /**
   *  adding a car to the database
   */
  async function onAddCar() {
    try {
      const response = await fetch("/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: formField.model,
          make: formField.make,
          color: formField.color,
          registration_number: formField.registrationNumber,
          owner: formField.owner,
          address: formField.address,
        }),
      });
      const results = await response.json();

      // callback function to add a car
      onResults(
        {
          ...formField,
          id: results.car._id,
        },
        "adding"
      );
      // closing modal after saving
      cleanUp();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *Making edits to the car item
   */
  async function onEditCar() {
    // url
    const carUrl = `/cars/${carData?.id}`;

    try {
      await fetch(carUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: formField.model,
          make: formField.make,
          color: formField.color,
          registration_number: formField.registrationNumber,
          owner: formField.owner,
          address: formField.address,
        }),
      });

      // callback function to edit a car
      onResults(
        {
          ...formField,
          id: carData?.id,
        },
        "editing"
      );

      // closing modal after saving
      cleanUp();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *triggering the form submit event
   */
  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    // adding a car if isAdding is true, otherwise edit car document
    if (isAdding) {
      await onAddCar();
    } else {
      onEditCar();
    }
  }

  return (
    <div className="form-container mb-5">
      {/* modal containing form to make updates on cars */}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isAdding ? "Enter car details" : "Edit car details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Model: {formField.model}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="model"
                value={formField.model}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Make: {formField.make}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="make"
                value={formField.make}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Colour: {formField.color}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="color"
                value={formField.color}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Registration number: {formField.registrationNumber}
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="registrationNumber"
                value={formField.registrationNumber}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Owner: {formField.owner}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="owner"
                value={formField.owner}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address: {formField.address}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="address"
                value={formField.address}
                onChange={onChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* close button */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" type="submit">
              {isAdding ? "Save" : "Save changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default FormInput;
