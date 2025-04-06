import "./AboutProject.css";
import React from "react";
import estatePath from "../../../images/estate.webp";
import yandexPath from "../../../images/yandex.svg";
import starsPath from "../../../images/stars.svg";
import stickerWinkPath from "../../../images/wink_sticker.svg";

const AboutProject: React.FC = () => {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <div className="about-project__content">
          <h2 className="about-project__title">
            Поможем продать недвижимость или услуги
          </h2>
          <p className="about-project__description">
            Привет! Мы - SiteScout. Давай я покажу тебе актуальные объявления
            разных категорий? Еще могу присылать на почту уведомления о заказе,
            как только кому-то понравится твой товар.
          </p>
          <div className="about-project__buttons">
            <button className="about-project__button about-project__button_search">
              Смотреть объявления
            </button>
            <button className="about-project__button about-project__button_liked">
              Избранное
            </button>
          </div>
          <a className="about-project__rates">
            <img className="rates__img_yandex" src={yandexPath} alt="yandex" />
            <p className="rates__subtitle">5.0</p>
            <img className="rates__img_stars" src={starsPath} alt="stars" />
            <p className="rates__description">рейтинг в Яндексе</p>
          </a>
        </div>
        <img
          className="about-project__image"
          src={estatePath}
          alt="фото коттеджа"
        />
        <img
          className="about-project__sticker"
          src={stickerWinkPath}
          alt="wink sticker"
        />
      </div>
    </section>
  );
};

export default AboutProject;
