import { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  return (
    <div>
      {props.LocationText}
      <ul>
        <li>State: {props.State}</li>
        <li>
          Location: {props.Lat},{props.Long}
        </li>
        <li>Population (estimated): {props.EstimatedPopulation}</li>
        <li>Total Wages: {props.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <>
      <label htmlFor="zip-code">Zip Code</label>
      <input
        id="zip-code"
        type="text"
        onChange={(e) => {
          props.onZipChange(e.target.value); //updates state in App
        }}
      ></input>
    </>
  );
}

function App() {
  const [zipCode, setZipCode] = useState();
  const [zipData, setZipData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (zipCode.length === 5) {
        //only request if valid zip
        const response = await fetch(
          "https://ctp-zip-code-api.onrender.com/zip/" + zipCode
        );
        const data = await response.json();
        setZipData(data);
      } else {
        //invalid zip empty zipData
        setZipData([]);
      }
    };
    fetchData();
    console.log(zipData);
  }, [zipCode]);
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={setZipCode} />
        <div>
          {zipData.length === 0 ? ( //empty results
            <strong>No results found</strong>
          ) : (
            zipData.map((info) => <City {...info} key={info.RecordNumber} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
