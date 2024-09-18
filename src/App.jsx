import { useState } from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  const [inputValue, setInputValue] = useState("");
  async function handleInputChange(event) {
    setInputValue(event.target.value);
    // Check if valid zipcode
    if (!inputValue.match(/[0-9]{5}/)) return;
    console.log("Valid zipcode");
    const baseURL = "https://ctp-zip-code-api.onrender.com";
    const endpoint = `/zip/${inputValue}`;
    try {
      let response = await fetch(baseURL + endpoint);
      let body = await response.json();
      console.log("Success", body);
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div>
      <form method="GET">
        <label htmlFor="zipcode">Zip Code: </label>
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          placeholder="Try 10016"
          onChange={handleInputChange}
        />
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
