import { useEffect, useState } from "react";
import "./App.css";

function City(props) {
  let ZipCities = [];
  if(props.cities.length!=0){
    for(let i=0; i<props.cities.length;i++){

      ZipCities.push(
      <div class="card mb-5">
        <div className="card-header">{props.cities[i].LocationText}</div>
        <div className="card-body">
          <ul>
            <li>State: {props.cities[i].State}</li>
            <li>Location: ({props.cities[i].Lat},{props.cities[i].Long})</li>
            <li>Population(estimated): {props.cities[i].EstimatedPopulation}</li>
            <li>total Wages: {props.cities[i].TotalWages}</li>
          </ul>
        </div>
      </div>);
    }
  } else {
    return <p>No Result Found</p>
  }
    
    return (ZipCities);
}

function ZipSearchField({zip,setZip}) {
  return <input onChange={(e)=>{
    setZip(e.target.value);
  }}/>;
}

function App() {
  const [zip,setZip] = useState("");
  const [cities,setCities] = useState([]);

  useEffect(()=>{
      const getZip = async () =>{
        await fetch("https://ctp-zip-code-api.onrender.com/zip/"+zip).then((response)=>response.json()).then((data)=>{
          setCities(data);
        })
      }
      if(zip.length==5){
        getZip();
      } else {
        setCities([]);
      }
    },[zip.length==5])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <p>Zip Code:</p>
        <ZipSearchField zip={zip} setZip={setZip}/>
        <div>
          <City cities={cities}/>
        </div>
      </div>
    </div>
  );
}

export default App;
