
import './UserProfile.scss';
import './PlanningListItem.scss';
import Header from './Header';
import { useEffect, useState } from "react";
import PlanningListItem from './PlanningListItem';
import axios  from 'axios';
import { redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlanningList from './PlanningList';


export default function UserProfile() {
 
  const [state, setState] = useState([]);  
  const obj = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
       const userProfile = `http://localhost:8080/profile/${obj.id}`;
    axios
    .get(userProfile)
    .then((response) => {
      setState(response.data.data)
    })
    .catch((err) => err);
  }, []);
  

  const UserPlanningList = state.map((plan) =>
    <PlanningListItem
      key={plan.id}
      name={plan.name}
      city={plan.city}
      rate={plan.rate}
      budget={plan.average_budget} />
  );


return (
  <main>
    <section className='header'>
      <Header />
    </section>
    <section className='user_profile_title' style={{ 'marginTop': '100px' }}><h2> {obj.first_name}'s Plans</h2>
    </section >
      <div className='planning-list--container'>
        <PlanningList />
      </div>
    
  </main>
);
}