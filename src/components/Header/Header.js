import React from "react";
import "./Header.css";
import logo from "../../images/wtwrLogo.png";
import avatarDefault from "../../images/Ellipse 18 copy.jpg";

const Header = ({ weatherData, onButtonClick }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const name = "Emma";
  const avatar = "";
  return (
    <header className="header">
      {/* <div className="header__container"> */}
      <div className="header__leftSideContainer">
        <img src={logo} alt="logo" className="header__logo" />
        <p className="header__dateCity">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      {/* <div className="header__nav"> */}
      <nav className="navigation">
        <div className="navigation__container">
          <button onClick={onButtonClick} className="navigation__button">
            + Add Clothes
          </button>
          <div className="navigation__name">
            {name}
            {/* {avatar ? (
                <img
                  className="navigation__user"
                  src={avatar || avatarDefault}
                  alt="user avatar"
                />
              ) : (
                <span className="navigation__user navigation__user_type_none">
                  {/* {username?.toUpperCase().charAt(0) || ""} */}
            {/* </span> */}
            {/* )} */}
          </div>
          <img className="header__avatar" alt="avatar"></img>
        </div>
      </nav>
      {/* </div> */}
      {/* </div> */}
    </header>
  );
};

export default Header;
