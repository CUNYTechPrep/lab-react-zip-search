import React, {useState} from "react";
import "./App.css";

function City(props) {
  return (
    <div className ="row mt-5 mb-5">
      <div className ="col border rounded">
        <div>
          {props.info.LocationText}
        </div>
        <div className="mt-3">
          <ul>
            <li>State: {props.info.State}</li>
            <li>Location: ({props.info.Lat}, {props.info.Long})</li>
            <li>Population (estimated): {props.info.EstimatedPopulation} </li>
            <li>Total Wages: {props.info.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
}

function ZipSearchField(props) {
  return(
    <div className="row mt-5">
      <div className="col">
        <label htmlFor="zipCode">Zip Code:</label>
      </div>
      <div>
        <input type="text" className="form-control" id="zipCode" onChange={props.handleChange}></input>
      </div>
    </div>
  
  );
}

function App() {

  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);

  function onChange(event) {
    const zip = event.target.value;
    setZipCode(zip);
  
    if(zip.length === 5){
      const url = "https://ctp-zip-api.herokuapp.com/zip/";
      fetch(url + zip).then(response => response.json())
      .then((data) => {
        const cities  = data.map((city) => {
          return <City key={city.RecordNumber} info ={city}/>
        })
        setCities(cities);
      })
      .catch((error) => {
        setCities([]);
      })
      
    }else{
      setCities([]);
    }

  }//end onChange



  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleChange = {onChange}/>
        { cities.length !== 0 ? cities : <div className="mt-5">No results found</div> }
      </div>
    </div>
  );
}

export default App;
