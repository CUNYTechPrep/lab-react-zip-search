import { useState } from "react";
import "./App.css";

const url="https://ctp-zip-code-api.onrender.com/zip/"
let [cities, getCityData]= useState([])

function City(props) {
  return <div><h1>{props.City}</h1>
  <ul>
    <li>State: {props.State}</li>
    <li>Location: {props.Lat}</li>
    <li>Population (estimated): {props.EstimatedPopulation}</li>
    <li>Total Wages: {props.TotalWages}</li>
  </ul>
  </div>;

}

function ZipSearchField(props) {
  return <div><div>This is the ZipSearchField component</div>
  <input type="text" id="zip" name="zip" onChange={getCityData}></input></div>;
}

async function getCityData(){
  const zipcode= document.getElementById("zip").value;
  if(!zipcode){
    return
  }
  if(zipcode.length!=5){
    return
  }
  console.log(zipcode)
  try{
    const response= fetch(url+zipcode)
    const data= (await response).json()
    cities=data
    console.log(cities)
    
  }
  catch(error){
    console.log(error)
  }
  
}

function App() {
  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        {cities.map((e) => {
          return <City key={e.RecordNumber }State={e.State} Lat={e.Lat} EstimatedPopulation={e.EstimatedPopulation}
        TotalWages={e.TotalWages}/>
        })}
        <div>
          <City />
          <City />
        </div>
      </div>
    </div>
  );
}

export default App;
