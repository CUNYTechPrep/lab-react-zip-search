import React, { useEffect } from "react";
import { useState } from 'react';
import "./App.css";

function City(props) {
  const {eachCity} = props;
return <div > 
  <br/> 
  <h6 className="header">  {eachCity.LocationText} </h6>
  <div className= 'box'>
  <li> State: {eachCity.State} </li>
  <li> Location: ({eachCity.Lat} , {eachCity.Long} ) </li> 
  <li> Population: {eachCity.EstimatedPopulation} </li>
  <li> Total Wages: {eachCity.TotalWages}</li>
  </div>
   </div>
}
function ZipSearchField(props) {
const [zip, setZip] = useState("") 
const handleSubmit = (e) =>{
  e.preventDefault()
  props.UpdateZipcode(zip)
}

  return (
  <div>
  <form onSubmit= {handleSubmit}>
  <label> 
  <br/>
    Zip Code: 
    <input 
    type="text" 
    value={zip} 
    onChange={e=> setZip(e.target.value)}>
    </input>
  </label> 
      {/* <input type="submit" value="Submit" /> */}
  </form> 
  </div>)
}

function App() {
  const[posts,setPosts]=useState([])
  const[Zipcode, setZipcode] = useState("")

  function UpdateZipcode1(zip){
    console.log(zip)
    setZipcode(zip)
  }
  
  useEffect(( )=>{

    fetch(`https://ctp-zip-api.herokuapp.com/zip/${Zipcode}`)
    .then(response=>response.json())
    .then(data=> {
        console.log(data)
        setPosts(data)});

  }, [Zipcode]);


  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField UpdateZipcode = {UpdateZipcode1} />
        <div>
        <ul>{(Zipcode.length!==5 ) ? "No results found.": posts.map((element)=>{
          return <City eachCity={element}/> 
        })}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
