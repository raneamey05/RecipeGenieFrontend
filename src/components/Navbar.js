import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Ensure CSS is correctly linked

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/recipes" className={({ isActive }) => isActive ? "active" : ""}>Recipes</NavLink></li>
        <li><NavLink to="/weekly-schedule" className={({ isActive }) => isActive ? "active" : ""}>Weekly Schedule</NavLink></li>
        <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink></li>
      </ul>
      {/* Login Button */}
      </nav>
  );
};

export default Navbar;

