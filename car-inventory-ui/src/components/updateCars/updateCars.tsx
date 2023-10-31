import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CarInterface } from "../../interfaces/car-interface";

// car updates type
type CarUpdates = Omit<CarInterface, "registrationNumber">;

// props interface
interface Props {
  show: boolean;
  handleClose: () => void;
  onResults: (data: CarInterface[]) => void;
}

/**
 * Editing cars
 */
const UpdateCars = (props: Props) => {
  // props destructuring
  const { show, handleClose, onResults } = props;

  // defining default car state
  const defaultCarState: CarUpdates = {
    make: "",
    model: "",
    color: "",
    owner: "",
    address: "",
  };

  // state
  const [formField, setForm] = useState<CarUpdates>(defaultCarState);

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

    setForm(defaultCarState);
  }

  /**
   *Making updates to the car item
   */
  async function onEditCar() {
    const carUrl = `/cars`;

    try {
      const response = await fetch(carUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: formField.model,
          make: formField.make,
          color: formField.color,
          owner: formField.owner,
          address: formField.address,
        }),
      });
      const results = await response.json();

      // callback function to edit a car
      onResults(results);

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
    // preventing default
    event.preventDefault();

    onEditCar();
  }

  return (
    <div className="form-container mb-5">
      {/* modal containing form to make updates on cars */}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit cars</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            {/* update cars button */}
            <Button variant="primary" type="submit">
              Update Cars
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateCars;
