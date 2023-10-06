import React, { useState } from "react";
import "./App.css";

function City({ cityName, state, latitude, longitude, population, wages }) {
  return (
    <div className="card mb-5">
      <div className="card-header">
        {cityName}, {state}
      </div>
      <div className="card-body" style={{ width: 400 }}>
        <ul>
          <li>State: {state}</li>
          <li>
            Location: ({latitude}, {longitude})
          </li>
          <li>Population (estimated): {population}</li>
          <li>Total Wages: {wages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ onSearch, zipCode }) {
  const handleInput = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <label htmlFor="zip">Zip Code:</label>
      <div style={{ margin: 10 }}></div>
      <input
        id="zip"
        type="text"
        onChange={handleInput}
        value={zipCode}
      ></input>
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = (newZipCode) => {
    setZipCode(newZipCode);

    if (newZipCode.length === 5) {
      let request = `https://ctp-zip-code-api.onrender.com/zip/${newZipCode}`;
      fetch(request)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length === 0) {
            setNoResult(true);
            setCities([]);
          } else {
            setNoResult(false);
            setCities(data);
          }
        })
        .catch(() => {
          setNoResult(true);
          setCities([]);
        });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div style={{ margin: 50 }}></div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onSearch={handleSearch} zipCode={zipCode} />
        <div style={{ margin: 50 }}></div>
        {noResult ? (
          <div>No results found</div>
        ) : (
          cities.map((city, index) => (
            <City
              key={index}
              cityName={city.City}
              state={city.State}
              latitude={city.Lat}
              longitude={city.Long}
              population={city.EstimatedPopulation}
              wages={city.TotalWages}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
