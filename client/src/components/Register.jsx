import './Register.scss';
import Header from './Header';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

export default function Register() {
  
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const handleLastNameChange = (event) => setLastName(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handlePasswordConfirmationChange = (event) => setPasswordConfirmation(event.target.value);
  
  const handleSubmit = (event) => {
  event.preventDefault();
  if (password !== passwordConfirmation) {
    alert('The password and password confirmation do not match.');
  } else
  if (!firstName || !lastName || !email || !password || !passwordConfirmation){
    alert('All fields are required to be filled');
  } else {
    axios
      .post("/users", {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12)
      })
      .then((result) => {
        const user = result.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
      })
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
