import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import "./LoginModal.css";

import * as auth from "../../utils/auth";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, handleRegisterComplete, handleCheckToken }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
    auth
      .authorize(values)
      .then((res) => {
        if (res) {
          handleRegisterComplete();
          history.push("/Profile");
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalWithForm
      title="Login"
      onClose={onClose}
      onSubmit={handleSubmit}
      containerClass="loginModal__container"
      buttonLabel={"Login"}
      buttonClass="loginModal__loginButton"
    >
      <label className="loginModal__emailLabel" htmlFor="email">
        Email
      </label>
      <input
        className="loginModal__emailField"
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleInputChange}
        required
      ></input>
      <label className="loginModal__passwordLabel" htmlFor="password">
        Password
      </label>
      <input
        className="loginModal__passwordField"
        placeholder="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleInputChange}
        id="password"
        required
      />

      <button
        className="loginModal__orRegisterButton"
        type="button"
        onClick={onClose}
      >
        or Register
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
