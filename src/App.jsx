import { useState, useEffect } from "react";
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
        onChange={(e) => {
          const zipcode = e.target.value;
          props.setZipcode(zipcode);
        }}
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
      await fetch(url)
        .then((res) => res.json())
        .then((data) => setCityData(data));
    }
    catch(err) {
      console.log('Error: ', err);
    }
  }
}

function App() {
  const [zipcode, setZipcode] = useState('');
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    fetchCityData(zipcode, setCityData);
  }, [zipcode])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setZipcode={setZipcode}/>
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
