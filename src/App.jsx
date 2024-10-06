import { useState } from "react";
import "./App.css";

function City( props ) {
  return (
    <div className="city-result border rounded-md shadow-md overflow-hidden">
      <div className="bg-gray-200 p-3">
      <h3 className="text-lg font-bold">{props.City}, {props.State}</h3>
      </div>
      <ul>
        <li>State: {props.State}</li>
        <li>Location: ({props.Lat}, {props.Long})</li>
        <li>Population (estimated): {props.EstimatedPopulation}</li>
        <li>Total Wages: {props.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField({ handleZipSearch }) {
  const [zipCode, setZipCode] = useState("");

  const handleInputChange = (event) => {
    const newZip = event.target.value;
    setZipCode(newZip);
    handleZipSearch(newZip);
  };

  return (
    <div className="zip-search-field">
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={handleInputChange}
      />
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async (zipCode) => {
    if (!zipCode) {
      setCities([]);
      setError("");  
      return;
    }

    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
        setError("");  // clear error on success
      } else {
        setCities([]);
        setError("No results found");  // Show error if no data returned
      }
    } catch (error) {
      setCities([]);
      setError("No results found");  // General error message
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleZipSearch={fetchData} />
        <div>
          {error && <p className="error">{error}</p>}
          {cities.map((city) => (
            <City key={city.RecordNumber} {...city} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
