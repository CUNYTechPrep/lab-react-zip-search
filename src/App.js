import React, {useEffect, useState} from "react";
import "./App.css";

function City({title="default", state="default", location="default", population="default", wages="default"}) {

  return <>
  <div className="city">
  <h1 >{title}</h1>
  <hr></hr>
    <ul>
      <li>
        State: {state}
      </li>
      <li>
        Location: ({location.lat}, {location.lon})
      </li>
      <li>
        Population(estimated): {population}
      </li>
      <li>
        Total Wages: {wages}
      </li>
    </ul>
    </div>
  </>;
}

function ZipSearchField({setCityData}) {
  // const [citiesData, setCitiesData] = useState([]);
  const [zipSearch, setZipSearch] = useState("");
  let submitClick = (event) =>
  {
    fetch('https://ctp-zip-code-api.onrender.com/zip/' + zipSearch)
    .then((response) => response.json())
    .then((data) =>{ 
      setCityData(data);
      console.log("data is " + data[0]["City"]); // shows the city
    });
    // console.log("zip search is " + zipSearch)
  }
  useEffect(()=>{
    // console.log("in get zip codes ");
    // console.log("zip length is " + zipSearch.length + " stirng is " + zipSearch)

    if(zipSearch.length == 5 && !isNaN(zipSearch))
    {
      submitClick(); 
    } else
    {
      setCityData([])
    }
  }, [zipSearch])
  return <>
  <div className="zip">
  <label for="zipCode">Zip Code</label>
  <br></br>
    <input id="zipCode" onChange={(e) => {    setZipSearch(e.target.value);}}></input>
    {/* <button type="button" onClick={submitClick}>Submit</button> */}
  </div>
  </>;
}

function App() {
    const [citiesData, setCitiesData] = useState([]);

  let setCityData = (data) =>
  {
    setCitiesData(data);
    // console.log('in our cities data in app' + citiesData[0]["City"]);
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCityData={setCityData}/>
        <div>
          {citiesData? citiesData.map((data, id)=>
          {
            return <City title={data["LocationText"]}  state={data["State"]} location={{"lat": data["Lat"], "lon": data["Long"]}} wages={data["TotalWages"]} population={data["EstimatedPopulation"]}/>
          }): null}
        </div>
      </div>
    </div>
  );
}

export default App;
