import { useState, useEffect } from "react";
import "./App.css";

// City component: Displays information for a single city
function City({ city }) {
  return (
    <div className="city">
      <h2>{city.City}, {city.State}</h2>
      <p>State: {city.State}</p>
      <p>Location: ({city.Lat}, {city.Long})</p>
      <p>Population (estimated): {city.EstimatedPopulation}</p>
      <p>Total Wages: {city.TotalWages}</p>
    </div>
  );
}

// ZipSearchField component: Handles user input for zip code
function ZipSearchField({ onZipChange }) {
  return (
    <div className="zip-search-field">
      <label htmlFor="zip-code">Zip Code: </label>
      <input
        type="text"
        id="zip-code"
        onChange={(e) => {
          // console.log("Input changed:", e.target.value); // Debugging: Log input changes
          onZipChange(e.target.value);
        }}
        placeholder="Enter a zip code"
      />
    </div>
  );
}

// Main App component
function App() {
  // State hooks
  const [zipCode, setZipCode] = useState(""); // Stores the current zip code
  const [cities, setCities] = useState([]); // Stores the list of cities
  const [error, setError] = useState(""); // Stores any error messages

  // Effect hook: Runs when zipCode changes
  useEffect(() => {
    console.log("Zip code changed:", zipCode); // Debugging: Log zip code changes

    // Async function to fetch data from the API
    const fetchData = async () => {
      // Only fetch if zipCode is exactly 5 characters
      if (zipCode.length !== 5) {
        setCities([]);
        setError("");
        return;
      }

      // Inner async function to handle the actual API call
      const fetchCities = async () => {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`);
        if (!response.ok) {
          throw new Error('No results found');
        }
        return response.json();
      };

      // Call fetchCities and handle the result
      await fetchCities()
        .then(data => {
          console.log("Fetched data:", data); // Debugging: Log fetched data
          setCities(data);
          setError("");
        })
        .catch(err => {
          console.error("Error fetching data:", err); // Debugging: Log any errors
          setCities([]);
          setError(err.message);
        });
    };

    // Call the fetchData function
    fetchData();
  }, [zipCode]); // This effect runs whenever zipCode changes

  // Render the component
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <ZipSearchField onZipChange={setZipCode} />
      {error && <p className="error">{error}</p>}
      {cities.map((city, index) => (
        <City key={index} city={city} />
      ))}
    </div>
  );
}

export default App;