import { useState, useEffect } from "react";
import "./App.css";

function City({ city, state, location, population, totalWages }) {
  return (
    <>
      <div className="card mb-5">
        <div className="card-header">{city}, {state}</div>
        <div className="card-body">
          <ul>
            <li>State: {state}</li>
            <li>Location: {location}</li>
            <li>Population (estimated): {population}</li>
            <li>Total Wages: {totalWages}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ZipSearchField() {
  const [zip, setZip] = useState(""); 
  const [cities, setCities] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (zip.length === 5) {
        fetchCityData(zip);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [zip]);

  const fetchCityData = async (zip) => {
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
      if (!response.ok) {
        throw new Error("No results found");
      }
      const data = await response.json();
      const cityDetails = data.map((record) => ({
        city: record.City,
        state: record.State,
        location: `${record.Lat}, ${record.Long}`,
        population: record.EstimatedPopulation,
        wages: record.TotalWages
      }))
      setCities(cityDetails);
      setError("");
    } catch (error) {
      setCities([]);
      setError(error.message);
    }
  };

  return (
    <div>
      <label htmlFor="zip-code">Zip Code:</label>
      <input
        type="text"
        value={zip}
        id="zip-code"
        onChange={(e) => setZip(e.target.value)}
        placeholder="Enter zip code"
      />
      <br />
      <br />
      {error && <div>{error}</div>}
      {cities.length > 0 && (
        <div>
          {cities.map((cityDetail, index) => (
            <City 
              key={index}
              city={cityDetail.city}
              state={cityDetail.state} 
              location={cityDetail.location}
              population={cityDetail.population}
              totalWages={cityDetail.wages}
            />
          ))}
        </div>
      )}
    </div>
  ) 
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        {/* <div>
          <City />
          <City />
        </div> */}
      </div>
    </div>
  );
}

export default App;
