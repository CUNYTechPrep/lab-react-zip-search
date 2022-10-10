import React, { useState } from "react";
import "./App.css";



//receiving data as props from cityData
function City(props) {
  const {City,State, Lat, Long, EstimatedPopulation, TotalWages,Zipcode} = props.cityData;
  // console.log(props.cityData)
  // console.log(City,State, Lat, Long, EstimatedPopulation, TotalWages,Zipcode);

  if(City === undefined) {
  return <div id="zipOnly" className="col-auto">
              {props.cityData}
        </ div>
  }
    return <div id='tab'>
             <div id="cityName">{City}</div>
              <ul id="info">
                <li>State: {State}</li>
                <li>Location: ({Lat}, {Long})</li>
                <li>Population (estimated): {EstimatedPopulation}</li>
                <li>Total Wages: {TotalWages}</li>
                {/* <li>Zip: {Zipcode}</li> */}
              </ul>
         </div>;
}

function noResult(){
  return <p id="noResult"> 
          <span style={{fontSize:30}}>&#129302;</span>
          : "No Results...!"</p>
}

function check(input) {

  if (input.charCodeAt(0) < 48 || input.charCodeAt(0) > 57) {
    return false;
  }
  return true;
};


function myUrl() {
  let userInput = document.getElementById('zip').value;
  let url = 'https://ctp-zip-api.herokuapp.com';
  let optionCity = url + '/city/';
  let optionZip = url + '/zip/';
  let val = check(userInput);
  console.log(val);
  let searchInfo = '';

  if (val === true) { searchInfo = optionZip + userInput;}
  else { searchInfo = optionCity + userInput.toUpperCase();}

  return searchInfo;
}
// console.log(myUrl());

//start here// just get the data // no deconstuct
function ZipSearchField(props) {

  const callData = () => {
    fetch(myUrl())
      .then((response) => {
        return response.json();
      })
      .then((datajson) => {
        props.setAreaData(datajson);
        console.log(datajson)
      })
    props.setAreaData([])// empty the data of no interest//reset
  };

  return <div id="zip-code">
    <label for="zip">Zip Code:</label>
    <input type="text" id="zip" placeholder="type here..."
      onChange={(callData)} ></input>
  </div>;
}
// hold the data store the data
function App() { /// my parent component at the top visibility
  const [areaData, setAreaData] = useState([]);
  // console.log(areaData);
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div id="search" className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setAreaData={setAreaData} />

        <div id="city" className="row" >
          {areaData.length === 0 ? noResult() :
            areaData.map((areaObject) => { ///my loop 
              return <City cityData={areaObject} />
            })
          }
        </div>

      </div>
    </div>
  );
}


export default App;
