import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const City = ({ zipCode }) => {
  const [city, setCity] = useState([]);

  const handleSearch = async () => {
    if (zipCode.length !== 5) {
      console.log("not a valid zip code");
      return;
    }
    const response = await axios.get(
      `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`
    );
    console.log(response.data);
    setCity(response.data);
  };

  useEffect(() => {
    handleSearch();
  }, [zipCode]);

  return (
    <div>
      {city.map((city) => (
        <div key={city.RecordNumber}>
          <h1 style={{ backgroundColor: "grey" }}>
            {city.City}, {city.State}
          </h1>
          <p>State: {city.State}</p>
          <p>
            Location: ({city.Lat}, {city.Long})
          </p>
          <p>Population (estimated): {city.EstimatedPopulation}</p>
          <p>Total Wages: {city.TotalWages}</p>
        </div>
      ))}
    </div>
  );
};

const ZipSearchField = ({ zipCode, setZipCode }) => {
  const handleZipChange = (event) => {
    setZipCode(event.target.value);
  };
  return (
    <div>
      <label>Zip Code:</label>
      <input
        type='text'
        defaultValue={zipCode}
        onChange={(e) => handleZipChange(e)}
      />
    </div>
  );
};

function App() {
  const [zipCode, setZipCode] = useState("");

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Zip Code Search</h1>
      </div>
      <div className='mx-auto' style={{ maxWidth: 400 }}>
        <ZipSearchField zipCode={zipCode} setZipCode={setZipCode} />
        <div>
          <City zipCode={zipCode} />
        </div>
      </div>
    </div>
  );
}

export default App;
