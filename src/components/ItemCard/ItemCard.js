import React from "react";
import "./ItemCard.css";
import tShirtPath from "../../images/tShirt.jpg";
import shortsPath from "../../images/shorts.jpg";
import capPath from "../../images/cap.jpg";
import sneakersPath from "../../images/sneakers.jpg";

function ItemCard({ name, imageUrl, id, owner, onCardClick, onCardLike }) {
  console.log("id in ItemCard", id);
  const handleLikeClick = () => {
    onCardLike();
  };
  return (
    <div className="itemCards__container">
      <div className="itemCard__container" onClick={onCardClick}>
        <div className="itemCard__titleButtonContainer">
          <div>
            <h2 className="itemCard__title">{name}</h2>
          </div>
          <button
            className="itemCard__likeButton" /*"itemCard__likeButtonClicked"*/
          ></button>
        </div>
        <img
          className="itemCard__image"
          name={name}
          id={id}
          src={imageUrl}
          alt={name}
          data-ownerid={owner}
        />
      </div>
    </div>
  );
}

export default ItemCard;
