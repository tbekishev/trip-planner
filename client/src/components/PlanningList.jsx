import './PlanningListItem.scss';
import PlanningListItem from './PlanningListItem';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function PlanningList() {

  const obj = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState([]);
  

  useEffect(() => {
    const url = `/api/plans/${obj.id}`;
    axios
    .get(url)
    .then((response) =>{
      setState(response.data);
    })
  }, []);

  const locationList = state.map((location) =>
  <PlanningListItem 
  key={location.id}
  name={location.name}
  start_date={location.start_date}
  end_date={location.end_date}
  locatinId={location.location_id} />);

    return (
      <ul>
      {locationList}
    </ul>

  );
}