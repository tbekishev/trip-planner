
import './UserProfile.scss';
import './PlanningListItem.scss';
import Header from './Header';
import { useEffect, useState } from "react";
import PlanningListItem from './PlanningListItem';
import axios  from 'axios';
import { Navigate } from 'react-router-dom';


export default function UserProfile() {
  
  
  const [state, setState] = useState([]);  
 
  useEffect(() => {
    const userPlans = "http://localhost:8080/profile/4";
    axios
    .get(userPlans)
    .then((response) => {
      setState(response.data.data)

      console.log (response.data , "data")
    })
    .catch((err) => err);
  }, []);
  // const userName = state.first_name;

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
    <section className='user_profile_title' style={{ 'marginTop': '110px' }}><h2> My PROFILE</h2>

      <span className='user_profile'>My Plans</span>
      <br /><br />
      <div className='planning-list--container'>
        {UserPlanningList}
      </div>
    </section>
  </main>
);
}