import React from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, cards, children, weatherType }) {
  const actualWeather = weatherData.temperature;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <div className="main__info">
          <div className="main__description-container">
            <p className="main__description">
              Today is
              {` ${Math.round(actualWeather)}${String.fromCharCode(176)}F`} and
              it is {weatherType(actualWeather)} / You may want to wear:
            </p>
          </div>
        </div>
        <ul className="main__items">{children}</ul>
      </section>
    </main>
  );
}

export default Main;
