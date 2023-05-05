import React, { useContext } from "react";
import "./ItemModal.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onCardDelete, id }) {
  const { isLoggedIn, handleIsLoggedIn, currentUser } = useContext(
    CurrentUserContext
  );

  const { name, avatarUrl, _id } = currentUser;
  console.log("currentUser in ItemModal", currentUser);
  console.log("card in ItemModal", card);
  console.log(card.dataset.ownerid);
  console.log("_id in item modal", _id);
  // const isOwn = card.owner._id === _id;
  // const isOwn = card.owner?._id === _id;
  let isOwn = false;
  if (card.dataset.ownerid === _id) {
    isOwn = true;
  }

  // Creating a variable which you'll then set in `className` for the delete button
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
            alt="clothing image"
            // data-ownerid={card.owner}
          />
        </div>
        <button
          className={itemDeleteButtonClassName}
          onClick={() => {
            onCardDelete(card);
          }}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
