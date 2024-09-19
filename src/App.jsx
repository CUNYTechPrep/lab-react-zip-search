import { useState } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="card mt-3 mb-3">
      <div className="city-header">{props.LocationText}</div>
      <div className="city-body">
        <ul>
          <li>State: {props.State}</li>
          <li>
            Location: ({props.Lat}, {props.Long})
          </li>
          <li>
            Population (estimated): {props.EstimatedPopulation || "Unknown"}
          </li>
          <li>Total Wages: {props.TotalWages || "Unknown"}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ searchZip }) {
  const [input, setInput] = useState("");
  function handleInput(event) {
    setInput(event.target.value);
    searchZip(event.target.value);
  }
  return (
    <div className="my-3">
      <label htmlFor="zipcode">Zip Code:</label>
      <input
        className="form-control"
        name="zipcode"
        type="number"
        placeholder="Enter a zipcode"
        value={input}
        onChange={(event) => handleInput(event)}
      />
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);
  const [resultMsg, setResultMsg] = useState("No results found");
  async function fetchCity(zipcode) {
    if (zipcode.length !== 5) {
      setCities([]);
      setResultMsg("No results found");
      return;
    }
    try {
      const response = await fetch(
        `https://ctp-zip-code-api.onrender.com/zip/${zipcode}`
      );
      const data = await response.json();
      console.log(data);
      setCities(data);
      setResultMsg("");
    } catch (error) {
      console.log(error);
      setCities([]);
      setResultMsg("No results found");
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField searchZip={fetchCity} />
        <div>
          {cities.length > 0 &&
            cities.map((city) => {
              return <City key={city.RecordNumber} {...city} />;
            })}
        </div>
        <strong>{resultMsg}</strong>
      </div>
    </div>
  );
}

export default App;
