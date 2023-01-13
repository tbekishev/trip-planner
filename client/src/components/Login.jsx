import Header from './Header';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
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

  return (
    <main>
      <Header />

      <section className='register'>
        <h1 className='register-heading'><span>LOGIN</span>
        </h1>

        <form className='register-form' onSubmit={handleSubmit}>
          <input
            className='input-contents'
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input
            className='input-contents'
            name="password"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        <span>{alert ? `Wrong Credentials, Try Again!` : null}</span>
        <span>{error ? `Fill up the Form please!` : null}</span>
          <button type="submit" name="search-submit" className='register-button'>
            Submit
          </button>

        </form>

      </section>

    </main>
  );
}