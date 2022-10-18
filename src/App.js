// Question for instructor: Do all functions in the app js file need a prop param? Or do all React functions expect a prop param? does each function need a key?
//How often is a file read by memory? think of the trivia app
//How do i orginize my files so that data isn't trapped? should i use variables that are less nested? ex: im making the call to the api for json data using the zipsearchfield div or file or module yet I need to transfer that data to the city div, file or module.
import React, { useState } from "react";
import City from "./City.js";
import ZipSearchField from "./ZipSearchField.js";
import "./App.css";

function App() {
  const [zipFetch, setZipFetch] = useState("No Results");

  const keyStroke = (selection) => {
    setZipFetch(selection);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField keyStroke={keyStroke} />
        <div>
          <City zipFetch={zipFetch} />
        </div>
      </div>
    </div>
  );
}

export default App;
