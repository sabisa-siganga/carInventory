import React from "react";
import "./App.scss";
import Car from "./components/car/car";
import FormInput from "./components/form/form";

function App() {
  return (
    <div className="app-container">
      <h1 className="my-5">Car Inventory</h1>
      <div className="app">
        <FormInput />
        <Car />
      </div>
    </div>
  );
}

export default App;
