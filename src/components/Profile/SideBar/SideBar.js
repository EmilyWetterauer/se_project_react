import React from "react";
import "./SideBar.css";

import { useContext } from "react";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const SideBar = ({
  handleEditProfileClick,
  handleInputChange,
  previousValue,
  handleLogOut,
}) => {
  const { currentUser = {} } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser;
  let avatarInitial = " ";

  if (name) {
    avatarInitial = name.charAt(0);
  }

  return (
    <div className="sideBar__container">
      <div className="sideBar__avatarNameContainer">
        <div className="sideBar__avatarContainer" alt="avatar">
          {avatar ? (
            <div className="sideBar__avatar">
              <img alt="avatar" src={avatar}></img>
            </div>
          ) : (
            <div className="sideBar__avatarInitial">{avatarInitial}</div>
          )}
        </div>

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
