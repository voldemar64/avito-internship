import React from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Card({ key, card, onCardClick, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = card.owner === currentUser._id
    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`

    function handleClick() {
        onCardClick(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card" key={key}  >
            <img src={card.link} alt={card.name} className="card__photo" onClick={handleClick}/>
            <div className="card__description">
                <h2 className="card__heading">{card.name}</h2>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </li>
    )
}

export default Card;