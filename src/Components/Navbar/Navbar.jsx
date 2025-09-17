import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu("home");
    else if (path === '/doctors') setMenu("doctors");
    else if (path === '/diseases') setMenu("diseases");
    else if (path === '/about') setMenu("about");
    else if (path === '/contact') setMenu("contact");
  }, [location]);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to='/' onClick={() => setMenu("home")}>
          <i className="fas fa-leaf"></i>
          <h1>Tiba <span>Asili</span>  </h1>
        </Link>
      </div>
      
      <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/' className={menu === "home" ? "active" : ""}>
            Nyumbani
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/doctors' className={menu === "doctors" ? "active" : ""}>
            Wataalamu
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/diseases' className={menu === "diseases" ? "active" : ""}>
            Magonjwa
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/about' className={menu === "about" ? "active" : ""}>
            Kuhusu
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/contact' className={menu === "contact" ? "active" : ""}>
            Wasiliana
          </Link>
        </li>
      </ul>
      
      <div className="nav-login-cart">
        <Link to='/login'>
          <button>Ingia</button>
        </Link>
        
        <div className={`nav-hamburger ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;