import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@chakra-ui/react'

export default function Header() {

  const openNav = () => {
    document.getElementById("myNav").style.height = "100%";
  }

  const closeNav = () => {
    document.getElementById("myNav").style.height = "0%";
  }

  return (

    <nav>

      <div id="myNav" className="overlay">
        <div className='overlay-header'>
          <h1 className='overlay-header--logo'>Triplogo</h1>
          <FontAwesomeIcon icon={faXmark} className="closebtn" onClick={closeNav}/>
        </div>

        <div className="overlay-content">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Start Planning</a>
          <a href="#">My Trips</a>
          <a href="#">Account</a>
          <a href="#">Log Out</a>
        </div>
      </div>
        <h6 className='nav-logo'>Triplogo</h6>

        <div className='search-bar'>
          <Input placeholder='Your destination' className='search-bar--input'/>

          <button type="submit" name="search-submit" className='search-bar--button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <FontAwesomeIcon icon={faBars} className="drop-down" onClick={openNav}/>
    </nav>
  );
}
