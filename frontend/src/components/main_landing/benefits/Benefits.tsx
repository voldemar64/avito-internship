import "./Benefits.css";
import React from "react";
import stickerFunnyPath from "../../../images/funny_sticker.svg";
import stickerWhatPath from "../../../images/what_sticker.svg";
import stickerLovePath from "../../../images/love_sticker.svg";

const Benefits: React.FC = () => {
  return (
    <section className="benefits">
      <div className="benefits__item">
        <img
          className="benefits__image"
          src={stickerFunnyPath}
          alt="smiling sticker"
        />
        <h3 className="benefits__title">Первым на просмотре</h3>
        <p className="benefits__description">
          Классные предложения разбирают за 15 минут. Мой бекенд добавляет новые
          варианты мгновенно, чтобы ты успел лайкнуть, дальше дело за тобой.
        </p>
      </div>
      <div className="benefits__item">
        <img
          className="benefits__image"
          src={stickerWhatPath}
          alt="smiling sticker"
        />
        <h3 className="benefits__title">Купить без посредников</h3>
        <p className="benefits__description">
          Никаких сомнительных продавцов. На SiteScout продают только
          собственники, лишних коммиссий и посредников нет.
        </p>
      </div>
      <div className="benefits__item">
        <img
          className="benefits__image"
          src={stickerLovePath}
          alt="smiling sticker"
        />
        <h3 className="benefits__title">Найдешь что угодно</h3>
        <p className="benefits__description">
          Мы предоставляем широкий выбор в разных категориях товаров и услуг,
          чтобы Вы смогли найти то, что нужно именно Вам.
        </p>
      </div>
    </section>
  );
};

export default Benefits;
