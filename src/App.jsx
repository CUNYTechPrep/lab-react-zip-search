import { useState } from "react";
import "./App.css";

function City(props) {
  return <div>
    <h2>{props.data.City}</h2>
    <ul>
      <li>State: {props.data.State}</li>
      <li>Location: ({props.data.Lat}, {props.data.Long})</li>
      <li>Population (estimated): {props.data.EstimatedPopulation}</li>
      <li>Total Wages: {props.data.TotalWages}</li>
    </ul>
  </div>;
}

function ZipSearchField(props) {

  const zipChanged = async (zip) => {
    if (zip.length === 5) {
      try{
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
        const data = await response.json();
        console.log(data);
        props.onChange(data);
      } catch (error) {
        console.error(error);
        props.onChange([]);
      }
    }
    else{
      props.onChange([]);
    }
  }

  return <div>
          <label>Zip Code:</label>
          <input 
            onChange={e => zipChanged(e.target.value)}
            type="text"
            placeholder="Try 10016"
          />
        </div>;
}

function App() {
  const [cities, setCities] = useState([]);
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField cities={cities} onChange={setCities} />
        <div>
          {cities && cities.length > 0 ? (
            cities.map((city, index) => (
              <City key={index} data={city} />
            ))
          ) : (
            <div>No Results</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
