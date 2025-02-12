import "./PostCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

function PostCard({ key, card}) {
    const pathName = useLocation();

    const hoursNumber = Math.floor(card.duration / 60);
    const minutesNumber = card.duration % 60;
    let hours;
    let minutes;

    if (hoursNumber === 1) {
        hours = String(hoursNumber) + ' час'
    } else if (hoursNumber > 1 && hoursNumber < 5) {
        hours = String(hoursNumber) + ' часа'
    } else if (hoursNumber >= 5) {
        hours = String(hoursNumber) + ' часов'
    } else {
        hours = ''
    }

    if (minutesNumber % 10 === 1) {
        minutes = String(minutesNumber) + ' минута'
    } else if (minutesNumber % 10 > 1 && minutesNumber % 10 < 5) {
        minutes = String(minutesNumber) + ' минуты'
    } else if (minutesNumber % 10 >= 5) {
        minutes = String(minutesNumber) + ' минут'
    } else {
        minutes = ''
    }

    return(
        <li className="card" key={key}>
            <div className="card__container">
                <p className="card__title">
                    {card.name}
                </p>
                <p className="card__duration">
                    {(hours!=='' && minutes!=='') ? hours + ' ' + minutes : hours + minutes}
                </p>
            </div>
            <a className="card__link" rel="noreferrer" target="_blank"
               href={card.trailerLink}>
                <img className="card__image" alt={card.name}
                     src={pathName.pathname === "/movies" ? `https://api.nomoreparties.co${card.image.url}` : card.image}/>
            </a>
        </li>
    )
}

export default PostCard;