import Header from './Header';
import { useState, useEffect } from "react";
import axios from "axios";

  
export default function PlanningId() {

  const [state, setState] = useState([]);  
  const obj = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const planning = `http://localhost:3000/planningid`;
    axios
    .get(planning)
    .then((response) => {
      console.log(response.data);
      setState(response.data.data)
    })
    .catch((err) => err);
  }, []);

  return (
    <main>
      <Header />

    </main>
  );
}