import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import "./EditProfileModal.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser;
  const [values, setValues] = useState({
    name,
    avatar,
  });
  //   console.log("currentUser in editProfilModal", currentUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <form /*onSubmit={}*/>
      <div className="editProfileModal__wrapper" onClick={onClose}>
        <div className="editProfileModal__container">
          <div
            className="editProfileModal__closeButton"
            onClick={onClose}
          ></div>
          <h2 className="editProfileModal__title">Change profile data</h2>
          <label className="editProfileModal__nameLabel" htmlFor="name">
            Name
          </label>
          <input
            className="editProfileModal__nameField"
            type="text"
            onChange={handleInputChange}
            placeholder="name"
            type="text"
            id="name"
            name="name"
            value={values.name}
            required
          ></input>
          <label className="editProfileModal__avatarUrlLabel" htmlFor="avatar">
            Avatar
          </label>
          <input
            className="editProfileModal__avatarUrlField"
            placeholder="avatarUrl"
            type="text"
            name="avatar"
            value={values.avatar}
            onChange={handleInputChange}
            id="avatar"
            required
          />

          <button className="editProfileModal__saveChangesButton" type="submit">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileModal;
