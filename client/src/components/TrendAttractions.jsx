import './PlanningListItem.scss';
import Header from './Header';
import { useEffect, useState } from "react";
import PlanningListItem from './PlanningListItem';
import AttractionListItem from './Generate/AttractionListItem';
import axios from 'axios';


export default function TrendAttractions() {

  const [state, setState] = useState([]);
  const obj = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    axios
      .get('/trend-attarctions')
      .then((response) => {
        setState(response.data.data)
        console.log(response, "data")
      })
      .catch((err) => err);
  }, []);


  const attractionsList = state.map((plan) =>
    <AttractionListItem />
  );


  return (
    <main>
      <section className='header'>
        <Header />
      </section>
      <section className='user_profile_title' 
      style={{
        'marginTop': '100px', 
        'justifyContent': 'center', 
        'fontFamily': 'Verdana, Geneva, Tahoma, sans-serif',
        'color': '$red',
        'fontSize': '3ch', 'paddingLeft': '2em'
      }}>
        <h2> Trend Attractions</h2>
      </section>
      <div>

        <AttractionListItem />
        <AttractionListItem />
        <AttractionListItem />
        <AttractionListItem />
        <AttractionListItem />
      </div>

    </main>
  );
}