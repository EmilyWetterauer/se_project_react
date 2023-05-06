import React from "react";
import "./SideBar.css";

import { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const SideBar = ({
  handleEditProfileClick,
  handleInputChange,
  previousValue,
  handleLogOut,
}) => {
  const { currentUser /*setIsLoggedIn*/ } = useContext(CurrentUserContext);
  const { name, avatarUrl } = currentUser;
  let avatarInitial = " ";

  if (name) {
    avatarInitial = name.charAt(0);
  }

  const history = useHistory();

  // const handleLogOut = () => {
  //   localStorage.removeItem("jwt");
  //   setIsLoggedIn(false);
  //   history.push("/Main");
  // };

  return (
    <div className="sideBar__container">
      <div className="sideBar__avatarNameContainer">
        <div /*className="header__avatar"*/ alt="avatar">
          {avatarUrl ? (
            <img className="header__avatar" alt="avatar">
              {avatarUrl}
            </img>
          ) : (
            <div className="sideBar__avatarInitial">{avatarInitial}</div>
          )}
        </div>
        {/* <img className="sideBar__avatar" alt="avatar">
        {avatarUrl}
      </img> */}
        <p className="sideBar__name">{name}</p>
      </div>
      <div className="sideBar__buttonsContainer">
        <button
          className="sideBar__changeProfileDataButton"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sideBar__logoutButton" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
