import { useState } from "react";
import "./App.css";

function City({city}) {
  return (
    <div className="city-card">
      <h2>{city.City}, {city.State}</h2>
      <p><strong>State:</strong> {city.State}</p>
      <p><strong>Location:</strong> ({city.Lat}, {city.Lng})</p>
      <p><strong>Population (estimated):</strong> {city.EstimatedPopulation}</p>
      <p><strong>Total Wages:</strong> {city.TotalWages}</p>
    </div>
  );
}

function ZipSearchField({onCitiesUpdate}) {
  const [zip, setZip] = useState("");

const handleChange = (event) => {
  setZip(event.target.value);
}
const handleSearch = async () => {
  if (zip.length === 5 && !isNaN(zip)) { // Check for valid zip code
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
      if (response.ok) {
        const cities = await response.json();
        onCitiesUpdate(cities); // Pass the city data to parent component
        } else {
        console.error("Error fetching city data: ", response.statusText);
        onCitiesUpdate([]); // Clear cities if there's an error
      }
    } catch (error) {
      console.error("Error fetching city data: ", error);
        onCitiesUpdate([]); // Clear cities if there's a fetch error
      }
    } else {
      console.log("No results");
    onCitiesUpdate([]); // Clear cities if the zip code is invalid
  }
};

return (
  <div>
    <input
      type="text"
      value={zip}
      onChange={handleChange}
      placeholder="Enter zip code"
    />
    <button onClick={handleSearch}>Search</button>
  </div>
);
};

function App() {
  const [cities, setCities] = useState([]);

  const handleCitiesUpdate = (newCities) => {
    setCities(newCities);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
      <ZipSearchField onCitiesUpdate={handleCitiesUpdate} />
        <div>
        {cities.map((city, index) => (
          <City key={index} city={city} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
