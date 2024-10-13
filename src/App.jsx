import { useState } from "react";
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

function ZipSearchField({ zipCode, setZipCode, onSearch }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ fontSize: "1.2em" }}>Zip Code:</label>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter Zip Code"
        style={{ padding: "10px", fontSize: "1.2em", marginRight: "10px" }}
      />
      <button onClick={onSearch} style={{ padding: "10px", fontSize: "1.2em" }}>
        Show Results
      </button>
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);

  const fetchCityData = async () => {
    if (zipCode.length !== 5) {
      setCities([]);
      setError(true);
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

  const handleSearch = () => {
    fetchCityData();
  };

  return (
    <div className="App" style={{ fontSize: "1.5em", padding: "20px" }}>
      <div
        className="App-header"
        style={{ fontSize: "2em", marginBottom: "20px" }}
      >
        <h1>Zip Code Search</h1>
      </div>
      <div
        className="mx-auto"
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        <ZipSearchField
          zipCode={zipCode}
          setZipCode={setZipCode}
          onSearch={handleSearch}
        />
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
