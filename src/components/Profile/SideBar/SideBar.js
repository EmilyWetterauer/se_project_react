import React from "react";
import "./SideBar.css";

import { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const SideBar = ({
  handleEditProfileClick,
  handleInputChange,
  previousValue,
}) => {
  const { currentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const { name, avatarUrl } = currentUser;
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/Main");
  };

  return (
    <div className="sideBar__container">
      <img className="sideBar__avatar" alt="avatar">
        {avatarUrl}
      </img>
      <p className="sideBar__name">{name}</p>
      <div>
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
