import { useState, useEffect } from "react";
import "./App.css";

function City({ city }) {
  return (
    <div className="city-box">
      <h3>
        {city.City}, {city.State}
      </h3>
      <p>State: {city.State}</p>
      <p>
        Location: ({city.Lat}, {city.Long})
      </p>
      <p>Population (estimated): {city.EstimatedPopulation}</p>
      <p>Total Wages: {city.TotalWages}</p>
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
    if (zipCode.length === 5) {
      fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No results found");
          }
        })
        .then((data) => {
          setCities(data);
          setError(false);
        })
        .catch(() => {
          setCities([]);
          setError(true);
        });
    } else {
      setCities([]);
    }
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
              <City key={city.RecordNumber} city={city} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
