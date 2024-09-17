import { useState } from "react";
import "./App.css";

function City(props) {
  const { City, State, Lat, Long, EstimatedPopulation, TotalWages } = props.data;

  return (
    <div className="City">
      <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "4px" }}>
        <h3>{City.toUpperCase()}, {State}</h3>
        <ul>
          <li><strong>State:</strong> {State}</li>
          <li>
            <strong>Location:</strong> 
            ({Lat}, {Long})
          </li>
          <li><strong>Population (estimated):</strong> {EstimatedPopulation}</li>
          <li><strong>Total Wages:</strong> {TotalWages}</li>
        </ul>
      </div>
    </div>
  );

}


function ZipSearchField(props) {
  const handleChange = (event) => {
    props.onZipCodeChange(event.target.value);
  };

  return (
    <div className="ZipSearchField">
      <label>Zip Code: </label>
      <input type="text" placeholder="Enter zip code" onChange={handleChange} />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState('');
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');

  const handleZipCodeChange = async (zip) => {
    setZipCode(zip);

    if (zip.length === 5) {
      try {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
        if (!response.ok) {
          throw new Error('No results found');
        }

        const data = await response.json();
        
        setCities(data);
        setError('');
      } catch (err) {
        setCities([]);
        setError(err.message);
      }
    } else {
      setCities([]);
      setError('');
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipCodeChange={handleZipCodeChange} />
        <div>
          {error && <p>{error}</p>}
          {cities.length > 0 ? (
            cities.map((cityData, index) => (
              <City key={index} data={cityData} />
            ))
          ) : (
            !error && <p>No Results</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
