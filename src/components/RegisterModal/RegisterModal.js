import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import "./RegisterModal.css";

import * as auth from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, handleRegisterComplete }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values) {
      auth
        .register(values)
        .then((res) => {
          auth.authorize({ email: values.email, password: values.password });
          handleRegisterComplete(res.data);
          history.push("/Profile");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <ModalWithForm
      title="Sign Up"
      buttonLabel="Next"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={"registerModal__nextButton"}
    >
      <label className="registerModal__emailLabel" htmlFor="email">
        Email
      </label>
      <input
        className="registerModal__emailField"
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        required
      />
      <label className="registerModal__passwordLabel" htmlFor="password">
        Password
      </label>
      <input
        className="registerModal__passwordField"
        placeholder="Password"
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
        value={values.password}
      />

      <label className="registerModal__nameLabel" htmlFor="email">
        Name
      </label>
      <input
        className="registerModal__nameField"
        placeholder="Name"
        type="text"
        id="text"
        name="name"
        onChange={handleChange}
        value={values.name}
        required
      />
      <label className="registerModal__avatarUrlLabel" htmlFor="avatar">
        Avatar URL
      </label>
      <input
        className="registerModal__avatarUrlField"
        placeholder="Avatar URL"
        type="url"
        id="avatar"
        name="avatar"
        onChange={handleChange}
        value={values.avatar}
      />

      <button
        className="registerModal__loginButton"
        type="button"
        onClick={onClose}
      >
        Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
