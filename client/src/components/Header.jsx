import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@chakra-ui/react'
import { openNav, closeNav } from '../helpers/dropDownHelper';



export default function Header() {

  const logout = () => localStorage.clear();
  const obj = JSON.parse(localStorage.getItem("user"));
  
  return (

      <nav>
        <div id="myNav" className="overlay" onMouseLeave={() => closeNav('myNav')}>
          <div className='overlay-header'>
            <h1 className='overlay-header--logo'>Triplogo</h1>
          </div>

          <div className="overlay-content">
            <a href="/">Home</a>
            <a href="/places">Start Planning</a>
            <a href="/profile">My Page</a>
            <a href="/register">Register</a>
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
            onMouseEnter={() => openNav('myNav')}  
          />
        </div>


      </nav>

  );
}
