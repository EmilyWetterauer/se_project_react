import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

const ClothesSection = ({
  weatherData,
  clothingItems,
  weatherType,
  onCardClick,
  children,
  onButtonClick,
}) => {
  return (
    <section className="clothesSection__container">
      <div className="clothesSectionTitle__container">
        <p className="clothesSection__title">Your items</p>
        <button className="clothesSection__addButton" onClick={onButtonClick}>
          + Add new
        </button>
      </div>
      {children}
    </section>
  );
};

export default ClothesSection;
