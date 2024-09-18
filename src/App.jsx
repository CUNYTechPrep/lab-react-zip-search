import { useState, useEffect } from "react";
import "./App.css";

const api = "https://ctp-zip-code-api.onrender.com/";

async function getZipCode(zipcode) {
  const response = await fetch(api + "zip/" + zipcode);
  const data = await response.json();
  return data;
}

function City({ cityData }) {
  if (!cityData) return "No data found";

  return (
    <div>
      <h2>{cityData.City}</h2>
      <p>State: {cityData.State}</p>
      <p>Location: ({cityData.Lat}, {cityData.Long})</p>
      <p>Population (estimated): {cityData.EstimatedPopulation}</p>
      <p>Total Wages: {cityData.TotalWages}</p>
    </div>
  );
}

function ZipSearchField({ onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Type a zip code"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    if (zipCode.length === 5) {
      (async () => {    //why do i need to await it again?
        const data = await getZipCode(zipCode);
        setCityData(data);
      })();
    }
  }, [zipCode]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onChange={setZipCode} />
        <div>
          {cityData && cityData.map((city, index) => (
            <City key={index} cityData={city} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
