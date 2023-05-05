// import { apiKey } from "./constants";

const token = localStorage.getItem("jwt");

export const baseUrl = "http://localhost:3001";
// "https://my-json-server.typicode.com/EmilyWetterauer/se_project_react";

export const handleServerResponse = (res) => {
  const resp = res.json();

  return res.ok ? resp : Promise.reject(`Error: ${res.status}`);
};

export const getItemList = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const addItem = ({ id, name, weather, imageUrl, ownerId }) => {
  console.log("owner inside additem fetch", ownerId);
  return fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      name,
      weather,
      imageUrl,
      ownerId,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (id) => {
  console.log("id inside removeItem", id);
  console.log("remoooovvvvee");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = () => {};

export const removeCardLike = () => {};

// export const updateUserProfile = async ({ name, avatarUrl }) => {
//   const response = await fetch(`${baseUrl}/items/me`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, avatarUrl }),
//   }).then(handleServerResponse);

// if (!response.ok) {
//   const errorMessage = `Failed to update profile data: ${response.statusText}`;
//   throw new Error(errorMessage);
// }

// const updatedUserData = await response.json();
// return updatedUserData;
// };
