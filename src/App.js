import React from "react";
import { useState } from "react";
import "./App.css";

function City({ city, state, lat, long, estimatedPopulation, totalWages }) {
  return (
    <div className="card mb-5">
      <div className="card-header">
        {city}, {state}
      </div>
      <div>
        <ul>
          <li>State: {state}</li>
          <li>
            Location: ({lat}, {long})
          </li>
          <li>Population (estimated): {estimatedPopulation}</li>
          <li>Total Wages: {totalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ handleChange, value }) {
  return (
    <div>
      <br></br>
      <br></br>
      <div >Zip Code:</div>
      <input
        id="zip-code"
        type="text"
        placeholder="Try 10016"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

function App() {

  const [zipCode, setZipCode]=useState("");
  const [zipCodeResults, setZipCodeResults] = useState([]);
  const zipCodeChanged = (event) => {

    const newZipCode = event.target.value;
    setZipCode(newZipCode);

    if (newZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${newZipCode}`)
        .then((res) => res.json())
        .then((body) => setZipCodeResults(body))
    } else {
      // clears results when input zip is not 5 digit.
      setZipCodeResults([]);
    }
  };


  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>

        <ZipSearchField value={zipCode} handleChange={zipCodeChanged} />
        <div>
        {zipCodeResults.map((zipData) => (
          <City 
                  city={zipData.City}
                  state={zipData.State}
                  lat={zipData.Lat}
                  long={zipData.Long}
                  estimatedPopulation={zipData.EstimatedPopulation}
                  totalWages={zipData.TotalWages}
                  key={zipData.RecordNumber}
                  />
        ))}
        
       {zipCodeResults.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
