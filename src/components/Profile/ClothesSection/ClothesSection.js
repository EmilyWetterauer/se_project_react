import React, { useContext } from "react";
import "./ClothesSection.css";
// import ItemCard from "../../ItemCard/ItemCard";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const ClothesSection = ({
  // weatherData,
  // clothingItems,
  // weatherType,
  // onCardClick,
  children,
  onButtonClick,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  // console.log("currentUser inside of CLOTHES SECTION", currentUser);

  return (
    <section className="clothesSection__container">
      <div className="clothesSectionTitle__container">
        <p className="clothesSection__title">Your items</p>
        <button className="clothesSection__addButton" onClick={onButtonClick}>
          + Add new
        </button>
      </div>
      {currentUser && children}
    </section>
  );
};

export default ClothesSection;
