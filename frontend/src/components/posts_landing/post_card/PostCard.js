import React from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Card({ key, card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = card.owner === currentUser._id
    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `${isLiked ? 'card__like-button card__like-button_liked' : 'card__like-button'}`;

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card" key={key}  >
            <img src={card.link} alt={card.name} className="card__photo" onClick={handleClick}/>
            <div className="card__description">
                <h2 className="card__heading">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </li>
    )
}

export default Card;