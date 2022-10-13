import React, { Component } from "react";
import "./App.css";

class textInput extends Component { 
  constructor(props) {
    super(props); 
    this.state = { 
      valid: false,
      code: " "
  }; 
  } 

  render() {
    return (<div>
      {this.state.code}
 </div>);
  }
  
} 
  
let currentInput = textInput; 

function inputChange(e, input) {
  this.setState({[input]: e.target.value }) 
} 

function City(props) {
  // How can I display the current code? Is it being updated properly?
  return <div>{currentInput.code}</div> 
}



function ZipSearchField(props) {
  let value = "";
  return (<input id = "zipcode" type="text"  onChange={(e) => currentInput.inputChange(e, 'code')}/>);
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
