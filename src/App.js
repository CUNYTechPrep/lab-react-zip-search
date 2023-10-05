import React from "react";
import "./App.css";
import City from "./City"
import ZipSearchField from "./ZipSearchField";

function App() {
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
