import { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  const[formattedCityName, setFormattedCityName] = useState("")


  function toTitleCase(str) {
    let formatted_name = str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setFormattedCityName(formatted_name);
  }

  useEffect(()=>{
    toTitleCase(props.city);
  }, [props])

  return (
    <div className="flex flex-col shadow-sm border" style={{margin:"20px"}}>
      <div className="city">{`${formattedCityName}, ${props.state}`}</div>
      <ul className="fields">
        <li>
          State: {props.state}
        </li>
        <li>
          Location: {`(${props.lat}, ${props.long})`}
        </li>
        <li>
          Population (estimated): {props.population}
        </li>
        <li>
          Total Wages: {" "} {props.totalWages}
        </li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {

  const [input, setInput] = useState("");

  function handleChange(newInput){
    const text = newInput.target.value
    setInput(text)
  } 


  // async function fetchCities(zips){
  //    const endpoint = `https://ctp-zip-code-api.onrender.com/zip/${input}`;
  //    fetch(endpoint)
  //      .then((response) => response.json())
  //      .then((data) => {
  //        console.log("data", data);
  //      })
  //      .catch((err) => {
  //        alert("An error occurred when getting the information."),
  //          console.log("Error fetching from endpoint: ", err);
  //      });
  // }
  function handleSubmit(e){
    e.preventDefault();
    console.log(input)
    if(input === ""){
      return
    }
    if(parseInt(input)){
    const endpoint = `https://ctp-zip-code-api.onrender.com/zip/${input}`; 
    fetch(endpoint)
    .then((response) =>response.json())
    .then( data => {console.log("data", data); props.copyResults(data)})
    .catch(err=>{alert("An error occurred when getting the information."), console.log("Error fetching from endpoint: ",err)})
  // }else{
  //   const upper_input = input.toUpperCase();
  //    const endpoint = `https://ctp-zip-code-api.onrender.com/city/${upper_input}`;
  //    fetch(endpoint)
  //      .then((response) => 
  //        response.json()
  //      )
  //      .then((data) => fetchCity(data))
  //      .catch((err) => {
  //        alert("An error occurred when getting the information."),
  //          console.log("Error fetching from endpoint: ", err);
  //      });
  }
}
  return (
    <div className="zipSearchField">
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="zip-code">
          Zip Code:
        </label>
        <input
          id="zip-code"
          type="search"
          name="zip-code"
          value={input}
          onChange={ e => handleChange(e)}
        />
      </form>
    </div>
  );
}

function App() {
  const [results, setResults] = useState([]);

  function copyResults(data){
    setResults(data);
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField copyResults={copyResults}/>
        <div>
          {
          
          results.map((result, index)=>(
            <City  key={index} city={result.City} state={result.State} lat={result.Lat} long={result.Long} population={result.EstimatedPopulation} totalWage={result.TotalWages}  />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default App;
