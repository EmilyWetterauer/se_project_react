import React from "react";
import "./SideBar.css";

import { useState } from "react";

import { useHistory } from "react-router-dom";

const SideBar = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/Main");
  };

  return (
    <div className="sideBar__container">
      <img className="sideBar__avatar" alt="avatar"></img>
      <p className="sideBar__name">Emma Wetterauer</p>
      <div>
        <button className="sideBar__changeProfileDataButton">
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
