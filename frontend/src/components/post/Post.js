import React from "react";
import "./Post.css";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";

function Post({ post, onCardDelete, onEditButtonClick }) {
  const currentUser = React.useContext(CurrentUserContext)
  const navigate = useNavigate();

  const isOwn = post.owner === currentUser._id
  const cardDeleteButtonClassName = `post__delete-button ${isOwn ? '' : 'post__delete-button_hidden'}`
  const cardEditButtonClassName = `post__edit-button${isOwn ? '' : ' post__edit-button_hidden'}`;

  function handleEditButtonClick() {
    onEditButtonClick(post)
  }

  function handleDeleteClick() {
    navigate("/list")
    onCardDelete(post)
  }

  const renderRealEstateDetails = () => (
    <>
      <p className="post__text">Тип недвижимости: {post.propertyType}</p>
      <p className="post__text">Площадь: {post.area} м²</p>
      <p className="post__text">Комнат: {post.rooms}</p>
      <p className="post__text">Цена: {post.price} ₽</p>
    </>
  );

  const renderAutoDetails = () => (
    <>
      <p className="post__text">Марка: {post.brand}</p>
      <p className="post__text">Модель: {post.model}</p>
      <p className="post__text">Год выпуска: {post.year}</p>
      <p className="post__text">Пробег: {post.mileage} км</p>
    </>
  );

  const renderServicesDetails = () => (
    <>
      <p className="post__text">Тип услуги: {post.serviceType}</p>
      <p className="post__text">Опыт: {post.experience} лет</p>
      <p className="post__text">Стоимость: {post.cost} ₽</p>
      <p className="post__text">Расписание: {post.schedule}</p>
    </>
  );

  const renderDetailsByType = () => {
    switch (post.type) {
      case "Недвижимость":
        return renderRealEstateDetails();
      case "Авто":
        return renderAutoDetails();
      case "Услуги":
        return renderServicesDetails();
      default:
        return null;
    }
  };

  return (
    <section className="post">
      <img src={post.url} alt={post.name} className="post__image" />
      <div className="post__container">
        <div className="post__description">
          <h2 className="post__heading">{post.name}</h2>
          <p className="post__text">Описание: {post.description}</p>
          <p className="post__text">Местоположение: {post.location}</p>
          <>{renderDetailsByType()}</>
        </div>
        <div className="post__buttons-container">
          <button type="button" className={cardEditButtonClassName} onClick={handleEditButtonClick}>Изменить</button>
          <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </div>
      </div>
    </section>
  );
}

export default Post;