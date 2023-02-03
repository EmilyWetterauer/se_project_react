import { apiKey } from "./constants";

export const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  const resp = res.json();

  return res.ok ? resp : Promise.reject(`Error: ${res.status}`);
};

export const getItemList = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleServerResponse)
    .catch((error) => {
      console.error(error);
    });
};

export const addItem = ({ id, name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      weather,
      imageUrl,
    }),
  }).then(handleServerResponse);
  // .catch((error) => {
  //   console.error(error);
  // });
};

export const removeItem = (id) => {
  return fetch(`${baseUrl}/items${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleServerResponse)
    .catch((error) => {
      console.error(error);
    });
};
