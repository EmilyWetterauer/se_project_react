import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/wtwrLogo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  onButtonClick,
  handleRegisterClick,
  handleLoginModalClick,
  handleCheckToken,
}) => {
  const { currentUser = {}, isLoggedIn } = useContext(CurrentUserContext);

  const { name, avatar } = currentUser;
  let avatarInitial = " ";

  if (name) {
    avatarInitial = name.charAt(0);
  }

  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAuthorizedUsers = () => {
    return (
      <header className="header">
        <div className="header__leftSideContainer">
          <Link to="/Main">
            <img src={logo} alt="logo" className="header__logo" />
          </Link>
          <p className="header__dateCity">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <nav className="navigation__container">
          <ToggleSwitch />
          <button onClick={onButtonClick} className="navigation__button">
            + Add Clothes
          </button>

          <Link to="/Profile">
            {" "}
            <div className="header__name" style={{ textDecoration: "none" }}>
              {name}
            </div>
          </Link>
          <div alt="avatar" onClick={handleCheckToken}>
            <Link to="/Profile">
              <div className="header__avatarContainer">
                {avatar ? (
                  <img className="header__avatar" alt="avatar" src={avatar} />
                ) : (
                  <div className="header__avatarInitial">{avatarInitial}</div>
                )}
              </div>
            </Link>
          </div>
        </nav>
      </header>
    );
  };

  const renderNonAuthorizedUsers = () => {
    return (
      <header className="header">
        <div className="header__leftSideContainer">
          <Link to="/Main">
            <img src={logo} alt="logo" className="header__logo" />
          </Link>
          <p className="header__dateCity">
            {currentDate}, {weatherData.city}
          </p>
        </div>
        <nav className="navigation__container">
          <ToggleSwitch />
          <button onClick={onButtonClick} className="navigation__button">
            + Add Clothes
          </button>
          <div onClick={handleRegisterClick} className="navigation__signUp">
            Sign Up
          </div>
          <div onClick={handleLoginModalClick} className="navigation__signIn">
            Sign In
          </div>
        </nav>
      </header>
    );
  };
  return (
    <header>
      {isLoggedIn ? renderAuthorizedUsers() : renderNonAuthorizedUsers()}
    </header>
  );
};

export default Header;
