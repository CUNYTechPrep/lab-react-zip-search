import React, { useState } from "react";
import "./App.css";

function City(props) {
  const { city } = props;

  return (
    <div className="city-block">
      <div className="city-header">
        {city.City}, {city.State}
      </div>
      <ul>
        <li>State: {city.State}</li>
        <li>
          Location: ({city.Lat}, {city.Long})
        </li>
        <li>
          Population (estimated):{" "}
          {!!city.EstimatedPopulation.length
            ? city.EstimatedPopulation
            : "Unknown"}
        </li>
        <li>
          Total Wages: {!!city.TotalWages.length ? city.TotalWages : "Unknown"}
        </li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <input
        value={props.value}
        onChange={(event) => {
          props.setValue(event.target.value);
          props.search(event.target.value);
        }}
      />
    </div>
  );
}

function App() {
  const [zipcode, setZipcode] = useState("");
  const [found, setFound] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch(zipcode) {
    const zipcodeRegex = /^[0-9]{5}$/g;

    if (!zipcode || !zipcode.match(zipcodeRegex)) {
      setErrorMessage("Invalid Zipcode");
      setFound(false);
      return;
    }

    setLoading(true);

    await fetch(`https://ctp-zip-api.herokuapp.com/zip/${zipcode}`)
      .then((response) => response.json())
      .then((result) => {
        setCities(result);
        setFound(true);
      })
      .catch((e) => {
        setFound(false);
        setErrorMessage("No results found");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="page">
        <ZipSearchField
          value={zipcode}
          setValue={setZipcode}
          search={handleSearch}
        />
        {!loading && found && (
          <div className="city-list">
            {cities.map((city, idx) => {
              return <City key={`city-${idx}`} city={city} />;
            })}
          </div>
        )}
        {!loading && !found && <div>{errorMessage}</div>}
      </div>
    </div>
  );
}

export default App;
