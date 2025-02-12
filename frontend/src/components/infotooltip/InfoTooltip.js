import "./InfoTooltip.css";
import React from "react";

function InfoTooltip(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      const timer = setTimeout(() => {
        props.onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [props.isOpen, props.onClose]);

  return (
    <article
      className={`popup${props.isOpen ? ` popup_opened popup_auto-close` : ""}`}
      onClick={props.onOverlayClick}
    >
      <div className="popup__container">
        <img src={props.photo} alt="Картинка" className="popup__photo" />
        <h2 className="popup__title popup__title_info">{props.title}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
      </div>
    </article>
  );
}

export default InfoTooltip;
