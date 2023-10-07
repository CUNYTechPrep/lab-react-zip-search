import React, { useState } from "react";
import "./App.css";

function City(props) {
  const {
     City: 
      cityName, 
      State, 
      Lat, 
      Long,  
      EstimatedPopulation, 
      TotalWages 
    } = props.data; // Destructure the data object to get the values we need to output given metrics in the assignment example website.

  return (
    <div className="card"> 
      <strong>{cityName}, {State}</strong><br />
      State: {State}<br />
      Location: ({Lat}, {Long})<br />
      Population (estimated): {EstimatedPopulation}<br />
      Total Wages: {TotalWages}<br />
    </div>
  );
}


function ZipSearchField(props) {
  return (
    <div>
      Enter Zip Code:
      <input
        type="text"
        onChange={(e) => props.zipChanged(e.target.value)} // Call the zipChanged function passed in as a prop to update the zip code state as the user types
        value={props.zip}
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState(""); // Initialize the zip code state to an empty string
  const [cities, setCities] = useState([]);  // Initialize the cities state to an empty array

  const handleZipChange = async (zip) => { // Create an async function to handle the zip code change
    setZipCode(zip);                      // Update the zip code state as the user types   
    if (zip.length === 5) {              // Only fetch when we have a complete zip code as it is always 5 digits
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`); // Fetch the data from the API using the zip code
      if (response.status === 200) {   // Check if we get a 200 response
        const data = await response.json(); // Parse the response as JSON
        setCities(data);                   // Update the cities state with the data we get back
      } else {
        setCities([]);                   // Clear the cities array if we don't get a 200 response
      }
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="container center-content">
        <div className="zip-input">
          <ZipSearchField zip={zipCode} zipChanged={handleZipChange} />
        </div>
        {cities.length ? 
          cities.map((city) => (
            <City key={city.RecordNumber} data={city} />
          ))
          : 
          <div className="no-results">No results found</div>
        }
      </div>
    </div>
    );
};

export default App;
