import React, { cloneElement, useEffect } from "react";
import {useState} from 'react';
import "./App.css";

function City({ city, state, lat, long, estimatedPopulation, totalWages }) {
  return (
    <div >
      <div>
        {city}, {state}
      </div>
      <div>
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
function ZipSearchField({handleChange, value}) {
  return (
    <>
      <br />
      <br />
      <label for="zip-code">Zip Code:</label>
      <br/>
      <input type="text" id="zip-code" class="form-control" value={value} onChange={handleChange}></input>
    </>
  );
  
}


function App() {
  const [zipCode, setZipCode] = useState("");
  const [data, setdata] = useState([]);

  const zipCodeChange = (event) => {
    const temp = event.target.value;
    setZipCode(temp);

    if(temp.length === 5){
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${temp}`)
      .then((res) => res.json())
      .then((body) => {setdata(body)})
      .catch(() => setdata([]) );
    }else{
      setdata([]);
    }
    console.log(data);
  };
  

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField value={zipCode} handleChange={zipCodeChange}/>
        <div>
        {data.map((zipData) => (
            <City
              city={zipData.City}
              state={zipData.State}
              lat={zipData.Lat}
              long={zipData.Long}
              estimatedPopulation={zipData.EstimatedPopulation}
              totalWages={zipData.TotalWages}
              key={zipData.RecordNumber}
            />
          ))}
          {/* If there are no results output a no results message */}
          {data.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;
