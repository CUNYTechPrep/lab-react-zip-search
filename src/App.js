import React, { useState } from 'react';
import "./App.css";

function City(props) {
  //if the zipcode is not found No results found will be returned
  if (!props.zipCode) {
    return <div><strong>No Results Found</strong></div>;
  }

  //if the zipcode was valid then it will create a div holding all the city info 
  return (
    <div>
      {props.zipCode.map((item, index) => (
        <div key={index} className="city-info">
          <p><strong>{item.City}, {item.State}</strong></p>
          <p><strong>State:</strong> {item.State}</p>
          <p><strong>Location:</strong> ({item.Lat}, {item.Long})</p>
          <p><strong>Population (estimated):</strong> {item.EstimatedPopulation}</p>
          <p><strong>Total Wages:</strong> {item.TotalWages}</p>
        </div>
      ))}
    </div>
  );
}

function ZipSearchField(props) {

  // return a label and text feild for the user to enter a zip code
  // when there is a change recorded handleInputChange is called
  return (
    <div className="inputContainer">  
      <label htmlFor="zipCode"><strong>ZipCode:</strong></label>
      <input type="text" id="ZipCode" placeholder="Enter your zip code" 
      onChange={handleInputChange}/>
    </div>
  );
  // this function takes the user input stored in event.target.value
  function handleInputChange(event) {
    const inputZipCode = event.target.value;
    props.onZipChange(inputZipCode); 
  }
}

function App() {
  const [zipCode, setZipCode] = useState(null);

  const handleInput = async (inputZip) => {
    try {
      let response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${inputZip}`);
      let body = await response.json();
      setZipCode(body);
    } 
    catch(error) {
      console.error("Error fetching api url", error);
      setZipCode(null);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={handleInput}/> 
        <div>
          <City zipCode={zipCode}/>
        </div>
      </div>
    </div>
  );
}

export default App;