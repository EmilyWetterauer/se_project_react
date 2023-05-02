import React from "react";
import "./Header.css";
import logo from "../../images/wtwrLogo.png";
import avatarDefault from "../../images/Ellipse.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({
  weatherData,
  onButtonClick,
  handleRegisterClick,
  handleLoginClick,
}) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const signUp = "Sign Up";
  const signIn = "Sign In";
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
        <div onClick={handleRegisterClick} className="navigation__signUp">
          Sign Up
        </div>
        <div onClick={handleLoginClick} className="navigation__signIn">
          Sign In
        </div>
        {/* <Link className="header__profileLink" to="/profile">
          <div className="navigation__signUp">{signUp}</div>
        </Link>
        <div className="navigation__signIn">{signIn}</div> */}
        {/* <img className="header__avatar" alt="avatar"></img> */}
        {/* </div> */}
      </nav>
    </header>
  );
};

export default Header;
