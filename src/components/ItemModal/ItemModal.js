import React, { useContext } from "react";
import "./ItemModal.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onCardDelete, id }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const { _id } = currentUser;

  let isOwn = false;
  if (card.dataset.ownerid === _id) {
    isOwn = true;
  }

  const itemDeleteButtonClassName = `itemModal__deleteButton ${
    isOwn ? "itemModal__deleteButton" : "itemModal__deleteButton_hidden"
  }`;

  React.useEffect(() => {
    document.addEventListener("keydown", onClose);

    return () => {
      document.removeEventListener("keydown", onClose);
    };
  }, [onClose]);

  return (
    <div className="itemModal__wrapper" onClick={onClose}>
      <div className="itemModal__container">
        <div className="itemModal__container">
          <div className="itemModal__closeButton" onClick={onClose}></div>
          <h2 className="itemModal__title">{card.name}</h2>
          <img
            className="itemModal__image"
            key={id}
            id={card.id}
            src={card.src}
            alt="clothing item"
          />
        </div>
        {isLoggedIn && (
          <button
            className={itemDeleteButtonClassName}
            onClick={() => {
              onCardDelete(card);
            }}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
