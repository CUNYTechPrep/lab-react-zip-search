import { useState } from "react";
import "./App.css";

function City({ city }) {
  return (
    <div className="city">
      <h3>{city.City}</h3>
      <p>State: {city.State}</p>
      <p>Location: ({city.Lat}, {city.Long})</p>
      <p>Population (estimated): {city.EstimatedPopulation}</p>
      <p>Total Wages: ${city.TotalWages}</p>
    </div>
  );
}

function ZipSearchField({ onSearch }) {
  const [zip, setZip] = useState("");

  const handleInputChange = (e) => {
    setZip(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(zip);
    }
  };  

  return (
    <div className="zip-search-field">
      <label>Enter Zip Code:</label>
      <input
        type="text"
        value={zip}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter Zip Code"
      />
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  const fetchCityData = async (zip) => {
    setError(null); 
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setCities([]); 
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onSearch={fetchCityData} />
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div>
            {cities.map((city) => (
              <City key={city.RecordNumber} city={city} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
