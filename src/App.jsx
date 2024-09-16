import { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  return (
    <>
      <label for="zip-code">Zip Code</label>
      <input
        id="zip-code"
        type="text"
        onChange={(e) => {
          if (e.target.value.length === 5) {
            props.onZipChange(e.target.value);
          }
        }}
      ></input>
    </>
  );
}

function App() {
  const [zipCode, setZipCode] = useState(0);
  const [zipData, setZipData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ctp-zip-code-api.onrender.com/zip/" + zipCode
      );
      const data = await response.json();
      setZipData(data);
    };
    fetchData();
    console.log(zipData);
    console.log(zipCode, "- Has changed");
  }, [zipCode]);
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={setZipCode} />
        <div>
          <City />
          <City />
        </div>
      </div>
    </div>
  );
}

export default App;
