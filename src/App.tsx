import React from "react";
import Art from "./components/Art/Art";
import GradientBar from "./components/GradientBar/GradientBar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <GradientBar />
      <Art />
    </div>
  );
}

export default App;
