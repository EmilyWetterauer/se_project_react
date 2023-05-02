import React, { useState } from "react";

import { Link, BrowserRouter, Route, useHistory } from "react-router-dom";

import "./RegisterModal.css";

// import { useForm } from "../../utils/customHooks";

// import { register } from "../../../auth";

import * as auth from "../../utils/auth";

const RegisterModal = ({ onClose, handleRegisterComplete, login }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatarURL: "",
  });
  // const { values, handleChange } = useForm({
  //   Email: "",
  //   Password: "",
  //   name: "",
  //   avatarURL: "",
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values) {
      auth
        .register(values)
        .then((res) => {
          handleRegisterComplete();
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
    <BrowserRouter>
      <div className="registerModal__wrapper" onClick={onClose}>
        {/* <div className="registerModal__container"> */}
        <div className="registerModal__container">
          <div className="registerModal__closeButton" onClick={onClose}></div>
          <h2 className="registerModal__title">Sign Up</h2>
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

          <div
            className="registerModal__nextButton"
            type="submit"
            // onClick={(handleSubmit, handleRegisterComplete)}
            onClick={handleSubmit}
          >
            <Link to="/Profile">Next</Link>
          </div>

          <button
            className="registerModal__loginButton"
            type="submit"
            onClick={onClose}
          >
            Log In
          </button>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default RegisterModal;
