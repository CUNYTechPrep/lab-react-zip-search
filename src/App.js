import React, { useEffect, useState } from 'react';
import "./App.css";

function City({LocationText, State, Lat, Long, EstimatedPopulation, TotalWages}) {
  return (
    <div className='city-card'>
      <p className='city-name'>{LocationText}</p>
      <ul>
        <li>State: {State} </li>
        <li>Location: ({Lat}, {Long})</li>
        <li>Population (estimated): {EstimatedPopulation}</li>
        <li>Total wages: {TotalWages}</li>
      </ul>
    </div>
  )
}

function ZipSearchField({zipSearch, setZipSearch}) {
  return (
    <div className='zip-field'>
      <p className='zip-name'>Zip Code:</p>
      <input 
        className='zip-input'
        type="text" 
        placeholder='Enter valid zip code'
        onChange={(e) => setZipSearch(e.target.value)} 
        value={zipSearch} 
      />
    </div>
  );
}

function App() {
  const [zipSearch, setZipSearch] = useState("");
  const [cityField, setCityField] = useState(null);

  useEffect(() => {
    if (zipSearch.length == 5) {
      fetch("https://ctp-zip-api.herokuapp.com/zip/" + zipSearch)
      .then((response) => response.json())
      .then((data) => {
        setCityField(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else {
      setCityField(null);
    }
  }, [zipSearch])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>

      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipSearch = {zipSearch} setZipSearch = {setZipSearch} />
          {cityField === null ? (<p>No Result Found</p>) : 
          <div>
          {cityField.map((city) => (
            <City  key={city.City} LocationText={city.LocationText} State={city.State} Lat={city.Lat} Long={city.Long} EstimatedPopulation={city.EstimatedPopulation} TotalWages={city.TotalWages} />
          ))}
          </div>
          }
      </div>
    </div>
  );
}

export default App;
