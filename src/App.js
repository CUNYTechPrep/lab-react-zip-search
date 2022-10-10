import React, { useState } from "react";
import "./App.css";

function City({state, estPop, city, taxReturns}) {
  return (
    <div> 
      <strong>{state}, {city} </strong>
      <ul>
        <li>State: {state}</li>
        <li>City: {city}</li>
        <li>Estimated Population: {estPop}</li>
        <li>Tax Returns Filed: {taxReturns}</li>
      </ul>
      <br></br>
    </div>
  );
}

function ZipSearchField({handleChange}) {
  return <div>
    <label>
      Zip Code:
      <input type="text" name="name" id="input" onChange={handleChange}/>
    </label>
</div>;
}

function App() {

  const [zipCode, setZipCode] = useState(null)

  const[zipResults, setZipResults] = useState([])

  const handleChange = (event) => {
    const zipInput = document.getElementById('input').value
    setZipCode(zipInput)

    if( zipInput.length === 5 ) {
      fetch('https://ctp-zip-api.herokuapp.com/zip/'+zipInput)
      .then((response) => response.json())      
      .then((data) => setZipResults(data))
    }
    else {
      setZipResults([])
    }

    
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <br></br>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleChange={handleChange}/>
        <div><br></br>
          {zipResults.map((data) => (
            <City 
              state = {data.State}
              city = {data.City}
              estPop = {data.EstimatedPopulation}
              taxReturns = {data.TaxReturnsFiled}
              key = {data.RecordNumber}
            />
          ))}
          {zipResults.length === 0 && <strong><p>No results found</p></strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
