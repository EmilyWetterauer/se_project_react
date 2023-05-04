import React from "react";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

import "./Profile.css";
// import { filterDataFromWeatherAPI } from "../../utils/weatherApi";
// import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Profile = ({
  weatherData,
  clothingItems,
  weatherType,
  onCardClick,
  children,
  onCardDelete,
  onButtonClick,
  handleEditProfileClick,
  handleInputChange,
  previousValue,
}) => {
  console.log("profile");
  return (
    <div className="profile__container">
      <section>
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          // handleInputChange={handleInputChange}
        ></SideBar>
      </section>
      <ClothesSection
        className="profile__addClothesContainer"
        weatherData={weatherData}
        clothingItems={clothingItems}
        weatherType={weatherType}
        onCardClick={onCardClick}
        onCardDelete={onCardDelete}
        onButtonClick={onButtonClick}
      >
        <div className="profile__clothesItemsContainer">
          <ul className="main__items" style={{ width: "1200px" }}>
            {children}
          </ul>
        </div>
      </ClothesSection>
    </div>
  );
};

export default Profile;
