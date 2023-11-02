import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2023 Floyd Feske Music</p>
      <div className="social-links-container">
        <div className="social-links-1">
          <a
            className="social-link"
            href="https://www.facebook.com/profile.php?id=100086972757115&sk=about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            className="social-link"
            href="https://www.facebook.com/profile.php?id=100086972757115&sk=about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="social-link"
            href="https://open.spotify.com/artist/5QQ0CutnlVZTg7xQNMvMqJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spotify
          </a>
        </div>
        <div className="social-links-2">
          <a
            className="social-link"
            href="https://open.spotify.com/artist/5QQ0CutnlVZTg7xQNMvMqJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          {/* <a
            className="social-link"
            href="https://www.tiktok.com/@theaaronjustice?_t=8gGlSMm2vyF&_r=1&fbclid=IwAR1HVTO_FuCRbKqnZqWcQSpvjf7zpMvcXpf_sNUTmrfMXkkpTeCxj7735Ww"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a> */}
          <Link to="/Admin" className="social-link">
            AdminPortal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;