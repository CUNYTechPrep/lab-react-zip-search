import React, { useState, useEffect } from "react";
import "./App.css";

function ZipSearchField({handleInputChange, zipInput}) {
  return (
    <form>
      <div className="form-group mt-5 mb-5">
        <label htmlFor="zipCodeInput">Zip Code:</label>
        <input className="form-control" id="zipCodeInput" placeholder="Enter zip code"
        onChange={handleInputChange} value={zipInput} />
        <small className="form-text text-muted">Zip codes should have 5 digits.</small>
      </div>
    </form>
  );
}

function Cities({foundCities}) {
  if (foundCities.length === 0) {
    return (
      <strong>No results found</strong>
    );
  } else {
    return (<div>{foundCities.map((cityInfo, index) => (
      <div key={index} className="card mt-5 mb-5">
        <div className="card-header">
          {cityInfo.City}, {cityInfo.State}
        </div>
        <div className="card-body">
          <ul>
            <li>State: {cityInfo.State}</li>
            <li>Location: ({cityInfo.Lat}, {cityInfo.Long})</li>
            <li>Population (estimated): {cityInfo.EstimatedPopulation}</li>
            <li>Total Wages: {cityInfo.TotalWages}</li>
          </ul>
        </div>
      </div>
    ))}</div>
    );
  }
}

function App() {
  const [zipInput, setZipInput] = useState("")
  const [foundCities, setFoundCities] = useState([])

  const handleInputChange = (event) => {
    const input = event.target.value;
    setZipInput(input);
  };

  // Causes zipSearch() to be called when zipInput is updated
  useEffect(() =>{
    if (zipInput.length === 5) {
      zipSearch();
    } else {
      setFoundCities([]); // Whenever input zip code is not 5 digits, no cities should be displayed
    }
  }, [zipInput]); // ?

  const zipSearch = () => {
    fetch("https://ctp-zip-api.herokuapp.com/zip/" + zipInput)
    .then((response) => {
      return response.json();
    })
    .then((jsonBody) => {
      const cities = [];
      for (let cityInfo of jsonBody) {
        console.log(cityInfo);
        cities.push(cityInfo);
      }
      setFoundCities(cities);
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleInputChange={handleInputChange} value={zipInput}/>
        <Cities foundCities={foundCities}/>
      </div>
    </div>
  );
}

export default App;
