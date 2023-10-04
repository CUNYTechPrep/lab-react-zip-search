import React, { useEffect, useState } from "react";
import "./App.css";

function City({locationText, state, lat, long, population, wages}) {
  return (
    <div className="city-card">
      <h5>{locationText}</h5>
      <div className="list">
        <ul>
          <li>State: {state}</li>
          <li>Location: {`(${lat},${long})`}</li>
          <li>Population {`(estimated)`}: {population}</li>
          <li>Total Wages: {wages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  function handleInput(e){
    props.setZipCode(e.target.value);
  }

  return (
    <div>
      <strong>Zip Code:</strong>
      <input onInput={handleInput}></input>
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState(0);
  const [apiResponse, setApiResponse] = useState(0);

  useEffect(()=>{
    if(isCodeValid(zipCode)){
      fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
      .then((response) => response.json())
      .then((json) => setApiResponse(json))
      .catch((err) => {console.error(err)});
    } else {
      setApiResponse(0);
    }
  }, [zipCode])

  function isCodeValid(zipCode){
    const pattern = /^[0-9]{5}$/; //checks if code is 5 numbers from 0-9
    if(pattern.test(zipCode)){
      return true;
    }
    return false;
  }

  function displayCityCards(){
    return (
      <>
      {apiResponse.map((obj) => (
        <City 
          locationText={obj.LocationText}
          state={obj.State}
          lat={obj.Lat}
          long={obj.Long}
          population={obj.EstimatedPopulation}
          wages={obj.TotalWages}
        />
      ))}
      </>
    )
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <br />
        <ZipSearchField zipCode={zipCode} setZipCode={setZipCode}/>
        <br />
        <div>
          {isCodeValid(zipCode) && apiResponse !== 0 ? displayCityCards() : "No results found"}
        </div>
      </div>
    </div>
  );
}

export default App;