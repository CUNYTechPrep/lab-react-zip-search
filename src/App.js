import React, {useState} from "react";
import "./App.css";


function City({ city, state, location,pops, totalWages }) {
	return (
	<div>
	<div className="card mb-5">
		<div className="card-header">{`${city}, ${state}`}</div>
		<div className="card-body">
			<ul>
			  <li>{`State: ${state}`}</li>
				<li>{`Location: ${location}`}</li>
				<li>{`Population(estimated): ${pops}`}</li>
				<li>{`Total Wages: ${totalWages}`}</li>
			</ul>
		</div>
	</div>
 </div>
	);
}

function ZipSearchField(props) {
return (
	<div className="my-5">
		<label htmlFor="zip-code">Zip Code:</label>
		<input
			type="text"
			className="form-control"
			id="zip-code"
			onChange={props.handleChange}
		/>
	</div>
);
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeResults, setZipCodeResults] = useState([]);
  
  const getData = (event) =>{
    const nextZipCode = event.target.value;
    setZipCode(nextZipCode);
    if (nextZipCode.length === 5){
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${nextZipCode}`)
          .then((res) => res.json())
          .then((body) => setZipCodeResults(body))
        } else{
          setZipCodeResults([]);
        }      
  };

	return (
		<div className="App">
		<div className="App-header">
		<h1>Zip Code Search</h1>
		</div>
		 <div className="mx-auto" style={{ maxWidth: 400 }}>
			 <ZipSearchField value = {zipCode} handleChange={getData} />
			 <div>
			 {zipCodeResults.map((data) => (
				<City
					key={data.RecordNumber}
					city={data.City}
					state={data.State}
					location={`(${data.Lat}, ${data.Long})`}
					pops={data.EstimatedPopulation}
					totalWages={data.TotalWages}
				/>
	    ))}
		<div>
      {zipCodeResults.length < 5 && <bold>Not Found</bold>}
		  </div>
		 </div>
		</div>
	</div>
    
  );
}

export default App;
