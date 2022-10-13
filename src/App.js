import React, { useState } from "react";
import "./App.css";

function City({city, state, lat, long, population, totalWages}) {
  return (
  <div className="card mb-5">
    <div className="card-header">
      {`${city}, ${state}`}
    </div>
    <div className="card-body">
      <ul>
        <li>{`State: ${state}`}</li>
        <li>{`Location: (${lat}, ${long})`}</li>
        <li>{`population (estimated): ${population}`}</li>
        <li>{`Total Wages: ${totalWages}`}</li>
      </ul>
    </div>  
  </div>
  );
}

function ZipSearchField(props) {
  return(
   <div className="form">
    <label htmlFor="zip-code">Zip Code:</label>
    <input 
      className="form-control" 
      id="zip-code" 
      type="text"
      onChange = {props.handleChange}
     />
  </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  
  const getZipCode = async (event) => {
    if(event.target.value.length === 5){
      try{
        const response = await fetch("https://ctp-zip-api.herokuapp.com/zip/" + event.target.value);
        const cities = await response.json();
        setCities(cities);
      } catch(error){
        console.log("Error: ", error);
      }
    } else setCities([]);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleChange={getZipCode}/>
        <div>
          {cities.map((zipData) => (
            <City
               city = {zipData.City}
               state = {zipData.State}
               lat = {zipData.Lat}
               long = {zipData.Long}
               population = {zipData.EstimatedPopulation}
               totalWages = {zipData.totalWages}
               key = {zipData.RecordNumber}
            />
          ))}

          {cities.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
