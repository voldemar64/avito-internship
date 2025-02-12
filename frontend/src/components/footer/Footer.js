import "./Footer.css";
import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const pathName = useLocation();
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return pathName.pathname === "/" ||
    pathName.pathname === "/movies" ||
    pathName.pathname === "/saved-movies" ||
    pathName.pathname === "/profile" ? (
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
}

export default Footer;
