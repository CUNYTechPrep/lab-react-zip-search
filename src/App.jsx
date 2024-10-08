import { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="card mb-5" style={{ marginTop: '20px' }}>
      <div className="card-header">{props.city.City}, {props.city.State}</div>
      <ul className="card-body">
        <li>State: {props.city.State}</li>
        <li>Location: ({props.city.Lat}, {props.city.Long})</li>
        <li>Population (estimated): {props.city.EstimatedPopulation}</li>
        <li>Total Wages: {props.city.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <p>Zip Code</p>
      <input type="text" onChange={props.UserZipInput} />
    </div>
  );
}

function App() {
  const [zip, setZip] = useState("");
  const [data, setData] = useState([]);

  const ZipSearchHandler = (e) => {
    const value = e.target.value;

    if (value.length === 5) {
      setZip(value);  // Set zip code when length is exactly 5
    } else {
      setData([]);  // Clear data if the zip code is not valid
    }
  }

  const DataFetcher = async () => {
    if (zip.length !== 5) return; 

    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
      setData([]); // Clear data if the fetch fails
    }
  }

  useEffect(() => {
    if (zip.length === 5) {
      DataFetcher();
    }
  }, [zip]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField UserZipInput={ZipSearchHandler} />
        <div>
          {data.length > 0 ? (
            data.map((city, index) => <City key={index} city={city} />)
          ) : (
            <strong>No results found</strong>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
