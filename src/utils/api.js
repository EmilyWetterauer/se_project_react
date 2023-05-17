const getToken = () => {
  return localStorage.getItem("jwt");
};
export const baseUrl = "http://localhost:3001";
// export const baseUrl =
//   "https://my-json-server.typicode.com/EmilyWetterauer/se_project_react";

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
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
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
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = ({ id }) => {
  console.log("getToken() inside addCardLike", getToken());
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const removeCardLike = ({ id }) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  // const response = fetch(`${baseUrl}/users/me`, {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);

  // if (!response.ok) {
  //   const errorMessage = `Failed to update profile data: ${response.statusText}`;
  //   throw new Error(errorMessage);
  // }

  // const updatedUserData = response.json();
  // return updatedUserData;
};
