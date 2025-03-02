import "./PostCard.css";
import React from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Card({
  key,
  card,
  onSave,
  onCardClick,
  onCardDelete,
  onEditButtonClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "" : "card__delete-button_hidden"}`;
  const cardEditButtonClassName = `card__edit-button${isOwn ? "" : " card__edit-button_hidden"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleEditButtonClick() {
    onEditButtonClick(card);
  }

  return (
    <li className="card" key={key}>
      <img
        src={card.url}
        alt={card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__heading">{card.name}</h2>
        <button
          type="button"
          className={cardEditButtonClassName}
          onClick={handleEditButtonClick}
        >
          Изменить
        </button>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
