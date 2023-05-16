import { baseUrl } from "../utils/api";

// fetch(`${baseUrl}/items`,

export const register = ({ email, password, name, avatar }) => {
  // return fetch("http://localhost:3001/signup", {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      // console.log(data);
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
    .then((response) => response.json())
    .then((data) => {
      // console.log("data", data.json());
      // console.log("data.token", data.token);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        // setCurrentUser({ name: data.response.name });
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
  // return fetch("http://localhost:3001/users/me", {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("data in checkToken", data);
      return data;
    });
};
