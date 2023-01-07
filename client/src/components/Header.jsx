import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { 
  IconButton,
  Input
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'

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

        <FontAwesomeIcon icon={faX} className="closebtn" onClick={closeNav}/>

        <div className="overlay-content">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Start Planning</a>
          <a href="#">My Trips</a>
          <a href="#">Account</a>
          <a href="#">Log Out</a>
        </div>
      </div>

        <FontAwesomeIcon icon={faBars} className="drop-down" onClick={openNav}/>

        <div className='search-bar'>
          <Input placeholder='Enter your destination' className='search-bar--input'/>

          <button type="submit" name="search-submit" className='search-bar--button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
    </nav>
  );
}
