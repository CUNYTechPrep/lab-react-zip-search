import React from "react";
import "./App.css";
import { useState } from "react";

function City({latitude, longitude, city, state, estimatedPopulation, totalWages}) {
  return (
    <div>
      <h4>
        {city}, {state}
      </h4>

      <div>
      <ul>
          <li>
            State: {state}
          </li>
          <li>
            Location: ({latitude}, {longitude})
          </li>
          <li>
            Population (estimated): {estimatedPopulation} 
          </li>
          <li>
            Wages (total): {totalWages} 
          </li>
        </ul>
      </div>
      <br></br>
    </div>
  );
}

function ZipSearchField({ handler }) {
  return (
    <div className="my-5">
      <label>
        Zip Code:
      </label>
      <input
        id="zip-code"
        type="text"
        onChange={handler}
      />
    </div>
  );
}

function App() {
  const [searchZipCode, searchSetZipCode] = useState(null);
  const [apiZipCodeResults, searchSetZipCodeResults] = useState([]);

  // search field handler
  const changeZipCode = (event) => {
    const enteredZipCode = event.target.value;
    searchSetZipCode(enteredZipCode);

    if (enteredZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${enteredZipCode}`)
        .then((res) => res.json())
        .then((data) => searchSetZipCodeResults(data))
        .catch(() => searchSetZipCodeResults([]));
    } else {
      searchSetZipCodeResults([]);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handler={changeZipCode} />
        <div>
          {apiZipCodeResults.map((zipCodeData) => (
            <City
              city={zipCodeData.City}
              state={zipCodeData.State}
              latitude={zipCodeData.Lat}
              longitude={zipCodeData.Long}
              estimatedPopulation={zipCodeData.EstimatedPopulation}
              totalWages={zipCodeData.TotalWages}
              key={zipCodeData.RecordNumber}
            />
          ))}
          {apiZipCodeResults.length === 0 && <b>No results found</b>}
        </div>
      </div>
    </div>
  );
}

export default App;
