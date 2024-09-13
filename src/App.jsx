import { useEffect, useState } from "react";
import "./App.css";

function City(props) {
  return <div> 
    <label htmlFor="city-input">City Search: </label>
    <input type="text" placeholder="City" name="city-input" onKeyDown={props.handleKeyDown}/>
  </div>;
}

function ZipSearchField(props) {
  return <div>
    <label htmlFor="zip-input">Zip Code: </label> <input type="zip" id="zip-input" placeholder="zip code search" onKeyDown={props.handleKeyDown} /></div>;
}
function ShowResults(props){

  // return(

  return(
    props.method === "zip"?

    props.data.map((data,index)=>{
      return(
        <div className="result">
          {/* <h3>Results</h3> */}
          <div className="result-header">{props.data[0].LocationText}
          <div className="result-body">
                <p>Estimated Population:{data.EstimatedPopulation}</p>
                <p>Latitude: {data.Lat}</p>
                <p>Longitude: {data.Long}</p>
          </div>
        </div>
    </div>
      
      )
      })
:
  <div className="results">
    <div className="result-header">Zip Codes:</div>
      {props.data.map((data,index)=>{
          return(
              <div className="result-body">
                    <p>{data}</p>
            </div>
          )
        })}
  </div>
    
  
  )
      }

function App() {
  const [data,setData] = useState(null);
  const [method,setMethod] = useState(null);
  const handleKeyDown = (event)=>{
   
    if (event.key === "Enter") {
      if(event.target.name === "city-input"){
        fetch(`https://ctp-zip-code-api.onrender.com/city/${event.target.value.toUpperCase()}`)
        .then((response) => response.json())
        .then((data) =>{ 
          setData(data)})
          .catch((error) =>setError(error));
            setMethod("city");
            // console.log(data);
            
      }else{

        fetch(`https://ctp-zip-code-api.onrender.com/zip/${event.target.value}`)
        .then((response) => response.json())
        .then((data) =>{ 
          setData(data)})
          .catch((error) =>setError(error));
            // console.log(data);
            setMethod("zip");
      }
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleKeyDown={handleKeyDown}/>
      
        <div>
          <City handleKeyDown={handleKeyDown}/>
        </div>
        {console.log(data)}
        {data? <ShowResults data={data} method={method}/>: <div>No results found</div>}
      </div>
    </div>
  );
}

export default App;
