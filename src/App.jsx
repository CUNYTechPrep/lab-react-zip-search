import { useState } from "react";
import "./App.css";

function City(props) {
  return (
  <div className ="card">
    <div className="cardHeader">{props.City}, {props.State}</div>

    <div className = "cardBody">
      <ul>
        <li>State:{props.State}</li>
        <li>Location:({props.Lat},{props.Long})</li>
        <li>Population (estimated): {props.EstimatedPopulation}</li>
        <li>Total Wages:{props.TotalWages}</li>
      </ul>
    </div>
  </div>
  
)
}

function ZipSearchField({onSearch}) {
  const[zipCode, setZipCode] = useState("");

  const handleChange =(e) => {
    setZipCode(e.target.value);
    onSearch(e.target.value);
  };

  return(<label>Zip Code: <input name ="zipCode" value={zipCode} onChange={handleChange}></input></label>)
}

function App() {
  const[cities,setCities] = useState([]);
  const[error,setError] = useState("");
  
  const fetchCities = async(zipCode) =>{
    setError("");
    try{
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
      if(!response.ok)
      {
        throw new Error("No results found");
      }
      const data = await response.json();
      setCities(data);
    }catch(err){
      setCities([]);
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onSearch={fetchCities}/>
        <div>
        {cities.length > 0 ? (
            cities.map((city, index) => (
              <City key={index} {...city} /> // Spread city object as props
            ))
          ) : (
            <strong>No results found</strong> // Fallback message
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
