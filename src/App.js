import React, {useState} from "react";
import "./App.css";

function City({city, state, lat, long, estimatedPopulation, totalWages}) {
  return(
    <div className = "card mb-5">
      {/** To display the City and State*/}
      <div className = "card-header">
        {city}, {state}
      </div>
      {/** To display the contents of the card */}
      <div className = "card-body">
        <ul>
          <li>State: {state}</li>
          <li>Location: ({lat}, {long})</li>
          <li>Population (estimated): {estimatedPopulation}</li>
          <li>Total Wages: {totalWages} </li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({handleChange, value}) {
  return(
    <div className = "my-5">
      {/** To Display the search field, where input is the zip code */}
      <label htmlFor = "zip-code">Zip Code:</label>
      <input
        className = "form-control"
        id = "zip-code"
        type = "text"
        onChange = {handleChange}
        value = {value}
      />
    </div>
  );
}

function App() {
  //Constructor function for zipCode
  const [zipCode, setZipCode] = useState("");
  //Constructor function for zipCodeResults
  const [zipCodeResults, setZipCodeResults] = useState([]);

  {/** Event handler for zip code whenever the value is changed */}
  const zipCodeChanged = (event) => {
    const newZipCode = event.target.value;
    console.log(newZipCode);
    setZipCode(newZipCode);
    
    {/** Will only show new results when it is a valid zip code with 5 digits */}
    if(newZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${newZipCode}`)
        .then((res) => res.json())
        .then((body) => setZipCodeResults(body))
        .catch(() => setZipCodeResults([]));
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
        <ZipSearchField value = {zipCode} handleChange = {zipCodeChanged}/>
        <div>
          {/** Importing data from the API zipData file to this js file for usage */}
          {zipCodeResults.map((zipData) => (
            <City
              city = {zipData.City}
              state = {zipData.State}
              lat = {zipData.Lat}
              long = {zipData.Long}
              estimatedPopulation = {zipData.EstimatedPopulation}
              totalWages = {zipData.TotalWages}
              key = {zipData.RecordNumber}
            />
          ))}
          {zipCodeResults.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
