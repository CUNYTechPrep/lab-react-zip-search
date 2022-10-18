import React from "react";

function ZipSearchField(keyStroke) {
  const zipCall = (event) => {
    fetch(`https://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        keyStroke(data);
      });
  };
  return (
    <div className="p-3">
      <strong>Zip Code: </strong>
      <input
        type="text"
        name="zip"
        placeholder="  Try 10016"
        onChange={zipCall}
      ></input>
    </div>
  );
}

export default ZipSearchField;
