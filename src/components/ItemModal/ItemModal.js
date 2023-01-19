import React from "react";
import "./ItemModal.css";
// import closeButtonImagePath from "../../images/closeButtonImage.png";

function ItemModal({ card, onClose }) {
  React.useEffect(() => {
    document.addEventListener("keydown", onClose);

    return () => {
      document.removeEventListener("keydown", onClose);
    };
  }, [onClose]);

  return (
    <div className="itemModal__wrapper" onClick={onClose}>
      <div className="itemModal__container">
        <div className="itemModal__closeButton" onClick={onClose}></div>
        <h2 className="itemModal__title">{card.name}</h2>
        <img className="itemModal__image" src={card.src} alt="clothing image" />
      </div>
    </div>
  );
}

export default ItemModal;
