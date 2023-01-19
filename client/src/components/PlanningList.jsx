import './PlanningListItem.scss';
import PlanningListItem from './PlanningListItem';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function PlanningList() {

  const obj = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState([]);
  const [edited, setEdited] = useState(true)

  useEffect(() => {
    const url = `/api/plans/${obj.id}`;
    axios
    .get(url)
    .then((response) =>{
      setState(response.data);
      setEdited(false);
    })
  }, [edited]);

  const groupedLocations = state.reduce((acc, location) => {
    if (!acc[location.plan_date]) {
        acc[location.plan_date] = []
    }
    acc[location.plan_date].push(location);
    return acc;
}, {});

const locationGroups = Object.entries(groupedLocations);

const dateList = locationGroups.map(([date, locations]) => (
    <div>
        <h2>{new Date(date).toLocaleDateString()}</h2>
        <ul>
            {locations.map(location => (
                <PlanningListItem 
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  city={location.city}
                  rate={location.rate}
                  photo_url={location.photo_url}
                  plan_date={location.plan_date}
                  setEdited={setEdited}
                />
            ))}
        </ul>
    </div>
));

  return (
    <div>
      {dateList}
    </div>
  );
}