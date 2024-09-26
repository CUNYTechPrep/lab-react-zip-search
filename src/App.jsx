import { useState } from "react";
import "./App.css";
import City from "./City";
import ZipSearchField from "./ZipSearchField";


function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  
  const fetchCitiesByZip = (zip) => {
    if (zip.length === 5) {
      fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No results found for this ZIP code.");
          }
          return response.json();
        })
        .then((data) => {
          setCities(data);
          setError(null); 
        })
        .catch((err) => {
          setError(err.message);
          setCities([]); 
        });
    } else {
      setCities([]);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={fetchCitiesByZip} />
        <div>
          {error && <p>{error}</p>}
          {cities.length > 0
            ? cities.map((cityData, index) => <City key={index} cityData={cityData} />)
            : !error && <p>No city data available. Please enter a valid ZIP code.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;