import React, { useRef, useState } from "react";
import classes from "./ZipSearchField.module.css";

export const ZipSearchField = (props) => {
  const [zipCodeIsValid, setZipCodeIsValid] = useState(true);
  const zipCodeInputRef = useRef();

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (zipCodeInputRef.current.value.trim().length !== 5) {
      setZipCodeIsValid(false);
      return;
    } else {
      setZipCodeIsValid(true);
      props.zipCodeFetch(zipCodeInputRef.current.value);
      zipCodeInputRef.current.value = "";
    }
  };

  const invalidMsg =
    !zipCodeIsValid || props.error ? (
      <p className={classes.invalidMsg}>Invlid zip code</p>
    ) : (
      ""
    );

  return (
    <form onSubmit={onFormSubmit} className={classes.form}>
      <div>
        <label htmlFor="zipcode">Zip Code:</label>
        <input
          ref={zipCodeInputRef}
          type="text"
          className={!zipCodeIsValid || props.error.length > 0 ? classes.invalid : ""}
          placeholder="Ex. 10016"
        />
      </div>
      {invalidMsg}
    </form>
  );
};
