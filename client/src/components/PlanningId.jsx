import Header from './Header';
import { useState, useEffect } from "react";
import axios from "axios";
  
export default function PlanningId() {

  // const [state, setState] = useState({}); 
  const [response, setResponse] = useState("");
  const [state, setState] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    
    axios
    .get(`http://localhost:8080/planningid`)
    .then((request, response) => {


      setState(request.data);

      const attractions = JSON.parse(localStorage.getItem("attractions"));

      const text = (`Create a trip timetable for ${attractions.toString()} from ${state.start_date} to ${state.end_date} with the time window of ${state.starting_time} to ${state.ending_time} each day`); 
      setPrompt(text);


    })
    .catch((err) => err);
  }, []);

  useEffect(() => {
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
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [prompt]);

  return (
    <main>
      <Header />
      <h1 style={{fontSize: '50px', marginTop: '100px'}}>{response}</h1>
    </main>
  );
}