import Header from './Header';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
  
export default function PlanningId() {

  // const [state, setState] = useState({}); 
  const [response, setResponse] = useState("");
  const [state, setState] = useState('');
  const [prompt, setPrompt] = useState('');
  // localStorage.setItem("user", JSON.stringify(user));

  useEffect(() => {
    
    axios
    .get(`http://localhost:8080/planningid`)
    .then((request, response) => {

      setState(request.data);

    })
    .catch((err) => err);
  }, []);

  useEffect(() => {
    const attractions = JSON.parse(localStorage.getItem("attractions"));

    const text = (`Create a trip timetable for attractions: ${attractions.toString()}, from ${moment(state.start_date).format('YYYY-MM-DD')} to ${moment(state.end_date).format('YYYY-MM-DD')} with the time window of ${state.starting_time} to ${state.ending_time} each day`); 
    setPrompt(text);
  }, [state])

  useEffect(() => {
    console.log(prompt);

      axios
      .get("http://localhost:8080/generateschedule", 
        {
          params: {
            prompt: prompt
          },
        }
      )
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [prompt]);

  return (
    <main>
      <Header />
      {response}
    </main>
  );
}