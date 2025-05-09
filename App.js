import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      <Navbar toggleTheme={() => setDarkMode(!darkMode)} isDark={darkMode} />
      <main className="main-container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="role">UI/UX Designer</span>
              <h1>
                Hello, I'm <strong>Divya Gupta</strong>
              </h1>
              <p>
                I design and develop beautiful, user-friendly web interfaces.
              </p>
              <div className="buttons">
                <a
                  href="https://github.com/shanudivya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                >
                  Github
                </a>
                <a
                  href="https://www.linkedin.com/in/divya-gupta-05007312a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  LinkedIn
                </a>
                <a
                  href="/assets/Divya_Gupta_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                >
                  Resume
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="../assets/profile.JPG" alt="Profile" />
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
