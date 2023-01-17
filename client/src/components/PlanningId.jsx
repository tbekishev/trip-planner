import Header from './Header';
import { useState, useEffect } from "react";
import axios from "axios";

  
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

  return (
    <main>
      <Header />

    </main>
  );
}