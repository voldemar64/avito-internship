import "./SideBar.css";
import React from "react";
import { Link } from "react-router-dom";
import profilePath from "../../images/profile.svg";

function SideBar(props) {
  return (
    <section className={`side-bar${props.isOpen ? " side-bar_visible" : ""}`}>
      <button
        type="button"
        className="side-bar__close"
        onClick={props.onClose}
      />
      <div className="side-bar__container">
        <Link
          className="side-bar__button"
          to="/"
          onClick={props.onClose}>
          Главная
        </Link>
        <Link
          className="side-bar__button"
          to="/form"
          onClick={props.onClose}>
          Поиск
        </Link>
        <Link
          className="side-bar__button"
          to="/list"
          onClick={props.onClose}
        >
          Объявления
        </Link>
      </div>
      <Link
        className="side-bar__button side-bar__button_profile"
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
