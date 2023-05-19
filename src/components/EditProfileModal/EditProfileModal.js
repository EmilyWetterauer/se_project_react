import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import "./EditProfileModal.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  onClose,
  handleRegisterComplete,
  handleCheckToken,
}) => {
  const history = useHistory();
  const { currentUser = {} } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser;
  const [values, setValues] = useState({
    name,
    avatar,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .updateUserProfile(values)
      .then((res) => {
        if (res) {
          handleRegisterComplete(res.data);
          history.push("/Profile");
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <ModalWithForm
      title="Change profile data"
      buttonLabel={"Save Changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass="editProfileModal__saveChangesButton"
      containerClass="editProfileModal__container"
    >
      <label className="editProfileModal__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="editProfileModal__nameField"
        type="text"
        onChange={handleInputChange}
        placeholder="name"
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
    </ModalWithForm>
  );
};

export default EditProfileModal;
