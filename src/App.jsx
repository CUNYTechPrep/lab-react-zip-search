import { useState, useEffect } from "react";
import "./App.css";

import City from "./components/City";

const BASE_URL = "https://ctp-zip-code-api.onrender.com/";

async function fetchZipData(zipField) {
  try {
    const response = await fetch(BASE_URL + "zip/" + zipField);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const ZipSearchField = (props) => {
  return (
    <>
      <label htmlFor="zip">Zip Code:</label>
      <input
        type="number"
        value={props.fieldValue}
        id="zip"
        onChange={(e) => props.onZipChange(e.target.value)}
      />
    </>
  );
};

function App() {
  const [zipField, setZipField] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (zipField.length === 5) {
        const data = await fetchZipData(zipField);
        setCities(data);
      } else {
        setCities([]);
      }
    };
    fetchData();
  }, [zipField]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField fieldValue={zipField} onZipChange={setZipField} />
        <div>
          {cities &&
            cities.map((city, index) => <City key={index} city={city} />)}
          {!cities.length >= 1 && <p>No results found.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
