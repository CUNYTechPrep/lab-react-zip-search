import React from "react";

function CityCard(location, recordNum, state, lat, long, population, wages) {
  return (
    <div className="cityCard m-3">
      <div className="cityTitle">
        <h6 className="px-3">{location}</h6>
      </div>
      <div className="px-3 pb-3 pt-2">
        <ul>
          <li>{recordNum}</li>
          <li>{state}</li>
          <li>{lat}</li>
          <li>{long}</li>
          <li>{population}</li>
          <li>{wages}</li>
        </ul>
      </div>
    </div>
  );
}

export default CityCard;
