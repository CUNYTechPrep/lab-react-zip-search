import { useState, useEffect } from "react";
import "./App.css";

function City({ cityData }) {
  return (
    <div className="city-box">
      <h3>
        {cityData.City}, {cityData.State}
      </h3>
      <p>State: {cityData.State}</p>
      <p>
        Location: ({cityData.Lat}, {cityData.Long})
      </p>
      <p>Population (estimated): {cityData.EstimatedPopulation}</p>
      <p>Total Wages: {cityData.TotalWages}</p>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <div>
      <label>Zip Code:</label>
      <input
        type="text"
        onChange={(e) => onZipChange(e.target.value)}
        //onZipChange prop (a function passed from the parent component) to notify the parent whenever the user changes the input value.
        placeholder="Enter Zip Code"
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    //Hook for Fetching Data
    // Hook that runs whenever the zipCode changes.
    const fetchCityData = async () => {
      // Asynchronous function to fetch city data.
      if (zipCode.length !== 5) {
        // If the zip code is not 5 characters long, clear the cities list.
        setCities([]);
        return;
      }

      try {
        const response = await fetch(
          `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`
        );
        if (!response.ok) throw new Error("No results found"); // If the response is not ok, throw an error.

        const data = await response.json(); // Parse the response JSON.
        setCities(data); // Set the cities state with the fetched data.
        setError(false); // Clear any previous error state.
      } catch {
        setCities([]); // If there's an error, clear the cities state.
        setError(true); // Set the error state to true.
      }
    };

    fetchCityData(); // Call the fetchCityData function.
  }, [zipCode]); // Only re-run this effect when "zipCode" changes.

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={setZipCode} />
        {error ? (
          <div>No results found</div>
        ) : (
          <div>
            {cities.map((city) => (
              <City key={city.RecordNumber} cityData={city} />
              //key prop is a special attribute in React that helps React identify which items have changed, are added, or are removed
              //city.RecordNumber is used as a unique identifier for each City component
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
