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
    const fetchCityData = async () => {
      if (zipCode.length !== 5) {
        setCities([]);
        return;
      }

      try {
        const response = await fetch(
          `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`
        );
        if (!response.ok) throw new Error("No results found");

        const data = await response.json();
        setCities(data);
        setError(false);
      } catch {
        setCities([]);
        setError(true);
      }
    };

    fetchCityData();
  }, [zipCode]);

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
