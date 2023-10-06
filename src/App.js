import React, { useState, useEffect } from "react";
import "./App.css";


function City(props) {

  return (
    <div>
      <h1>{props.zipInfo.LocationText}</h1>
      <ul>
        <li>
          <h3>State: {props.zipInfo.State}</h3>
        </li>
        <li>
          <h3>Location: ({props.zipInfo.Lat}, {props.zipInfo.Long})</h3>
        </li>
        <li>
          <h3>Population(estimated): {props.zipInfo.EstimatedPopulation}</h3>
        </li>
        <li>
          <h3>Total Wages: {props.zipInfo.TotalWages}</h3>
        </li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  const [zipInfo, setZipInfo] = useState([])
  useEffect(() => {
    fetch(`https://ctp-zip-code-api.onrender.com/zip/${props.zipcode}`)
      .then((response) => response.json())
      .then((data) => {
        setZipInfo(data)
      })
      .catch((e) => {
        setZipInfo([])
      });
  }, [props.zipcode]);

  return (
    <div>
      <h1>Zip Code:</h1>
      <input value={props.Zipcode} onChange={props.change}></input>
      {zipInfo.length === 0 ? <h1>No results found</h1> : (zipInfo.map((zip) => (
        <City zipInfo={zip} />
      )))}
    </div>
  );
}

function App() {
  const [zipcode, setZipcode] = useState()
  function handleChange(e) {
    setZipcode(e.target.value)
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipcode={zipcode} setZipcode={setZipcode} change={handleChange} />
      </div>
    </div>
  );
}
export default App;
