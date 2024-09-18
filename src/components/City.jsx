export default function City(props) {

    return <>
    {/* div with all the information we need  */}
      <div>
        <header>{props.LocationText}</header>
        <ul>
          <li>State: {props.State}</li>
          <li>Location: {props.Lat + "," + props.Long}</li>
          <li>Population (estimated): {props.EstimatedPopulation}</li>
          <li>Total Wages: {props.TotalWages}</li>
        </ul>
      </div>
    </>;
  }