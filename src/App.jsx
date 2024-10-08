import { useState } from "react";
import "./App.css";

function City({ city }) {
  return (
    <div style={{ flex: 1, marginTop: 8 }}>
      <div
        style={{
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'lightgray',
          borderRadius: 8,
        }}
      >
        <h4
          style={{
            padding: 5,
            backgroundColor: 'lightgray',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
        >
          {city.LocationText}
        </h4>
        <div style={{ padding: 30 }}>
          <ul>
            <li>State: {city.State}</li>
            <li>Location: ({city.Lat}, {city.Long})</li>
            <li>Population (estimated): {city.EstimatedPopulation}</li>
            <li>Total Wages: {city.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField({ setCityData }) {
  const fetchZipcodes = (zipcode) => {
    fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipcode}`)
      .then((response) => response.json())
      .then((data) => setCityData(data))
      .catch(() => setCityData(null));
  };

  const onChange = () => {
    const zip = document.getElementById("zipcode");
    fetchZipcodes(zip.value);
  };

  return (
    <div>
      <div onChange={onChange}>
        <label htmlFor="zipcode">Zip Code:</label>
        <input id="zipcode" type="text" name="zipcode" />
      </div>
    </div>
  );
}

function App() {
  const [cityData, setCityData] = useState();

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCityData={setCityData} />
        <div style={{ flex: 1 }}>
          {cityData && cityData.length > 0
            ? cityData.map((city, index) => <City key={index} city={city} />)
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
