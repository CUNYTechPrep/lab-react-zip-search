import React from "react";
import "./App.css";
import { useState, useEffect} from 'react';


function App() {

  // let mycurrentdata = [];

  function City(props) {
    const zip = props.zip;
    return (
      <div width="300px" height="100px" border="10px black">
        <h>{zip.City} , {zip.State}</h>
        <ul>
          <li>State: {zip.State}</li>
          <li>Location: {zip.Lat} {zip.Long}</li>
          <li>Population Estimated: {zip.EstimatedPopulation}</li>
          <li>Total Wages: {zip.TotalWages}</li>
        </ul>
      </div>
      );
  }

  function ZipSearchField(props) {

    const [currenttext, setcurrenttext] = useState("");
    const [myzipdata, setmyzipdata] = useState([]);
  
    function myAPI(zip){ 
      if(zip.length !== 5){
        setmyzipdata([]);
        // console.log(myzipdata.length);
      }
      else{
        const URL = `https://ctp-zip-code-api.onrender.com/zip/${zip}`
        fetch(URL)
        .then(res => res.json())
        .then(data => {
          setmyzipdata(data);
        })
        .catch(err => console.log('Error'))
      }
    }

      useEffect(() => {
        setmyzipdata(myzipdata);
        console.log(myzipdata);
      }, [myzipdata]);

      function changeHandler(text) {
        setcurrenttext(text.target.value);
        console.log(text.target.value);
        myAPI(text.target.value);
      }
  
    return (
      <div>
          Zip Code: 
          <input type="text" onChange={changeHandler} value={currenttext}></input>
          <div>
            {myzipdata.map((zipdata) => {
                return (<City zip={zipdata} key={zipdata.RecordNumber}/>);
            })
            }
          </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
      </div>
    </div>
  );

}

export default App;