import { useState } from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  return <>
    <span> Zip Code: </span>
    <form class = "search-bar">
      <input
        type="text"
        value={inputValue}
        onChange = {handleChange}
        placeholder = "Enter some text"
      />
    </form>
  </>;
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
