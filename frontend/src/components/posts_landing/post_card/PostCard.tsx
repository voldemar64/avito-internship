import "./PostCard.css";
import React from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

// Типы для пропсов компонента Card
interface CardProps {
  key: string;
  card: {
    _id: string;
    owner: string;
    name: string;
    url: string;
    likes: string[];
  };
  onSave: (card: any) => void;
  onCardClick: (card: any) => void;
  onCardDelete: (card: any) => void;
  onEditButtonClick: (card: any) => void;
}

const Card: React.FC<CardProps> = ({
                                     key,
                                     card,
                                     onSave,
                                     onCardClick,
                                     onCardDelete,
                                     onEditButtonClick,
                                   }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "" : "card__delete-button_hidden"}`;
  const cardEditButtonClassName = `card__edit-button${isOwn ? "" : " card__edit-button_hidden"}`;
  const cardLikeButtonClassName = `card__like-button${isLiked ? " card__like-button_active" : ""}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onSave(card);
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
          ></button>
          <div className="card__like-container">
            <button
                type="button"
                className={cardLikeButtonClassName}
                onClick={handleLikeClick}
            ></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
        <button
            className={cardDeleteButtonClassName}
            onClick={handleDeleteClick}
        ></button>
      </li>
  );
};

export default Card;
