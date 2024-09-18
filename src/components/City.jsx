export default function City(props) {
    // console.log(props.LocationText);
    return <>
      <div>
        <header>{props.LocationText}</header>
        <ul>
          <li>State: {props.State}</li>
          <li>Location: {props.Lat + "," + props.Long}</li>
          <li>Population: {props.EstimatedPopulation}</li>
          <li>Total Wages: {props.TotalWages}</li>
        </ul>
  
  
      </div>
    </>;
  }