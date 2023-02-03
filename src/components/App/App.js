import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import { location } from "../../utils/constants";
import { apiKey } from "../../utils/constants";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItem, removeItem } from "../../utils/api.js";
// import { React } from "globalthis/implementation";

const uuid = require("uuid/v4");

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (evt) => {
    setSelectedCard(evt.target);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setClicked(true);
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

  const handleRemoveItem = (card) => {
    setIsOpen(true);
    removeItem(card.id).then((res) => {
      if (res) {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        closeAllModals();
      }
      // setIsOpen(false);
    });
  };

  const onAddItem = (name, imageUrl, weather) => {
    const id = uuid();

    addItem({ id, name, weather, imageUrl }).then((res) => {
      handleAddItemSubmit(res);
      setActiveModal("");
    });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const weatherType = (actualWeather) => {
    let actualWeatherNumber = Number(actualWeather.slice(0, -2));
    console.log("new str", actualWeatherNumber);
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
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="pageWrapper">
          <BrowserRouter>
            <Header weatherData={weatherData} onButtonClick={handleAddClick} />
            <Route exact path="/">
              <Main
                weatherData={weatherData}
                cards={clothingItems}
                onCardClick={handleCardClick}
                weatherType={weatherType}
              >
                {clothingItems
                  .filter((item) => {
                    if (
                      weatherData.temperature &&
                      item.weather === weatherType(weatherData.temperature.F)
                    ) {
                      return true;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <ItemCard
                        name={item.name}
                        imageUrl={item.imageUrl}
                        key={item._id}
                        onCardClick={handleCardClick}
                      />
                    );
                  })}
              </Main>
            </Route>
            <Route path="/profile">
              <Profile
                weatherData={weatherData}
                clothingItems={clothingItems}
                weatherType={weatherType}
                onCardClick={handleCardClick}
                onButtonClick={handleAddClick}
                onCardDelete={handleRemoveItem}
              >
                {clothingItems

                  .filter((item) => {
                    if (
                      weatherData.temperature &&
                      item.weather === weatherType(weatherData.temperature.F)
                    ) {
                      return true;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <ItemCard
                        name={item.name}
                        imageUrl={item.imageUrl}
                        key={item._id}
                        onCardClick={handleCardClick}
                      />
                    );
                  })}
              </Profile>
            </Route>
          </BrowserRouter>

          <Footer />
        </div>
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;
