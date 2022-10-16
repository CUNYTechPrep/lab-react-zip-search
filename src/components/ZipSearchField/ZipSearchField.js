import React from "react";

export default function ZipSearchField({ setZipCode, zipCode, setCities, setIsFound }) {
  async function onChangeZipCodeHandler(event) {
    setZipCode(event.target.value);
    
    if (event.target.value.length != 5){
      setCities([])
      setIsFound(false);
      return
    } 
    try{ 
    fetch(`https://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => setCities(data))
    
    setIsFound(true);
    }
    catch (error) {
        console.log(error)
        setCities([])
    }
  }

  return (
    <div>
      <div>Zip Code: </div>
      <input onChange={onChangeZipCodeHandler} value={zipCode}></input>
    </div>
  );
}
