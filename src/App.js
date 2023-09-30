import React from "react";
import "./App.css";

function City(props) {
  return (
    <div className="dataBox">
      <div className="city-state">
        {props.data.City}, {props.data.State}
      </div>
      <div style={{padding: '10px 25px'}}>
        <ul>
          <li>State: {props.data.State}</li>
          <li>Location: ({props.data.Lat}, {props.data.Long})</li>
          <li>Population (estimated): {props.data.EstimatedPopulation}</li>
          <li>Total Wages: {props.data.TotalWages}</li>
        </ul>
      </div>
      
    </div>
  )
}

function Zip(props) {
  return (
    <li>{props.data}</li>
  )
}

function ZipSearchField(props) {
  return (
    <div style={{marginTop: 20}}>
      <label style={{fontWeight: 600, marginRight: 5}}>Zip Code: </label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
    </div>
  )
}

function CitySearchField(props) {
  return (
    <div style={{marginTop: 20}}>
      <label style={{fontWeight: 600, marginRight: 5}}>City: </label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

function App() {
  const [zipCode, setZipCode] = React.useState("");
  const [zipData, setZipData] = React.useState([]);
  const [notFound, setNotFound] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [searchZip, setSearchZip] = React.useState(true);
  const [searchCity, setSearchCity] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [cityData, setCityData] = React.useState([]);

  const handleSwitch = () => {
    setSearchZip(!searchZip);
    setSearchCity(!searchCity);
    setZipCode("");
    setZipData([]);
    setNotFound("");
    setDisplay(false);
  }


  const handleZipInputChange = async (event) => {
    setNotFound("")
    setDisplay(false)
    const { value } = event.target;
    setZipCode(value);
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${value}`);
      const data = await response.json();
      console.log(data);
      setZipData(data);
      setNotFound("");
      setDisplay(true);
    }
    catch (error) {
      console.log(error);
      setNotFound("No Results");
    }
  };

  const handleCityInputChange = async (event) => {
    setNotFound("")
    setDisplay(false)
    const { value } = event.target;
    setCity(value.toUpperCase());
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/city/${value.toUpperCase()}`);
      const data = await response.json();
      console.log(data);
      setCityData(data);
      setNotFound("");
      setDisplay(true);
    }
    catch (error) {
      console.log(error);
      setNotFound("No Results");
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      {searchZip && (<div className="mx-auto" style={{ maxWidth: 400 }}>
        <div>
          <button className="button" onClick={handleSwitch}>Search by City</button>
        </div>
        <ZipSearchField 
          type="text"
          value={zipCode}
          onChange={handleZipInputChange}
          placeholder="Try 10016"
          maxLength={5}
        />
        <div style={{ marginTop: 10, fontWeight: 500}}>
          {(zipCode.length === 5) && notFound}
        </div>
        <div>
          {display && zipData.map((data, i) => (<City key={i} data={data} />))}
        </div>
      </div>)}
      
      {searchCity && (<div className="mx-auto" style={{ maxWidth: 200 }}>
        <div>
          <button className="button" onClick={handleSwitch}>Search by Zip Code</button>
        </div>
        <CitySearchField 
          type="text"
          value={city}
          onChange={handleCityInputChange}
          placeholder="Try Springfield"
        />
        <div style={{ marginTop: 10, fontWeight: 500}}>
          {notFound}
        </div>
        <div>
          {display && <div style={{padding: 20}} className="dataBox">{cityData.map((data, i) => (<ul><Zip index={i} data={data} /></ul>))}</div> }
        </div>
        </div>)}
    </div>
  );
}

export default App;
