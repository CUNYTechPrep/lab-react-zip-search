import React, { useEffect, useState } from "react";
import "./App.css";

function City({ city, state, lat, long, population, wages }) {
  return (
    <div>
      <div className="box">
        <div className="header">{city}</div>
        <ul className="list">
          <li>State: {state} </li>
          <li>
            Location: ({lat}, {long})
          </li>
          <li>Population: {population} </li>
          <li>Total Wages: {wages} </li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ zipcode, setZipcode }) {
  return (
    <div>
      <label style={{ fontWeight: "bold", margin: "20px" }}>Zip code: </label>
      <input
        type="text"
        placeholder="Try 10016"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
      ></input>
    </div>
  );
}

function App() {
  const [zipcode, setZipcode] = useState("");
  const [cities, setCities] = useState([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (zipcode.length === 5) {
      fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipcode}`)
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setFound(true);
        })
        .catch((error) => console.log("Error: ", error));
    } else {
      setFound(false);
    }
  }, [zipcode, found, cities]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipcode={zipcode} setZipcode={setZipcode} />

        <div>
          {!found ? (
            <div>No Results</div>
          ) : (
            cities.map((i, index) => (
              <City
                key={index}
                city={i.LocationText}
                state={i.State}
                lat={i.Lat}
                long={i.Long}
                population={i.EstimatedPopulation}
                wages={i.TotalWages}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
