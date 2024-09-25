import { useState } from "react";
function ZipSearchField({ onZipChange }) {
    const [zip, setZip] = useState("");
  

    const handleInputChange = (e) => {
      const newZip = e.target.value;
      setZip(newZip);
      onZipChange(newZip);
    };
  
    return (
      <div>
        <label htmlFor="zip">Enter ZIP Code: </label>
        <input
          type="text"
          id="zip"
          value={zip}
          onChange={handleInputChange}
          placeholder="e.g. 10016"
        />
      </div>
    );
  }
  export default ZipSearchField;