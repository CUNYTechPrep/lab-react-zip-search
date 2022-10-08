import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function City(props) {
  return (
    <div>
      {props.data.map((item, index) => {
        return (
          <main key={index}>
            <div className="main-container">
              <header className="data-header">{item.LocationText}</header>
              <ul>
                <li>State: {item.City}</li>
                <li>
                  Location: ({item.Lat} , {item.Long})
                </li>
                <li>Population(estimated): {item.EstimatedPopulation}</li>
                <li>Total Wages: {item.TotalWages}</li>
              </ul>
            </div>
          </main>
        );
      })}
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="search-container">
      <label>Zip Code:</label>
      <input
        className="search-bar"
        type="text"
        value={props.search}
        onChange={props.handleChange}
      ></input>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const url = "https://ctp-zip-api.herokuapp.com/zip/";

  useEffect(() => {
    fetch();
  }, [search]);

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 5) {
      return setSearch(e.target.value);
    }
    return;
  };
  const fetch = async () => {
    if (search.length === 5) {
      try {
        const response = await axios.get(`${url}${search}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField value={search} handleChange={handleChange} />
        <div>
          <City data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
