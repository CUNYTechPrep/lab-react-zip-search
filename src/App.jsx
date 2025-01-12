import { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
      <h5>{props.City}, {props.State}</h5>
      <p>State: {props.State}</p>
      <p>Location: ({props.Lat}, {props.Long})</p>
      <p>Population (estimated): {props.EstimatedPopulation}</p>
      <p>Total Wages: {props.TotalWages}</p>
    </div>
  );
}

function ZipSearchField(props) {
  const [inputText, setInputText] = useState('');
  const [isValidZip, setIsValidZip] = useState(false);
  const [cityRecords, setCityRecords] = useState([]);

  const validateZip = (zip) => /^\d{5}$/.test(zip);
  const handleInputChange = (event) => {
    const zip = event.target.value;
    setInputText(zip);
    setIsValidZip(validateZip(zip));
  }

  useEffect (() => {
    if (isValidZip) {
      const fetchCityRecords = async () => {
        try {
          const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${inputText}`);
          const cityData = await response.json();
          if (cityData.length > 0) {
            setCityRecords(cityData);
          } else {
            setCityRecords([]);
            console.log('No city data found for this zip code.');
          }
        } catch (error) {
          console.error('Error fetching city data: ', error);
        }
      }

      fetchCityRecords();
    } else {
      setCityRecords([]);
    }
  }, [isValidZip, inputText]);

  return (
    <div>
      <p>Zip Code:</p>
      <input type="text" value={inputText} onChange={handleInputChange} />
      {cityRecords.length > 0 ? cityRecords.map((record) => <City key={record.City} {...record}/>) : <p>No results found</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
      </div>
    </div>
  );
}

export default App;
