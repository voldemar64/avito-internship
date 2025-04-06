import "./Cities.css";
import React from "react";

const Cities: React.FC = () => {
  return (
    <section className="cities">
      <div className="cities__container">
        <h3 className="cities__title">Города, в которых я работаю</h3>
        <div className="cities__lists">
          <div className="cities__list">
            <p className="cities__name">Москва</p>
            <p className="cities__name">Санкт-Петербург</p>
            <p className="cities__name">Архангельск</p>
            <p className="cities__name">Волгоград</p>
            <p className="cities__name">Воронеж</p>
            <p className="cities__name">Екатеринбург</p>
          </div>
          <div className="cities__list">
            <p className="cities__name">Казань</p>
            <p className="cities__name">Краснодар</p>
            <p className="cities__name">Красноярск</p>
            <p className="cities__name">Нижний Новогород</p>
            <p className="cities__name">Новосибирск</p>
            <p className="cities__name">Омск</p>
          </div>
          <div className="cities__list">
            <p className="cities__name">Пермь</p>
            <p className="cities__name">Ростов-на-Дону</p>
            <p className="cities__name">Самара</p>
            <p className="cities__name">Сочи</p>
            <p className="cities__name">Уфа</p>
            <p className="cities__name">Челябинск</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cities;
