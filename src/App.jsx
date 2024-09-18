import { useState, useEffect } from "react";
import "./App.css";

function City({inputCities}) {
  return (
    <div class="city">
      {inputCities.map((location) => (
        <div class="inner city">
          <li key={location.RecordNumber} class="one"> 
            <h5 class="title">{location.City},{location.State}</h5>
            <ul class="two">
              <li>State: {location.State}</li>
              <li>Location: ({location.Lat},{location.Long})</li>
              <li>Population (estimated): {location.EstimatedPopulation}</li>
              <li>Total Wages: {location.TotalWages}</li>
            </ul>
          </li>
        </div>
      ))}
    </div>
  );
}

function ZipSearchField({inputZip, setInputZip, zipChange}) {
  return (
    <div class="search">
      <label class="search-bar">
        <strong>Zip Code:</strong>
        <br/>
        <input class="search-word"
          type="text"
          value={inputZip}
          onChange={(e) => setInputZip(e.target.value)}
          placeholder="e.g., 10016"
        />
      </label>
      <button onClick={zipChange}>Search</button>
    </div>  
  );
}

function App() {
  // Declare state to hold user input
  const [inputZip, setInputZip] = useState("");
  const [inputCities, setCities] = useState([]);

  // Fetch data based on zip code
  const zipChange = async() => {
    const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${inputZip}`);
    const data = await response.json();
    setCities(data);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="user-input" style={{ maxWidth: 400 }}>
        <ZipSearchField inputZip={inputZip} setInputZip={setInputZip} zipChange={zipChange} />
        {inputCities.length > 0 && <City inputCities={inputCities} />}
      </div>
    </div>
  );
}

export default App;
