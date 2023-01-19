import './Header.scss';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@chakra-ui/react'
import { openNav, closeNav } from '../helpers/dropDownHelper';



export default function Header(props) {

  const { pathname } = useLocation();
  const logout = () => localStorage.clear();
  const obj = JSON.parse(localStorage.getItem("user"));
  
  return (

    <nav>

      <div id="myNav" className="overlay">
        <div className='overlay-header'>
          <h1 className='overlay-header--logo'>Triplogo</h1>
          <FontAwesomeIcon icon={faXmark} className="closebtn" onClick={() => closeNav('myNav')}/>
        </div>

        <div className="overlay-content">
          <a href="/">Home</a>
          <a href="/places">Start Planning</a>
          <a href="/profile">My Page</a>
          <a href="/register">Account</a>
          <a href="/" onClick={logout}>Log Out</a>
        </div>
      </div>
      
      <a href='/' className='nav-logo'>Triplogo</a>

      <div className='search-bar'>

        <div className='search-bar--style'>

        <Avatar 
          className='user-avatar'
          name={localStorage.getItem("user") ? `${obj.first_name} ${obj.last_name}` : null} 
          src='https://bit.ly/tioluwani-kolawole'
        />

      </div>

        <FontAwesomeIcon 
          icon={faBars} 
          className="drop-down" 
          onClick={() => openNav('myNav')}  
        />
      </div>


    </nav>
  );
}
