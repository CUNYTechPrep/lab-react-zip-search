import React from "react";
import { useState } from "react"; 
import "./App.css";

function City(props) {

  const[cityData, setCityData] = useState([]);

  let zipInput = props.zip;

  const fetchData = async (zipcode) => {
    const url = `https://ctp-zip-code-api.onrender.com/zip/${zipcode}`;

    console.log("URL is: " + url);
    console.log("URL json is: " + url.json);

    fetch(url)
      .then(response => response.json()) //.json() not .json
      .then((data) => {
        setCityData(data);
        //console.log("Data: " + data);
      })
      .catch(error => console.log(error));

  };

  console.log("City props (zip): " + zipInput); 

  const cityInfo = cityData && cityData.map((item) => (
    <div className="cityCont" key={item.RecordNumber}>
      <div className="cityHeader">
        <h5>{item.City}, {item.State}</h5>
      </div>

      <div className="cityBody">
        <ul>
          <li>State: {item.State}</li>
          <li>Location: ({item.Lat}, {item.Long})</li>
          <li>Population (estimated): {item.EstimatedPopulation}</li>
          <li>Total Wages: {item.TotalWages}</li>
        </ul>
      </div>
    </div>
  ));

  return (
    <div>
      {
        !zipInput? 
        (<div><b>No Results Found</b></div>) :
        (fetchData(zipInput) && cityInfo)
      }
    </div>
  );
}

function ZipSearchField(props) {

  const[zipCode, setZipCode] = useState('');

  const handleChange = (event) => {
      setZipCode(event.target.value);
      props.onInput(event.target.value);
      console.log("User input is: " + event.target.value);
  };

  return (
    <div id="zipInput">
      <form>
        <label htmlFor="zipCode">
          Zip Codes:

          <input
          type="text" 
          id="zipCode" 
          value={zipCode} 
          onInput={handleChange} 
          onKeyDown={(event) => {event.key === 'Enter' && event.preventDefault(); } }
          />

        </label>
      </form>
    </div>
  );
  }

function App() {
  const [zip, setZip] = useState('');

  return (

    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>

      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onInput={setZip} />
        <div>
          <City zip={zip} />
        </div>
      </div>

    </div>
  );
}

export default App;

/*

*/
