import { baseUrl, handleServerResponse } from "../utils/api";

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(handleServerResponse)
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};

export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleServerResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data.token;
      }
    })
    .catch((err) => console.log(err));
};

export const getToken = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }
  return token;
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleServerResponse)
    .then((data) => {
      return data;
    });
};
