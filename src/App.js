import React, {useState} from "react";
import "./App.css";
import ZipSearchField from "./components/ZipSearchField";
import City from "./components/City";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeResults, setZipCodeResults] = useState([]);

  const zipCodeChanged = (event) => {
    const newZipCode = event.target.value;
    console.log(newZipCode);
    setZipCode(newZipCode);

    if (newZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${newZipCode}`)
        .then((res) => res.json())
        .then((body) => setZipCodeResults(body))
        .catch(() => setZipCodeResults([]));
    } else {
      setZipCodeResults([]);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField value={zipCode} handleChange={zipCodeChanged} />
        <div>
          {zipCodeResults.map((zipData) => (
            <City
              city={zipData.City}
              state={zipData.State}
              lat={zipData.Lat}
              long={zipData.Long}
              estimatedPopulation={zipData.EstimatedPopulation}
              totalWages={zipData.TotalWages}
              key={zipData.RecordNumber}
            />
          ))}
          {zipCodeResults.length === 0 && <div>No results found</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
