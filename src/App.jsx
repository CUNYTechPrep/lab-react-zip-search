import { useState } from "react";
import "./App.css";

function City({ city }) {
  return (
    <div className="city-container">
      <h2>
        {city.City}, {city.State}
      </h2>
      <ul>
        <li>
          <strong>State:</strong> {city.State}
        </li>
        <li>
          <strong>Location:</strong> ({city.Lat}, {city.Long})
        </li>
        <li>
          <strong>Population (estimated):</strong> {city.EstimatedPopulation}
        </li>
        <li>
          <strong>Total Wages:</strong> {city.TotalWages}
        </li>
      </ul>
    </div>
  );
}

function ZipSearchField({ onSearch }) {
  const [zipCode, setZipCode] = useState("");

  const handleInputChange = (event) => {
    const zip = event.target.value;
    setZipCode(zip);

    if (zip.length === 5) {
      onSearch(zip);
    }
  };

  return (
    <div className="zip-container">
      <label htmlFor="zipCode">
        <strong>Zip Code:</strong>
      </label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        placeholder="Try 10016"
        value={zipCode}
        onChange={handleInputChange}
      />
    </div>
  );
}

function App() {
  const [cityData, setCityData] = useState([]);
  const [error, setError] = useState(null);
  //fetching using await/asynch
  const fetchCityData = async (zip) => {
    try {
      const response = await fetch(
        `https://ctp-zip-code-api.onrender.com/zip/${zip}`
      );

      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      setCityData(data);
      setError(null);
    } catch (error) {
      setCityData([]);
      setError(error.message);
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onSearch={fetchCityData} />
        <div>
          {error && <p>{error}</p>}

          {cityData.length > 0 &&
            cityData.map((city, index) => <City key={index} city={city} />)}

          {!error && cityData.length === 0 && <p>No results</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
