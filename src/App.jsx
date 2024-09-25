import { useState, useEffect } from "react";
import "./App.css";

function City({ City, State, Lat, Long, EstimatedPopulation, TotalWages }) {
  return (
    <div className="card mb-5">
      <div className="card-header">
        {City}, {State}
      </div>

      <div className="card-body">
      <ul>
        <li>State: {State}</li>
        <li>Location: ({Lat}, {Long})</li>
        <li>Population (estimated): {EstimatedPopulation}</li>
        <li>Total Wages: {TotalWages}</li>
      </ul>
      </div>

    </div>
  );
}

function ZipSearchField({ handleSearch }) {
  return (
    <div className="my-5">
    <label htmlFor="zip-code">Zip Code: </label>
    <input className="form-control" id="zip-code" onChange={handleSearch} type="text" />
    </div>
  );
}


function App() {
  const [zipCode, setZipCode] = useState('');
  const [data, setData] = useState([]);
  
  const handleSearch = (event) => {
    const value = event.target.value;
  
    console.log(value);
    
    // Check for valid zip code
    if (value.length === 5 && /^[0-9]+$/.test(value)) {
      setZipCode(value);
    } 
  };
  

  const fetchData = async () => {
    if (!zipCode) return; // Avoid fetching if zipCode is empty
    
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`);
      const result = await response.json(); 

      setData(result);

      console.log(result);  
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(()=>{
    fetchData();
  }, [zipCode]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleSearch={handleSearch} />
        <div>
          {(data.length > 0) ? (
            data.map((city) => (
              <City {...city} key={city.RecordNumber} /> 
            ))
          ) : (<p>No results found</p>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
