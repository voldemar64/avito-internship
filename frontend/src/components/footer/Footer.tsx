import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const isVisible =
    pathName === "/" ||
    pathName === "/movies" ||
    pathName === "/saved-movies" ||
    pathName === "/profile";

  return isVisible ? (
    <footer className="footer">
      <p className="footer__title">
        SiteScout - лучшее приложение для поиска всего
      </p>
      <div className="footer__nav">
        <p className="footer__date">&copy; SiteScout {year}</p>
        <div className="footer__links">
          <a
            className="footer__link"
            rel="noreferrer"
            target="_blank"
            href="https://chatgpt.com/"
          >
            О нас
          </a>
          <a
            className="footer__link"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/voldemar64/avito-internship"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
