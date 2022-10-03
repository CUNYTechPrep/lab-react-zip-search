import React, { useState } from "react";
import "./App.css";

function City(props) {
  let city = props.city.City;
  let state = props.city.State;
  let location = "("+ props.city.Lat + "," + props.city.Long+")";
  let population =props.city.EstimatedPopulation;
  let totalWages = props.city.TotalWages;
  return <div>
    {city}, {state} 
    <ul>
      <li>
        State: {state}
      </li>
      <li>
       Location: {location}
      </li>
      <li>
        Population estimated: {population}
      </li>
      <li>
        Total Wages: {totalWages}
      </li>
    </ul>
  </div>;
}
function ZipSearchField(props) {
  function change(e){
    console.log(e.target.value)
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + e.target.value, {
      'mode' : 'cors',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => props.setCities(responseData))
    .catch((error) => props.setCities([]));

  }
  return <div>
    Zip Code
    <input type ="text" placeholder=" Try 10016"  onChange= {change}>
    </input>
  </div>;

}
function App() {
  const [cities,setCities] = useState([]) 
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCities = {setCities}/>
        <div>
          {cities.length==0?<div>No Results</div>:cities.map(city=><City city={city}/>)}        
        </div>
      </div>
    </div>
  );
}

export default App;
