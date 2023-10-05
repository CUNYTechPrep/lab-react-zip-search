import React, { useState } from "react";
import "./App.css";

function City({ city, state, lat, long, estimatedPopulation, totalWages }) {
  return (
    <div className="card mb-5">
      <div className="card-header">
        {city}, {state}
      </div>
      <div className="card-body" style={{width: 400}}>
        <ul>
          <li>State: {state}</li>
          <li>
            Location: ({lat}, {long})
          </li>
          <li>Population (estimated): {estimatedPopulation}</li>
          <li>Total Wages: {totalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField( {handleEvent, event}) {  
  return (
    <div>
      <label htmlFor="zipInput">Zip Code:</label>
      <br></br>
      <input id="zipInput" type="text" onChange={handleEvent} value={event}></input>
    </div>
  )
}
 
function App() {
  const [zip, setZip] = useState(""); 
  const [zipLocations, setZipLocations] = useState([]); 

  
  const handleEvent = (event) => {
    const newZip = event.target.value
    setZip(newZip) 
    
    if (event.target.value.length === 5) {
      let query = `https://ctp-zip-code-api.onrender.com/zip/${newZip}` 
      fetch(query)
      .then((res) => res.json())
      .then((data) => {
        setZipLocations(data);
        console.log(data)
      })
      .catch(() =>  setZipLocations([]))
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div style= {{margin: 50 }}></div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleEvent = {handleEvent} value = {zip}></ZipSearchField>
        <div style= {{margin: 50 }}></div>
          {zipLocations.map((zip) => (
            <City 
              city={zip.City}
              state={zip.State}
              lat = {zip.Lat}
              long = {zip.Long}
              estimatedPopulation = {zip.EstimatedPopulation}
              totalWages = {zip.TotalWages}
            ></City>
          ))
          }
      </div>
    </div>
  );
}

export default App;
