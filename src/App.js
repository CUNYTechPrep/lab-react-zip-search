import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

// "RecordNumber":"240","Zipcode":"10016","ZipCodeType":"STANDARD","City":"NEW YORK","State":"NY",
// "LocationType":"PRIMARY","Lat":"40.71","Long":"-73.99","Xaxis":"0.20","Yaxis":"-0.72","Zaxis":"0.65",
// "TotalWages":"1412438620","

function City(props) {
  if(props.City == null) return <p>Not Found</p>

  return (
  <div >
    <strong >{props.City},{props.State}</strong>
    <ul>
      <li>State:{props.State}</li>
      <li>Location:( {props.Lat},{props.Long} )</li>
      <li>Population (estimated): {props.EstimatedPopulation} </li>
      <li>Total Wages: {props.TotalWages} </li>
    </ul>
  </div> 
  
  
  )
}

function ZipSearchField(props) {
  
  const searchZipCode = () =>{
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + document.getElementById("searchBar").value)
    .then(response => response.json())
    .then(res => props.setCityArr(res))
    .catch(props.setCityArr(["Empty"]))

  }
  
  return (
    <div>
      Zip Code
      <br></br>
      <input placeholder="Enter valid Zip Code" type={"text"} onInput={searchZipCode} id="searchBar" ></input>


    </div>

  )
}

function App() {
  const [cityArr, setCityArr] = useState(["Empty"])
  const [cityComponentArr, setCityCompenentArr] = useState([]);
  useEffect(()=>{
    let arr = [];
    {cityArr.map((data,index)=>{
      arr.push(<City {...data} key={index} />)
    })}
    setCityCompenentArr(arr)
  },[cityArr])


  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField cityArr={cityArr} setCityArr={setCityArr}/>
        <div>
          {cityComponentArr}
        </div>
      </div>
    </div>
  );
}


export default App;
