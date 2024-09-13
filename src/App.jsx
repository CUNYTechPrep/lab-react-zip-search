import { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

async function fetchCityData(zipCode, setCityInfo) {
  const baseUrl = "https://ctp-zip-code-api.onrender.com/";
  const url = baseUrl + "zip/" + zipCode;

  if (zipCode.length !== 5) {
    setCityInfo([]);
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    setCityInfo(data);
  } catch (err) {
    console.log("Error: ", err);
  }
}

function City(props) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header text-white bg-primary">
        {props.LocationText.toUpperCase()}
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>State:</strong> {props.State}</li>
          <li><strong>Location:</strong> ({props.Lat + ', ' + props.Long})</li>
          <li><strong>Population (estimated):</strong> {props.EstimatedPopulation}</li>
          <li><strong>Total Wages:</strong> {props.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="mb-5 mt-3">
      <label htmlFor="zip-search-field" className="font-weight-bold">Zip Code:</label>
      <input
        className="form-control shadow-sm"
        name="zip-search-field"
        placeholder="Try 10016"
        maxLength="5"
        onChange={(e) => {
          const zipCode = e.target.value;
          props.setZipCode(zipCode);
        }}
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cityInfo, setCityInfo] = useState([]);

  useEffect(() => {
    fetchCityData(zipCode, setCityInfo);
  }, [zipCode]);

  return (
    <div className="App" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="App-header bg-dark text-white py-3 mb-4">
        <h1>Zip Code Search</h1>
      </div>
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <ZipSearchField setZipCode={setZipCode} />
          <div>
            {cityInfo.length === 0 ? (
              <strong className="text-danger">No results found</strong>
            ) : (
              cityInfo.map((city) => <City key={city.RecordNumber} {...city} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
