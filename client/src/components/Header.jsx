import './Header.scss';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@chakra-ui/react'

export default function Header() {
  const { pathname } = useLocation();

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
          <a href="/">My Trips</a>
          <a href="/">Account</a>
          <a href="/">Log Out</a>
        </div>
      </div>

      <h1 id='home-page-logo' className='overlay-header--logo' style={{display: pathname === '/' ? '' : 'none'}}>Triplogo</h1>
      
      
      <a href='/' className='nav-logo' style={{display: pathname === '/' ? 'none' : ''}}>Triplogo</a>

      <div className='search-bar' style={{width: pathname === '/' ? '90%' : ''}}>
        <Input placeholder='Your destination' className='search-bar--input'/>

        <button type="submit" name="search-submit" className='search-bar--button'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <FontAwesomeIcon icon={faBars} className="drop-down" onClick={openNav}/>
    </nav>
  );
}
