import React, { useContext, useState } from "react";
import "./ItemCard.css";
import tShirtPath from "../../images/tShirt.jpg";
import shortsPath from "../../images/shorts.jpg";
import capPath from "../../images/cap.jpg";
import sneakersPath from "../../images/sneakers.jpg";

import { useForm } from "../../utils/customHooks";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({
  name,
  imageUrl,
  id,
  owner,
  onCardClick,
  handleLikeClick,
  card,
}) {
  // console.log("id in ItemCard", id);

  // function useForm(inputValues) {
  //   const [values, setValues] = useState(inputValues);

  //   const handleChange = (event) => {
  //     const { value, name, isLiked, user } = event.target;
  //     setValues({ ...values, [name]: value });
  //   };
  //   return { values, handleChange, setValues };
  // }

  const { isLoggedIn, handleIsLoggedIn, currentUser } = useContext(
    CurrentUserContext
  );

  const { avatarUrl, _id } = currentUser;
  // console.log("currentUser in ItemCard", currentUser);
  // console.log("card in ItemCard", card);
  // console.log(card.dataset.ownerid);

  let isOwn = false;
  if (currentUser === _id) {
    // if (card.dataset.ownerid === _id) {
    isOwn = true;
  }

  // const isLiked = item.likes.some((user) => user._id === currentUser._id);

  const itemCardsLikeButtonClassName = isOwn
    ? "itemCard__likeButtonClicked"
    : "itemCard__likeButton";

  const handleLike = (event) => {
    console.log("consoleInsideHandleLikeClickItemCard");
    // event.stopPropagation();
    handleLikeClick({ event });
  };
  return (
    // <div className="itemCards__container">
    <div className="itemCard__container" /*onClick={onCardClick}*/>
      <div className="itemCard__titleButtonContainer">
        <div>
          <h2 className="itemCard__title">{name}</h2>
        </div>
        <div
          onClick={handleLike}
          className={itemCardsLikeButtonClassName}
        ></div>
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
    // </div>
  );
}

export default ItemCard;
