import "./Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import profilePath from "../../images/profile.svg";

interface HeaderProps {
  onSideBarOpen: () => void;
  isLogged: boolean;
  windowWidth: () => { width: number };
}

const Header: React.FC<HeaderProps> = ({ onSideBarOpen, isLogged, windowWidth }) => {
  const location = useLocation();
  const { width } = windowWidth();
  const isProfile = location.pathname === "/profile";
  const isForm = location.pathname === "/form";
  const isList = location.pathname === "/list";
  const isSavedList = location.pathname === "/saved-list";

  return (
    <header className={`header${isProfile ? " header_type_dark" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>
        {isLogged ? (
          width >= 1280 ? (
            <nav className="header__account">
              <Link
                to="/form"
                className={`header__link header__link_type_form${isForm ? " header__link_active" : ""}`}
              >
                Разместить объявление
              </Link>
              <Link
                to="/list"
                className={`header__link header__link_type_list${isList ? " header__link_active" : ""}`}
              >
                Объявления
              </Link>
              <Link
                to="/saved-list"
                className={`header__link header__link_type_list${isSavedList ? " header__link_active" : ""}`}
              >
                Сохранённое
              </Link>
              <Link
                to="/profile"
                className={`header__link header__link_type_profile${isProfile ? " header__link_active" : ""}`}
              >
                <p className="header__subtitle">Аккаунт</p>
                <img src={profilePath} alt="профиль" className="header__img" />
              </Link>
            </nav>
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
};

export default Header;
