import React from "react";
import { useState } from "react";
import "./App.css";
import ZipSearchField from "./components/ZipSearchField/ZipSearchField";
import City from "./components/City/City";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);
  const [isFound, setIsFound] = useState(false)
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <br></br>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipCode = {zipCode} setZipCode = {setZipCode} setCities = {setCities} setIsFound = {setIsFound}/>
        <br></br>
        {!isFound ? "No results found" : cities.map((element, index) => {
        return <City key={index} cityInfo={element} />;
      })}
      </div>
    </div>
  );
}

export default App;
