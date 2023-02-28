import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@chakra-ui/react'
import { openNav, closeNav } from '../helpers/dropDownHelper';
import { Link } from 'react-router-dom';



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
          <Link to="/">Home</Link>
          <Link to="/places">Start Planning</Link>
          <Link to="/profile">My Page</Link>
          <Link to="/register">Register</Link>
          <Link to="/" onClick={logout}>
            Log Out
          </Link>
        </div>
        </div>

        <Link to="/" className='nav-logo'>Triplogo</Link>

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
