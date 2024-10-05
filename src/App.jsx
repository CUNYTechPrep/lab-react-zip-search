import { useState } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="card">
      <div className="city-header">{props.LocationText.toUpperCase()}</div>
      <div className="city-body">
        <ul>
          <li>State: {props.State}</li>
          <li>Location: ({props.Lat}, {props.Long})</li>
          <li>Population (estimated): {props.EstimatedPopulation}</li>
          <li>Total Wages: {props.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField( {searchZip} ) {
  const [input, setInput] = useState("");
  
  function handleInput(event) {
    console.log(event.target.value);
    setInput(event.target.value);
    searchZip(event.target.value);
  }

  return (
    <div>
      <label>Zip Code:</label>
      <input
        className="form-control"
        type="text"
        value={input}
        onChange={(event) => handleInput(event)}
      />
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  const [resultMessage, setResultMessage] = useState("No results found");

  async function fetchCity(zipcode) {
    if (zipcode.length !== 5) {
      setCities([]);
      setResultMessage("No results found");
      return;
    }

    try {
      const response = await fetch(
        `https://ctp-zip-code-api.onrender.com/zip/${zipcode}`
      );
      const data = await response.json();
      setCities(data);
      setResultMessage("");
    } catch (error) {
      console.log(error);
      setCities([]);
      setResultMessage("No results found");
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <div className="my-5">
          <ZipSearchField searchZip={fetchCity}/>
        </div>
        <div>
          {cities.map((city) => {
            return <City key={city.RecordNumber} {...city} />;
          })}
        </div>
        <strong>{resultMessage}</strong>
      </div>
    </div>
  );
}

export default App;
