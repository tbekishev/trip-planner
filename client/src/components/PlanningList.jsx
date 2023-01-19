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
  city={location.city}
  rate={location.rate}
  photo_url={location.photo_url}
  plan_date={location.plan_date} />);

    return (
      <ul>
      {locationList}
    </ul>

  );
}
