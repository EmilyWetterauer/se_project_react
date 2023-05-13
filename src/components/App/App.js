import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import { location } from "../../utils/constants";
import { apiKey } from "../../utils/constants";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Redirect, useHistory } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItemList, addItem, removeItem } from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

const App = () => {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleCheckToken = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          // console.log("checkToken res:", res);
          if (res) {
            setCurrentUser(res.data);
            setIsLoggedIn(true);

            history.push("/Profile");
          }
        })
        .catch((error) => {
          console.error("Error in handleCheckToken: ", error);
        });
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, [isLoggedIn]);

  useEffect(() => {
    getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (evt) => {
    setSelectedCard(evt.target);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("create");
  };

  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
  };

  const closeAllModals = (evt) => {
    if (
      evt.key === "Escape" ||
      (evt.target === evt.currentTarget && evt.type === "click")
    ) {
      return setActiveModal("");
    }
  };

  const onAddItem = (name, imageUrl, weather) => {
    setIsOpen(true);
    const id = clothingItems.length;

    addItem({ id, name, weather, imageUrl, ownerId: currentUser._id })
      .then((res) => {
        getItemList()
          .then((items) => {
            setClothingItems(items);
          })
          .catch((err) => console.log(err));
        handleAddItemSubmit(res);
        setActiveModal("");
        setIsOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveItem = (card) => {
    // console.log("card inside handleRemoveItem", card);
    setIsOpen(true);
    removeItem(card.id)
      .then((res) => {
        if (res) {
          getItemList()
            .then((items) => {
              setClothingItems(items);
            })
            .catch((err) => console.log(err));
          setClothingItems((cards) =>
            cards.filter((c) => {
              return c.id + "" !== card.id;
            })
          );
          setActiveModal("");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const weatherType = (actualWeather) => {
    let actualWeatherNumber = Number(actualWeather.slice(0, -2));
    if (actualWeatherNumber >= 86) {
      return "hot";
    } else if (actualWeatherNumber >= 66 && actualWeatherNumber <= 85) {
      return "warm";
    } else if (actualWeatherNumber <= 65) {
      return "cold";
    }
  };

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          console.log(
            "filterDatafromweatherAPI",
            filterDataFromWeatherAPI(data)
          );
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleRegisterComplete = () => {
    setActiveModal("");
    setIsLoggedIn(true);
  };

  const handleLoginModalClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    // console.log("herrreeee edit profile");
    setActiveModal("editProfile");
  };

  const handleLikeClick = ({ id, isLiked, user }) => {
    console.log("id inside handleLikeClick", id);
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike({ id: id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((c) => (c._id === id ? updatedCard.data : c));
            });
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ id: id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/Main");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="pageWrapper">
            <BrowserRouter>
              <Header
                weatherData={weatherData}
                onButtonClick={handleAddClick}
                handleRegisterClick={handleRegisterClick}
                handleLoginModalClick={handleLoginModalClick}
                handleCheckToken={handleCheckToken}
              />
              <Route path="/Main">
                <Main
                  weatherData={weatherData}
                  cards={clothingItems}
                  onCardClick={handleCardClick}
                  weatherType={weatherType}
                  handleLikeClick={handleLikeClick}
                  card={selectedCard}
                >
                  {clothingItems

                    .filter((item) => {
                      if (
                        weatherData.temperature &&
                        item.weather === weatherType(weatherData.temperature.F)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((item, index) => {
                      console.log("itemMap", item);
                      return (
                        <ItemCard
                          name={item.name}
                          imageUrl={item.imageUrl}
                          key={index}
                          id={item._id}
                          onCardClick={handleCardClick}
                          handleLikeClick={handleLikeClick}
                          owner={item.owner}
                          card={selectedCard}
                        />
                      );
                    })}
                </Main>
              </Route>

              <ProtectedRoute isLoggedIn={isLoggedIn} path="/Profile">
                <Profile
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  weatherType={weatherType}
                  onCardClick={handleCardClick}
                  onButtonClick={handleAddClick}
                  onCardDelete={handleRemoveItem}
                  handleEditProfileClick={handleEditProfileClick}
                  handleLogOut={handleLogOut}
                  handleLikeClick={handleLikeClick}
                >
                  {clothingItems
                    .filter((item) => {
                      if (
                        weatherData.temperature &&
                        item.weather === weatherType(weatherData.temperature.F)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((item, index) => {
                      return (
                        <ItemCard
                          name={item.name}
                          imageUrl={item.imageUrl}
                          key={index}
                          id={item._id}
                          onCardClick={handleCardClick}
                          owner={item.owner}
                          handleLikeClick={handleLikeClick}
                          likes={item.likes}
                        />
                      );
                    })}
                </Profile>
              </ProtectedRoute>
              <Route path="/">
                {isLoggedIn ? (
                  <Redirect to="/Profile" />
                ) : (
                  <Redirect to="/Main" />
                )}
              </Route>

              <Footer />
              {activeModal === "create" && (
                <AddItemModal
                  isOpen={isOpen}
                  onAddItem={onAddItem}
                  onCloseModal={closeAllModals}
                ></AddItemModal>
              )}
              {activeModal === "preview" && (
                <ItemModal
                  card={selectedCard}
                  onClose={closeAllModals}
                  onCardDelete={handleRemoveItem}
                />
              )}
              {activeModal === "register" && (
                <RegisterModal
                  onClose={closeAllModals}
                  handleRegisterComplete={handleRegisterComplete}
                />
              )}
              {activeModal === "login" && (
                <LoginModal
                  onClose={closeAllModals}
                  handleCheckToken={handleCheckToken}
                  handleRegisterComplete={handleRegisterComplete}
                />
              )}
              {activeModal === "editProfile" && (
                <EditProfileModal
                  onClose={closeAllModals}
                  handleCheckToken={handleCheckToken}
                  handleRegisterComplete={handleRegisterComplete}
                />
              )}
            </BrowserRouter>
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
