import { useState, useEffect } from "react";
import "./App.css";

function City({ LocationText, State, Lat, Long, EstimatedPopulation, TotalWages }) {
  return (
    <div className="card">
      <div className="city-header">{LocationText.toUpperCase()}</div>
      <div className="city-body">
        <ul>
          <li>State: {State}</li>
          <li>Location: ({Lat}, {Long})</li>
          <li>Population (estimated): {EstimatedPopulation}</li>
          <li>Total Wages: {TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ searchZip }) {
  const [input, setInput] = useState("");

  function handleInput(event) {
    const value = event.target.value;
    setInput(value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length === 5) {
        searchZip(input);
      } else if (input.length > 5) {
        // If input is more than 5 characters, reset the results
        searchZip("");
      } else {
        // If input is less than 5 characters, also reset results
        searchZip("");
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [input, searchZip]);

  return (
    <div>
      <label>Zip Code:</label>
      <input
        className="form-control"
        type="text"
        value={input}
        onChange={handleInput}
      />
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  const [resultMessage, setResultMessage] = useState("No results found");

  async function fetchCity(zipcode) {
    if (!zipcode) {
      setCities([]);
      setResultMessage("No results found");
      return;
    }

    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipcode}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length === 0) {
        setCities([]);
        setResultMessage("No results found");
      } else {
        setCities(data);
        setResultMessage("");
      }
    } catch (error) {
      console.log(error);
      setCities([]);
      setResultMessage("No results found");
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <div className="my-5">
          <ZipSearchField searchZip={fetchCity} />
        </div>
        <div>
          {cities.map(city => (
            <City key={city.RecordNumber} {...city} />
          ))}
        </div>
        <strong>{resultMessage}</strong>
      </div>
    </div>
  );
}

export default App;
