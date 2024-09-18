import { useState } from "react";
import "./App.css";

function City({State, Lat, Long, EstimatedPopulation, TotalWages, LocationText}) {
  
  return (
    <div className="card my-5">
      <div className="card-header">
        {LocationText}
      </div>
      <div className="card-body">
        <ul className="p-8 my-3">
          <li>State: {State}</li>
          <li>Location: ({Lat}, {Long})</li>
          <li>Population (estimated): {EstimatedPopulation}</li>
          <li>Total Wages: {TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  
  
  const [zipCode, setZipCode] = useState('');
  
  
  
  return (
    <label className="d-flex align-center py-4 px-1" for="zip-code">
      <b className="py-2 w-25">Zip Code:</b>
      <input id="zip-code" className="form-control p-1 rounded max-w" placeholder="Try 10016" value={zipCode} onChange={(e) => {
        
        var newZipCode = e.target.value.replace(/\D+/g, '').slice(0, 5);
        // removes any letters or none digits from input
        
        setZipCode(newZipCode);
        // change the zip code value
        
        console.log("Changing Zip Code to", newZipCode)
        // print stating the zip code value changed
        
        if (newZipCode.length == 5 && !isNaN(parseInt(newZipCode))) { 
          // if it's exactly 5 characters then we can send the request
          
          props.onSearch(newZipCode);
          // runs the onsearch callback
          
        }
        
        
      }}/>
    </label>
  );
  
  // return <div>This is the ZipSearchField component</div>;
}

// https://ctp-zip-code-api.onrender.com/zip/

async function getZipData(zipCode, callback) {
  
  try {
    
    const res = await fetch('https://ctp-zip-code-api.onrender.com/zip/' + zipCode.toString());
    // gets the fetch request
    
    const body = await res.json();
    // gets the json data
    
    console.log("Success", body);
    
    return callback(body);
    
  } catch (e) {
    
    console.log("Error", e);
    
    
    
  }
  
  return callback([]);
  
} 

function App() {
  
  
  
  const [cities, setCities] = useState([]);
  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto py-4 px-1" style={{ maxWidth: 400 }}>
        <ZipSearchField onSearch={(zipCode)=>{
          console.log("Searching, zip code");
          
          getZipData(zipCode, setCities);
          // gets the zip code data
          
          
        }}/>
        <div>
          {cities.length > 0 ? cities.map ( city => <City {...city}/>) : 'No Results'}
        </div>
      </div>
    </div>
  );
}

export default App;
