import { useState } from "react";
import React from "react";
import "./App.css";

function City({city, state, locationx, locationy, population, totalWages}) {
  console.log(city);
  return (
    <div className="tableContainer">
      <table className="table w-100">
        <th>{city}</th>
        <td>
          <ul>
            <li>State: {state}</li>
            <li>
              Location: ({locationx}, {locationy})
            </li>
            <li>Population(estimated): {population}</li>
            <li>Total Wages: {totalWages}</li>
          </ul>
        </td>
      </table>
    </div>
  );
}

function CityList({ results }) {
  return(
    <>
      {
        results.map((result, id) => (
        <City
          key={id}
          city={result?.City}
          state={result?.State}
          locationx={result?.Lat}
          locationy={result?.Long}
          population={result?.EstimatedPopulation}
          totalWages={result?.TotalWages}
        />
        ))
      }
    </>
  );
}

function ZipSearchField({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    if (value.length == 5) {
      fetch("https://ctp-zip-code-api.onrender.com/zip/" + value)
        .then((response) => response.json())
        .then((json) => setResults(json))
    }
  };

  function handleSearch(value) {
    setInput(value);
    fetchData(value);
  }

  return (
    <>
      <div className="fullZip">
        <label htmlFor="zipcode">Zip Code:</label>
        <input
          className="searchField w-100"
          type="text"
          id="zipcode"
          name="zipcode"
          maxLength="5"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </div>
    </>
  );
}

function App() {
  const [results, setResults] = useState([]);
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setResults={setResults} />
        <div>
          {results && <CityList results={results}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
