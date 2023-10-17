import React, {useState} from "react";
import "./App.css";


function City(props) {
  return(
  <div>
    <h5 id="heading">{props.LocationText}</h5>
    <div id="body">
      <ul>
        <li>State: {props.State}</li>
        <li>Location: ({props.Lat},{props.Long})</li>
        <li>Population (estimated): {props.EstimatedPopulation}</li>
        <li>Total Wages: {props.TotalWages}</li>
      </ul>
    </div>
  </div>
  );
}




function App() {
  const[input,setInput]= useState(null);
  const[locationData, setLocationData]=useState(null);
  const[result, setResult]= useState(false);
  const handleInput= async(e)=>{
    setResult(false);
    setInput(e.target.value);
    try{
      const response= await fetch(`https://ctp-zip-code-api.onrender.com/zip/${e.target.value}`);
      const data= await response.json();
      if(data){setLocationData(data);}
      setResult(true);
    }catch(error){
      // console.log(`An error occured. Check if the zipcode is alphanumeric and 5 digits long.`)
    }
  }
  function ZipSearchField(props) {
  
    return <div>
      <p>
        <b>Zip Code:</b>
        <input onChange={handleInput} type="text" value={input} autoFocus/>
      </p> 
    </div>;
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        <div>
          {(result)?
            locationData?.map((data,i)=>{
              return<City key={i} {...data}/>;
            }):
            <p>No results found!</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
