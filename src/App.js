import React, { useState } from "react";
import "./App.css";

// City component for displaying information about a city
function City({ city, state, lat, long, pop, wages }) {
  const numberFormat = new Intl.NumberFormat();

  return (
    <div className="card mb-5 gradient-background">
      <div className="card-header">
        {city}, {state}
      </div>
      <div className="card-body">
        <ul>
          <li>State: {state}</li>
          <li>Location: ({lat}, {long})</li>
          <li>Population (estimated): {numberFormat.format(pop)}</li>
          <li>Total Wages: {numberFormat.format(wages)}</li>
        </ul>
      </div>
    </div>
  );
}

// ZipSearchField component for entering zip codes
function ZipSearchField({ onChange, value }) {
  return (
    <div className="my-5">
      <label htmlFor="zip-code">Zip Code:</label>
      <input className="form-control" id="zip-code" type="text" placeholder="Try 10016" onChange={onChange} value={value} />
    </div>
  );
}

// App component for the main application
function App() {
  // State to track the entered zip code and results
  const [zipCodeData, setZipCodeData] = useState({
    zipCode: "",
    zipCodeResults: [],
  });

  // Event handler for zip code input change
  const handleZipCodeChange = async (event) => {
    const newZipCode = event.target.value;
    console.log(newZipCode);

    // Update the zip code state
    setZipCodeData((prevData) => ({
      ...prevData,
      zipCode: newZipCode,
      zipCodeResults: newZipCode.length === 5 ? [] : prevData.zipCodeResults, // Clear results for non-valid lengths
    }));

    // Fetch data if the entered zip code is of valid length
    if (newZipCode.length === 5) {
      try {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${newZipCode}`);
        const body = await response.json();

        // Update the zip code results state
        setZipCodeData((prevData) => ({
          ...prevData,
          zipCodeResults: body,
        }));
      } catch (error) {
        // Handle fetch error by updating the zip code results state to an empty array
        setZipCodeData((prevData) => ({
          ...prevData,
          zipCodeResults: [],
        }));
      }
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        {/* Input for entering zip codes */}
        <ZipSearchField value={zipCodeData.zipCode} onChange={handleZipCodeChange} />
        <div>
          {/* Render City component for each API result object */}
          {zipCodeData.zipCodeResults.map((zipData) => (
            <City
              city={zipData.City}
              state={zipData.State}
              lat={zipData.Lat}
              long={zipData.Long}
              pop={zipData.EstimatedPopulation}
              wages={zipData.TotalWages}
              key={zipData.RecordNumber}
            />
          ))}
          {/* Display message if no results found */}
          {zipCodeData.zipCodeResults.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
