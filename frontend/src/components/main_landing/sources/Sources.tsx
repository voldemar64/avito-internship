import "./Sources.css";
import React from "react";

const Sources: React.FC = () => {
  return (
      <section className="sources">
        <h2 className="sources__title">
          Экономь своё время, мы найдём лучшее для тебя!
        </h2>
        <div className="sources__content">
          <p className="sources__description">
            Расскажи мне о своем амняме мечты, и я займусь поисками в моих базах
            данных:
          </p>
          <div className="sources__list">
            <a href="https://www.cian.ru" className="sources__link">
              Циан
            </a>
            <a href="https://domclick.ru" className="sources__link">
              Домклик
            </a>
            <a href="https://www.avito.ru" className="sources__link">
              Авито
            </a>
            <a href="https://dzen.ru" className="sources__link">
              Яндекс
            </a>
          </div>
          <button className="sources__button">Начать поиск</button>
        </div>
      </section>
  );
};

export default Sources;
