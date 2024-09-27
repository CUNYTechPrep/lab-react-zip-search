import { useState } from "react";
import "./App.css";

function City({ city, state, lat, long, population, wages }) {
  return (
    <>
      <div class="card mb-3">
        <div class="card-header">
          {city}, {state}
        </div>
        <div class="card-body">
          <ul>
            <li>State: {state}</li>
            <li>
              Location: ({lat},{long})
            </li>
            <li>Population (estimated): {population}</li>
            <li>Total Wages : {wages}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <>
      <form>
        <div class="form-group row justify-content-center">
          Zip Code:
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              id="zipInput"
              placeholder="Type 10016"
              onChange={(e) => onZipChange(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [dataResponse, setDataResponse] = useState([]);
  const [error, setError] = useState(false);

  const fetchCityData = async (zip) => {
    if (zip.length === 5 && !isNaN(zip)) {
      try {
        const response = await fetch(
          `https://ctp-zip-code-api.onrender.com/zip/${zip}`
        );
        if (response.ok) {
          const data = await response.json();
          setDataResponse(data);
          setError(false);
        } else {
          setError(true);
          setDataResponse([]);
        }
      } catch (error) {
        console.error(error);
        setError(true);
        setDataResponse([]);
      }
    } else {
      setDataResponse([]);
      setError(false);
    }
  };

  const handleZipChange = (zip) => {
    setZipCode(zip);
    fetchCityData(zip);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={handleZipChange} />
        <div>
          {error ? (
            <p>No Results</p>
          ) : (
            dataResponse.map((cityData, index) => (
              <City
                key={index}
                city={cityData.City}
                state={cityData.State}
                lat={cityData.Lat}
                long={cityData.Long}
                population={cityData.EstimatedPopulation}
                wages={cityData.TotalWages}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
