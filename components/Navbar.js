import React from "react";
import "./Navbar.css";

function Navbar({ toggleTheme, isDark }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#home">
          <img
            src="/assets/logo.svg"
            alt="#"
            style={{ width: "90px", height: "90px" }}
          />
        </a>
      </div>
      <div className="nav-links">
        <a href="https://www.linkedin.com/in/divya-gupta-05007312a/">
          Linkedin
        </a>
        <a href="https://github.com/shanudivya">Github</a>
        <a href="#contact">Contact</a>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
