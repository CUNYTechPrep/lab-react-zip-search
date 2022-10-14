import "./App.css";
import React, { useState, useEffect } from "react";

function City(city) {
  return(
    <div className="city-card">
      <div className="card-header">
        <p className="city-name">{city.city.City}, {city.city.State}</p>
      </div>
      <div className="card-body">
        <ul>
          <li>State: {city.city.State} </li>
          <li>Location: ({city.city.Lat}, {city.city.Long})</li>
          <li>Population (estimated): {city.city.EstimatedPopulation}</li>
          <li>Total Wages: {city.city.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({zip, setZip}) {
  return(
    <div className="zip-search-field">
      <label className="zip-code">
          Zip Code:
          <input
            className="zip-input"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </label>
    </div>
  );
}

function App() {
  const [cities, setCities] = useState(null);
  const [zip, setZip] = useState("");

  //check if zip is proper length to perform API call
  useEffect(() =>{
    if(zip.length === 5){
      getData(zip);
    }
    else{
      setCities(null);
    }
  }, [zip]);

  //fetch city data
  async function getData(zip){
    fetch("https://ctp-zip-api.herokuapp.com/zip/" + zip)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zip={zip} setZip={setZip} />
        <div>
          {cities === null ? (<p>No Result Found</p>) : 
          <div>
          {cities.map((city) => (
            <City  key={city.City} city={city} />
          ))}
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;