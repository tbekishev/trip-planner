import axios from "axios";
import { useEffect, useState } from "react";

export const userLogin = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setAlert(false);
    setError(false);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setAlert(false);
    setError(false);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password){
      setError(true);
    } else {
    axios
      .post("/userslogin", {
        email,
        password
      })
      .then((result) => {
        if (!result.data) {
          setAlert(true);
        } else {
        const user = result.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
        }
      })
    }
  };
  useEffect(() => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    console.log(userData)
    if (userData) {
      navigate("/");
    }
  });

};