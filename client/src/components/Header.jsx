import './Header.scss';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@chakra-ui/react'
import Autocomplete from "react-google-autocomplete";

export default function Header() {

  const { pathname } = useLocation();
  const logout = () => localStorage.clear();
  const obj = JSON.parse(localStorage.getItem("user"));

  const openNav = () => {
    document.getElementById("myNav").style.height = "100%";
  }

  const closeNav = () => {
    document.getElementById("myNav").style.height = "0%";
  }

  return (

    <nav className={pathname === '/' ? 'nav-bar' : ''}>

      <div id="myNav" className="overlay">
        <div className='overlay-header'>
          <h1 className='overlay-header--logo'>Triplogo</h1>
          <FontAwesomeIcon icon={faXmark} className="closebtn" onClick={closeNav}/>
        </div>

        <div className="overlay-content">
          <a href="/">Home</a>
          <a href="/">Explore</a>
          <a href="/">Start Planning</a>
          <a href="profile">My Trips</a>
          <a href="register">Account</a>
          <a href="/" onClick={logout}>Log Out</a>
        </div>
      </div>

      <h1 id='home-page-logo' className='overlay-header--logo' style={{display: pathname === '/' ? '' : 'none'}}>Triplogo</h1>
      
      <a href='/' className='nav-logo' style={{display: pathname === '/' ? 'none' : ''}}>Triplogo</a>

      <div className='search-bar' style={{'marginLeft': pathname === '/' ? '3em' : ''}}>

        <div className='search-bar--style'>

          <Autocomplete 
            className='search-bar--input'
            apiKey={process.env.REACT_APP_GOOGLEKEY}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          />

          <button type="submit" name="search-submit" className='search-bar--input--button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <Avatar 
          className='user-avatar'
          name={localStorage.getItem("user") ? `${obj.first_name} ${obj.last_name}` : null} 
          src='https://bit.ly/tioluwani-kolawole'
          style={{'backgroundColor': pathname === '/' ? '' : '#7EA78B', 'position': 'inherit'}}
        />

        <FontAwesomeIcon 
          icon={faBars} 
          className="drop-down" 
          onClick={openNav}        
        />
      </div>


    </nav>
  );
}
