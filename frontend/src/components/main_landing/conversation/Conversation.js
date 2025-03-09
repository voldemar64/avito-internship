import "./Conversation.css";
import React from "react";
import botIconPath from "../../../images/wink_sticker.svg";

function Conversation() {
  return (
    <section className="conversation">
      <div className="conversation__content">
        <h3 className="conversation__title">Алгоритм нашей дружбы прост</h3>
        <ul className="conversation__chat">
          <li className="chat__item chat__item_me">
            <p className="chat__message">Окей, бро, как начать поиск?</p>
            <p className="chat__icon chat__icon_me">Я</p>
          </li>
          <li className="chat__item chat__item_bot">
            <p className="chat__message">
              Настрой фильтр и я покажу все подходящие объявления
            </p>
            <img
              className="chat__icon chat__icon_bot"
              src={botIconPath}
              alt="bot icon"
            />
          </li>
          <li className="chat__item chat__item_me">
            <p className="chat__message">Ага, а потом?</p>
            <p className="chat__icon chat__icon_me">Я</p>
          </li>
          <li className="chat__item chat__item_bot">
            <p className="chat__message">
              Затем введи название, и я начну поиск
            </p>
            <img
              className="chat__icon chat__icon_bot"
              src={botIconPath}
              alt="bot icon"
            />
          </li>
          <li className="chat__item chat__item_bot">
            <p className="chat__message">
              Выбирай то, что нравится тебе больше и переходи на страницу с
              полной информацией
            </p>
            <div className="chat__icon chat__icon_bot"></div>
          </li>
          <li className="chat__item chat__item_me">
            <p className="chat__message">Понял, спасибо!</p>
            <p className="chat__icon chat__icon_me">Я</p>
          </li>
          <li className="chat__item chat__item_bot">
            <p className="chat__message">
              Только не забывай, крутые варианты разбирают очень быстро!
            </p>
            <img
              className="chat__icon chat__icon_bot"
              src={botIconPath}
              alt="bot icon"
            />
          </li>
        </ul>
        <button className="conversation__button">Поехали!</button>
      </div>
    </section>
  );
}

export default Conversation;
