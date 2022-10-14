import React from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  const handleChange = () => {
    console.log("zip code entered");
    fetch("https://ctp-zip-api.herokuapp.com/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("data retrieved successfully")
    })
  }

  return (
    <div>
      <form>
        <label>
          Zip Search:
          <input onChange={handleChange} type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function App() {

  

  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        <div>
          <City />
          <City />
        </div>
      </div>
    </div>
  );
}

export default App;
