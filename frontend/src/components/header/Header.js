import "./Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import profilePath from "../../images/profile.svg?url";

function Header({ onSideBarOpen, isLogged, windowWidth }) {
  const location = useLocation();
  const { width } = windowWidth();
  const isMainOrProfile = location.pathname === "/profile";

  return (
    <header
      className={`header${isMainOrProfile ? " header_type_dark" : ""}`}
    >
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>
        {isLogged ? (
          width >= 1280 ? (
            <Link
              to="/profile"
              className="header__link header__link_type_profile"
            >
              <p className="header__subtitle">Аккаунт</p>
              <img src={profilePath} alt="профиль" className="header__img" />
            </Link>
          ) : (
            <button
              type="button"
              className="header__button"
              onClick={onSideBarOpen}
            ></button>
          )
        ) : (
          <nav className="header__account">
            <Link
              to="/signup"
              className="header__link header__link_type_register"
            >
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="header__link header__link_type_signin"
            >
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
