import "./AboutMe.css";
import React from "react";
import avatarPath from "../../../images/avatar.jpg";

const AboutMe: React.FC = () => {
    return (
        <section className="about-me">
            <div className="about-me__content">
                <p className="about-me__text">
                    Наша миссия – экономить время и внимание людей, улучшая при этом
                    качество выбора услуг и товаров. Чтобы вместо рутины поисков можно
                    было заниматься важными делами, получая при этом лучшие варианты.
                </p>
                <p className="about-me__text">
                    SiteScout суммарно уже помог сотням тысяч своих пользователей
                    сохранить времени на две-три полных человеческих жизни. Дальше будет
                    больше.
                </p>
            </div>
            <div className="about-me__info">
                <img className="info__image" src={avatarPath} alt="avatar photo" />
                <h4 className="info__name">Voldemar</h4>
                <p className="info__description">Основатель SiteScout</p>
            </div>
        </section>
    );
};

export default AboutMe;
