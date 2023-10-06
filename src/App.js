import React, {useState} from "react";
import "./App.css";

function City(props) {
  const cityInfo = props.cityInfo
  return (
    <>
      <div>{cityInfo.City}</div>
      <ul>
        <li>State: {cityInfo.State}</li>
        <li>Location: ({cityInfo.Lat}, {cityInfo.Long})</li>
        <li>Population (estimated): {cityInfo.EstimatedPopulation} </li>
        <li>Total Wages: {cityInfo.TotalWages}</li>
      </ul>
    </>

  )
}

function ZipSearchField(props) {
  const handleChange = (event) => {
    const newValue = event.target.value
    if(newValue.length === 5){
        props.getZipInfo(newValue)
    }
  }
  return <>
    <label htmlFor="zip">Zip Code: </label>
    <input type="text" id="zip" name="zip" onChange={handleChange}/>
  </>
}

function App() {
  const [zipInfo, setZipInfo] = useState([])

  const getZipInfo = async (zip) => {
    const response = await fetch('https://ctp-zip-code-api.onrender.com/zip/' + zip)
    const data = await response.json()
    setZipInfo(data)
    console.log(zipInfo)
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField getZipInfo={getZipInfo} setZipInfo={setZipInfo}/>
        <div>
          {zipInfo.map(city => (
            <City cityInfo={city}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
