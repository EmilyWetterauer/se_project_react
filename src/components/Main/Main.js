import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";

function Main({ weatherData, cards, children, weatherType }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const actualWeather = weatherData.temperature
    ? weatherData.temperature[currentTemperatureUnit]
    : "";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      {/* <section className="main__clothes"> */}
      <div className="main__info">
        <div className="main__description-container">
          <p className="main__description">
            Today is {` ${actualWeather}`} and it is{" "}
            {weatherType(actualWeather)} / You may want to wear:
          </p>
        </div>
      </div>
      <ul className="main__items">{children}</ul>
      {/* </section> */}
    </main>
  );
}

export default Main;
