import React from "react";
import "./ItemModal.css";
import closeButtonImagePath from "../../images/closeButtonImage.png";

function ItemModal({ card, onClose }) {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="itemModal__wrapper" onClick={onClose}>
      <div className="itemModal__container">
        <div
          className="itemModal__closeButton"
          src={closeButtonImagePath}
          onClick={onClose}
        ></div>
        <h2 className="itemModal__title">{card.name}</h2>
        <img className="itemModal__image" src={card.src} />
      </div>
    </div>
  );
}

export default ItemModal;
