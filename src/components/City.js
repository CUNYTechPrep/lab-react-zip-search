import React from "react";
import classes from "./City.module.css";

export const City = (props) => {
  return (
    <div className={classes.card}>
      <div>
        <h3>{props.LocationText}</h3>
      </div>
      <ul>
        <li>State: {props.LocationText.slice(-2)}</li>
        <li>
          Location: ({props.Lat}, {props.Long})
        </li>
        <li>Population (estimated): {props.TaxReturnsFiled}</li>
        <li>Total wages: {props.TotalWages}</li>
      </ul>
    </div>
  );
};
