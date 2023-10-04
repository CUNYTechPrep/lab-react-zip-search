import React from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  return <div>This is the ZipSearchField component</div>;
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
