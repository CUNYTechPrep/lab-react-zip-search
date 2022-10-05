import React, {useState} from "react";
import "./App.css";


// function City(props) {
//   return <div>This is the City component</div>;
// }

function ZipSearchField(props) {
  const [zip,setZip] = useState("");
  return (
    <form action="" classname="form">
      <input
        className="zip"
        value={zip}
        placeholder="xxxxx"
        type="text"
        name="zip"
        id="zip"
        onChange={(event)=> {
          const {value} = event.target;
          setZip(value.replace(/[^\d{5}]$/,"").substr(0,5)) //expression to allow only #s & substr will only allow 5 in the form
        }}
        />
    </form>
  
  )
}

function ResultCard(props){
  return(

    <div >
          <h2 id="h2">{props.zip.City}, {props.zip.State}</h2>
          <ul>
            <div id="li">
              <li>State: {props.zip.State}</li>
              <li>Location: {props.zip.Location}</li>
              <li>Estimated Population: {props.zip.EstimatedPopulation}</li>
              <li>Total Wages: {props.zip.TotalWages}</li>

            </div>
          </ul>
          </div>


  )
}

function App() {
  const initialCondiitons = {city:"", state:""}
  //const [city, setCity] = useState(initialCondiitons);
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState("");

  const fetchData = () => {
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipCode , {
      'mode' : 'cors',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => setData(responseData))
    .catch((error) => console.log(error));
  }

  

  return (
    <div className="App">
      <h1>Zip Code Search</h1>
      
      <div style={{marginTop: 20}}>
      <label id= "zipCode" htmlFor="zip">Zip Code</label>
        <div className="input">
          <input type="text" onChange={(e) => setZipCode(e.target.value)}></input>
        </div>
        
        <button onClick={() => fetchData(zipCode)}>Search</button>
        
        <div className="resultCard">
          {data.map((zip) => (
            <ResultCard zip={zip}></ResultCard>
        ))}
        </div>
        


      </div>
    </div>
  );
}


export default App;
