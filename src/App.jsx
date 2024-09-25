import { useState } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        {props.LocationText.toUpperCase()}
      </div>
      <div className="card-body">
        <ul>
          <li>State: {props.State}</li>
          <li>Location: ({props.Lat + ', ' + props.Long})</li>
          <li>Population (estimated): {props.EstimatedPopulation}</li>
          <li>Total Wages: {props.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {  
  return (
    <div className='mb-5 mt-3'>
      <label htmlFor='font-italic'>Zip Code:</label>
      <input 
        className='form-control'
        name='zip-search-field'
        placeholder="Try 10016"
        maxLength="5"
        onChange={props.handleOnChange}
      >
      </input>
    </div>
  );
}

async function fetchCityData(zipcode, setCityData) {
  const baseUrl = "https://ctp-zip-code-api.onrender.com/";
  const url = baseUrl + 'zip/' + zipcode;

  if (zipcode.length !== 5) {
    setCityData([]);
  }
  else {
    try {
      const res = await fetch(url);
      const body = await res.json();
      setCityData(body);
    }
    catch(err) {
      console.log('Error: ', err);
      setCityData([]);
    }
  }
}

function App() {
  const [cityData, setCityData] = useState([]);

  const handleZipCodeChange = (e) => {
    const newZipCode = e.target.value;
    
    fetchCityData(newZipCode, setCityData);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleOnChange={handleZipCodeChange}/>
        <div>
          {cityData.length === 0 ? (
            <strong>No results found</strong>
          ) : (
            cityData.map(city => (
              <City key={city.RecordNumber} {...city}></City>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
