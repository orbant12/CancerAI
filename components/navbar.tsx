"use client";

import React, { useRef } from 'react';
import "../../cancer_app/css/navbar.css";

const NavBar: React.FC = () => {
  const navRef = useRef<HTMLElement | null>(null);

  const handleBurgerMenuOpen2 = () => {
    if (navRef.current) {
      navRef.current.classList.add("active");
    }
  };

  const handleBurgerMenuClose2 = () => {
    if (navRef.current) {
      navRef.current.classList.remove("active");
    }
  };

  return (
    <>
      <div className='add-bar'>
        <span>Get 20% off on all services</span>
      </div>
      <nav ref={navRef} className='sticky'>
        <div className="nav-bar active">
          <i className='bx bx-menu sidebarOpen' onClick={handleBurgerMenuOpen2} />
          <span className="logo navLogo"><a href="/">Pocket Protect</a></span>
          <div className="menu show">
            <div className="logo-toggle ">
              <span className="logo"><a href="#">betterByte</a></span>
              <i className='bx bx-x siderbarClose' onClick={handleBurgerMenuClose2}></i>
            </div>
            <ul className="nav-links">
              <li><a href="/mobile-projects">Home</a></li>
              <li><a href="/fullstack-projects">Services</a></li>
              <li><a href="/cyber_security-projects">Clients</a></li>
            </ul>
          </div>

          <div className="nav-more">
            <a href="/about-me">Contact</a>
            <a>|</a>
            <a href="/auth/login">Login</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
