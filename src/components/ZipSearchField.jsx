import React, { useState } from "react";

const ZipSearchField = (props) => {
  const [zipField, setZipField] = useState("");

  return (
    <>
      <label htmlFor="zip">Zip Code:</label>
      <input
        type="text"
        value={zipField}
        id="zip"
        onChange={(e) => setZipField(e.target.value)}
      />
    </>
  );
};

export default ZipSearchField;
