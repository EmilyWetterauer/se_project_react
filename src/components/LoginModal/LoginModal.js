import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import "./LoginModal.css";

import * as auth from "../../utils/auth";

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
          // console.log("res in handleSubmit", res);
          handleRegisterComplete();
          history.push("/Profile");
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginModal__wrapper" onClick={onClose}>
        <div className="loginModal__container">
          <div className="loginModal__closeButton" onClick={onClose}></div>
          <h2 className="loginModal__title">Login</h2>
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
          />

          <button
            className="loginModal__loginButton"
            type="submit"
            onClick={handleCheckToken}
          >
            Login
          </button>

          <button
            className="loginModal__orRegisterButton"
            type="submit"
            onClick={onClose}
          >
            or Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
