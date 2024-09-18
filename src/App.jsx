import { useState } from "react";
import "./App.css";

function City(props) {
  console.log(props.LocationText);
  return <>
  <div>
  <header>{props.LocationText}</header>
  <ul>
    <li>State: {props.State}</li>
    <li>Location: {props.Lat+","+props.Long}</li>
    <li>Population: {props.EstimatedPopulation}</li>
    <li>Total Wages: {props.TotalWages}</li>
  </ul>


  </div>
  </>;
}

//pay attention to the semantics of the names, it will give insight into how things work
function ZipSearchField(props) {

  // const [cityList,setCityList]=useState([])
  // const zipcode ="";
  const zipcodeApi = async (zipcode)=>{
    console.log("Inside Async function")
      const API_BASE_URL = "https://ctp-zip-code-api.onrender.com";
      const response = await fetch(API_BASE_URL+"/zip/"+zipcode);
      const body = await response.json();
    
      console.log(body);
      //Why does the following line cause the function to call itself infinitely
      props.setCityList(body);
  }

  //look into ref
  //Should this code below be the app function or in this function
  //I am guessing the app function so it can pass the value as a prop
  
  //using states will cause the app to re render
  
  var changed=false;
  const handleChange = (event)=>{
    const value = event.target.value;
    if(value.length==5 ){
      zipcodeApi(value);
      changed =false;
    }
  };

  //this statement is causing the zipcode to rerender everytime the function is run
 

  
  // 
  
  return <div>
    <span><p>Zipcode:</p>
    <input 
     
    //  onInput={e=>setZipcode(e.target.value)}
    //  onChange={async()=>{

    // const response = await fetch('https://ctp-zip-code-api.onrender.com/zip/:zipcode=');
    // const body = await response.json();
    // console.log();}}
    onChange={handleChange}

    />
         
    </span>
    </div>;
}

function App() {

  const [cityList,setCityList]=useState([])


  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCityList={setCityList}/>
        <div>
           {cityList.map((cities) => (
         <City {...cities} key={cities.RecordNumber} />
      ))} 
        </div>
      </div>
    </div>
  );
}

export default App;
