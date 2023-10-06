import React, { useState } from "react";
import "./App.css";

function City(props) {
  return (
    <div>
      <h3>{props.data.City}, {props.data.State}</h3>
      <ul>
        <li>State: {props.data.State}</li>
        <li>Location ({props.data.Lat}, {props.data.Long})</li>
        <li>Population (estimated): {props.data.EstimatedPopulation}</li>
        <li>Total Wages: {props.data.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      Zip Code: 
      <input
        type="text"
        placeholder="try 10016"
        value={props.zipCode}
        onChange={props.handleInputChange}
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);

  const handleInputChange = async (event) => {
    const zip = event.target.value;
    setZipCode(zip);

    if (zip.length === 5){
      try {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
        if (response.status !== 200) {
          throw new Error("Not found");
        }
        const data = await response.json();
        setCities(data);
        } catch (error) {
          console.log(error)
        }
      } else {
        setCities([])
      }
  };
    
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipCode={zipCode} handleInputChange={handleInputChange}/>
        <div>
          {cities.map((city) => (
            <City key={city.RecordNumber} data={city} />
          ))}
        </div>
      </div>
    </div>
  );

}

export default App;
