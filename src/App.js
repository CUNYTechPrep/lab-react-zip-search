import React from "react";
import "./App.css";
import { useState } from "react";

function City(handleChange, value) {
  console.log(handleChange);
  return <div className="city-box mt-4">
    <div className="city-box-header">{handleChange.city}, {handleChange.state}</div>
    <ul className="mt-4">
      
      <li><strong>State: </strong>{handleChange.state}</li>
      <li><strong>Latitude: </strong>{handleChange.lat}</li>
      <li><strong>Longitude </strong>{handleChange.long}</li>
      <li><strong>Population: </strong>{handleChange.estimatedPopulation}</li>
      <li><strong>Total wages: </strong>{handleChange.totalWages}</li>
      
    </ul>

  </div>;
}

function ZipSearchField({handleChange, value}) {
  return (
  <div className=" mt-4">
    <label htmlFor="zip-code mt-4">Zip Code:</label>
    <input
      className="form-control mt-4"
      id="zip-code"
      type="text"
      onChange={handleChange}
      value={value}
    />
  </div>
  );
}

function App() {
  
    const [zipCode, setZipCode] = useState("");
    const [zipCodeResults, setZipCodeResults] = useState([]);

    const zipCodeChanged = (event)=>{
      const newZipCode = event.target.value;
      console.log(newZipCode);
      setZipCode(newZipCode);

      if(newZipCode.length ===5){
        fetch(`https://ctp-zip-api.herokuapp.com/zip/${newZipCode}`)
        .then((res) => res.json())
        .then((body)=>setZipCodeResults(body))
        .catch(()=>setZipCodeResults([]));
      }

      else {
        setZipCodeResults([]);
      }
    };
    
    return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField value={zipCode} handleChange={zipCodeChanged}/>
        <div>
          {zipCodeResults.map((zipData)=>(
          <City 
            city={zipData.City}
            state = {zipData.State}
            lat = {zipData.Lat}
            long = {zipData.Long}
            estimatedPopulation = {zipData.EstimatedPopulation}
            totalWages = {zipData.TotalWages}
            key = {zipData.RecordNumber}
          />
        ))}
        {zipCodeResults.length===0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
