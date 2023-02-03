import React from "react";
import "./Header.css";
import logo from "../../images/wtwrLogo.png";
import avatarDefault from "../../images/Ellipse.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ weatherData, onButtonClick }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const name = "Emma Wetterauer";
  const avatar = "";
  return (
    <header className="header">
      {/* <div className="header__container"> */}
      <div className="header__leftSideContainer">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <p className="header__dateCity">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <nav className="navigation__container">
        {/* <div className="navigation__container"> */}
        <ToggleSwitch />
        <button onClick={onButtonClick} className="navigation__button">
          + Add Clothes
        </button>

        <Link className="header__profileLink" to="/profile">
          <div className="navigation__name">{name}</div>
        </Link>
        <img className="header__avatar" alt="avatar"></img>
        {/* </div> */}
      </nav>
    </header>
  );
};

export default Header;
