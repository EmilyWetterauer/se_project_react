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
// import { React } from "globalthis/implementation";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleCardClick = (evt) => {
    setSelectedCard(evt.target);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setClicked(true);
    setActiveModal("create");
  };

  const closeAllModals = (evt) => {
    if (
      evt.key === "Escape" ||
      (evt.target === evt.currentTarget && evt.type === "click")
    ) {
      return setActiveModal("");
    }
  };

  const weatherType = (actualWeather) => {
    if (actualWeather >= 86) {
      return "hot";
    } else if (actualWeather >= 66 && actualWeather <= 85) {
      return "warm";
    } else if (actualWeather <= 65) {
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
      <div className="pageWrapper">
        <Header weatherData={weatherData} onButtonClick={handleAddClick} />
        <Main
          weatherData={weatherData}
          cards={clothingItems}
          onCardClick={handleCardClick}
          weatherType={weatherType}
        >
          {defaultClothingItems
            .filter((item) => {
              if (item.weather === weatherType(weatherData.temperature)) {
                return true;
              }
            })
            .map((item, index) => {
              return (
                <ItemCard
                  name={item.name}
                  link={item.link}
                  key={item._id}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </Main>

        <Footer />
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title={"New garment"}
          buttonLabel={"Add garment"}
          onClose={closeAllModals}
        >
          <label htmlFor="clothing-name" className="ModalWithForm-heading">
            Name
            <input
              type="text"
              name="name"
              id="clothing-name"
              className="ModalWithForm-input modal__input_type_card-name"
              placeholder="Name"
              required
              minLength="1"
              maxLength="30"
            />
            <span className="modal-error" id="clothing-name-error"></span>
          </label>
          <label htmlFor="clothing-link" className="ModalWithForm-heading">
            Image
            <input
              type="url"
              name="link"
              id="clothing-link"
              className="ModalWithForm-input modal__input_type_url"
              placeholder="Image URL"
              required
            />
            <span className="modal__error" id="clothing-link-error"></span>
          </label>
          <p className="modalWithForm__subTitle">Select the weather type:</p>
          <div className="modal__input modal__input_type_radio">
            <div>
              <input
                type="radio"
                id="choiceHot"
                name="weatherType"
                value="hot"
              />
              <label className="modal__label_radio" htmlFor="choiceHot">
                Hot
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="choiceWarm"
                name="weatherType"
                value="warm"
              />
              <label className="modal__label_radio" htmlFor="choiceWarm">
                Warm
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="choiceCold"
                name="weatherType"
                value="cold"
              />
              <label className="modal__label_radio" htmlFor="choiceCold">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )}
    </div>
  );
};

export default App;
