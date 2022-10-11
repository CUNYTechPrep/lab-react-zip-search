import React from "react";


function ZipSearchField({ handleChange, value }) {
    return (
      <div className="my-5" style={{display:'flex'}}>
        <label htmlFor="zip-code" style={{fontWeight:'bold'}}>Zip Code:</label>
        <input
          className="form-control"
          id="zip-code"
          type="text"
          onChange={handleChange}
          value={value}
        />
      </div>
    );
  }

export default ZipSearchField