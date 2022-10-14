import React, { useState } from "react";
import "./App.css";

function City(props) {
	return (
	  <div className ="row mt-5 mb-5">
		<div className ="col border rounded">
		  <div>
			{props.info.City}, {props.info.State}
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
	const [zip, setZip] = useState(null);
	const [results, setResult] = useState([]);
  
	function handleChange(event) {
	  const zipCode = event.target.value;
	  setZip(zipCode);
  
	  if(zipCode.length === 5){
		fetch(`https://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
		.then((res) => res.json())
		.then((data) => {
		  const cities  = data.map((city) => {
			return <City key={city.RecordNumber} info ={city}/>
		  })
		  setResult(cities);
		})
		.catch((error) => {
		  setResult([]);
		})
	  } else {  
		setResult([]);
	  }
	}
  
	return (
	  <div className="App">
		<div className="App-header">
		  <h1>Zip Code Search</h1>
		</div>
		<div className="mx-auto" style={{ maxWidth: 400 }}>
		  <ZipSearchField handleChange = {handleChange}/>
		  { results.length !== 0 ? results : <div className="mt-4"><strong>No results found</strong></div> }
		</div>
	  </div>
	);
  }
  export default App;