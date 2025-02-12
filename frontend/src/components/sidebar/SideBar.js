import "./SideBar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import profilePath from "../../images/profile.svg";

function SideBar(props) {
    const location = useLocation();
    const isMain = location.pathname === "/";
    const isProfile = location.pathname === "/profile";
    const isForm = location.pathname === "/form";
    const isList = location.pathname === "/list";

  return (
    <section className={`side-bar${props.isOpen ? " side-bar_visible" : ""}`}>
      <button
        type="button"
        className="side-bar__close"
        onClick={props.onClose}
      />
      <div className="side-bar__container">
        <Link
          className={`side-bar__button${isMain ? " side-bar__button_active" : ""}`}
          to="/"
          onClick={props.onClose}>
          Главная
        </Link>
        <Link
          className={`side-bar__button${isForm ? " side-bar__button_active" : ""}`}
          to="/form"
          onClick={props.onClose}>
          Разместить объявление
        </Link>
        <Link
          className={`side-bar__button${isList ? " side-bar__button_active" : ""}`}
          to="/list"
          onClick={props.onClose}
        >
          Объявления
        </Link>
      </div>
      <Link
        className={`side-bar__button side-bar__button_profile${isProfile ? " side-bar__button_active" : ""}`}
        to="/profile"
        onClick={props.onClose}
      >
        <p className="side-bar__account">Аккаунт</p>
        <img className="side-bar__img" src={profilePath} alt="профиль"></img>
      </Link>
    </section>
  );
}

export default SideBar;
