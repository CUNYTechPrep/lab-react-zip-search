import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [searchZip, setSearchZip] = useState([]);

  function ZipSearchField(props) {
    return <div><br></br>
                <br></br>
                <label for="search">Zip Code:</label><br></br>
                <input type="text" id="search" name="search" onChange={getCity}></input>
    </div>;
  }

  const getCity = e => {
    const zipCode = e.target.value
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${zipCode}`) 
      .then((response) => {
          //console.log(response);
          return response.json();
        })
        .then((body) => {
          console.log(body);
          setSearchZip(body);
        })
        }


function City(props) {
  if(props){
    return(
      <div>
        <div>
        {props.City}, {props.State}
        </div>
        <ul>
          <li>
            <strong>State: </strong>{props.State}
          </li>
          <li>
            <strong>Location: </strong>{props.Lat}, {props.Long}
          </li>
          <li>
            <strong>Population (estimated): </strong>{props.EstimatedPopulation}
          </li>
          <li>
            <strong>Total Wages: </strong>{props.TotalWages}
          </li>
        </ul>
      </div>
    )
  }
    return(
      <div>
        <h1>No result</h1>
      </div>
    )
}  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        <div>
          {searchZip.map((search) =>{
            return <City {...search} key={search.RecordNumber} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
