import './Register.scss';
import Header from './Header';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { useToast } from '@chakra-ui/react';

export default function Register() {
  
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setError(false);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setError(false);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
    setError(false);
  }

  const toast = useToast()
  
  const handleSubmit = (event) => {
  event.preventDefault();
  if (password !== passwordConfirmation) {
    setConfirmation(true)
  } else
  if (!firstName || !lastName || !email || !password || !passwordConfirmation){
    setError(true);
  } else {
    axios
      .post("/users", {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12)
      })
      .then((result) => {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        const user = result.data;
        console.log("USER",user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
      })
      .catch((err) => setAlert(true));
  }
};

  return (
    <main>
      <Header />

      <section className='register'>
        <h1 className='register-heading'><span>CREATE</span>
          <div>
            <span> an</span><span> acount</span>
          </div>
        </h1>

        <h4 className='promotion-line'>and start planning today!</h4>
        <span>{alert ? `Sorry, Try again!` : null}</span>
        <span>{error ? `Fill up the Form please!` : null}</span>
        <span>{confirmation ? 'The password and password confirmation do not match.' : null}</span>
        <form className='register-form' onSubmit={handleSubmit}>
          <input
            className='input-contents'
            name="firstName"
            type="text"
            placeholder="First name"
            onChange={handleFirstNameChange}
          />
          <input
            className='input-contents'
            name="lastName"
            type="text"
            placeholder="Last name"
            onChange={handleLastNameChange}
          />
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
          <input
            className='input-contents'
            name="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
            onChange={handlePasswordConfirmationChange}
          />
          <button type="submit" name="search-submit" className='register-button'>
            Submit
          </button>

        </form>

      </section>

    </main>
  );
}
