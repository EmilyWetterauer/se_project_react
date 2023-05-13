import React, { useContext } from "react";
import "./ItemCard.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({
  name,
  imageUrl,
  id,
  owner,
  onCardClick,
  handleLikeClick,
  likes = [],
}) {
  const { currentUser = {}, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = likes.some((user) => user === currentUser._id);

  const itemCardsLikeButtonClassName = isLiked
    ? "itemCard__likeButtonClicked"
    : "itemCard__likeButton";

  const handleLike = (event) => {
    handleLikeClick({ id, isLiked, user: currentUser });
  };
  return (
    <div className="itemCard__container">
      <div className="itemCard__titleButtonContainer">
        <div>
          <h2 className="itemCard__title">{name}</h2>
        </div>
        {isLoggedIn && (
          <div
            onClick={handleLike}
            className={itemCardsLikeButtonClassName}
          ></div>
        )}
      </div>
      <img
        className="itemCard__image"
        name={name}
        id={id}
        src={imageUrl}
        alt={name}
        data-ownerid={owner}
        onClick={onCardClick}
      />
    </div>
  );
}

export default ItemCard;
