import React, { useState } from "react";
import "./App.css";

function City({city, state, latitude, longitude, popEst, totalWages}) {
  return (
  <div className = "card">
      <div className = "card-header"> {city}, {state} </div>
      <div className = "card-body">
        <ul>
          <li>State: {state} </li>
          <li>Location: {latitude}, {longitude}</li>
          <li>Population Estimate: {popEst}</li>
          <li>Total Wages: {totalWages}</li>
        </ul>
      </div>

  </div>
  );
}

function ZipSearchField({handleChange, input}) {
  return (
      <div class="mb-3">
          <label for="colFormLabel" class="col-form-label">Zip Code:</label>
          <input className="form-control" type="text" placeholder="Enter here" onChange = {handleChange} value = {input}/>
      </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeOutcome, setZipCodeOutcome] = useState([]);
  
  const getZipCode = (event) =>{
    const nextZipCode = event.target.value;
    setZipCode(nextZipCode);
    if (nextZipCode.length === 5){
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${nextZipCode}`)
          .then((res) => res.json())
          .then((body) => setZipCodeOutcome(body))
        } else{
          setZipCodeOutcome([]);
          console.log("invalid input");
          <strong>Invalid</strong>;
        }      
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField  value = {zipCode} handleChange = {getZipCode} />
        <div>
          {zipCodeOutcome.map((zips) => (
            <City 
                city = {zips.City}
                state = {zips.State}
                latitude = {zips.Lat}
                longitude = {zips.Long}
                popEst = {zips.EstimatedPopulation}
                totalWages = {zips.TotalWages}
                />
          ))}
          {zipCodeOutcome.length < 5 && <strong>Not Found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
