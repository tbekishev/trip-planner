import './PlanningListItem.scss';
import PlanningListItem from './PlanningListItem';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function PlanningList() {
  const [state, setState] = useState([]);
  useEffect(() => {
    const attractionsUrl = "/api/trend/location";
    axios
    .get(attractionsUrl)
    .then((response) =>{
      setState(response.data);
    })
  }, []);

  const locationList = state.map((location) =>
  <PlanningListItem 
  key={location.id}
  name={location.name}
  city={location.city}
  rate={location.rate}
  budget={location.average_budget} />);
    return (
      <ul>
      {locationList}
    </ul>

  );
}
