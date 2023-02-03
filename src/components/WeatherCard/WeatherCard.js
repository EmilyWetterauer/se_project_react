import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ weatherData, weatherImage }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="weatherBackgroundImage">
      <div className="weatherTemperature">
        {weatherData.temperature
          ? weatherData.temperature[currentTemperatureUnit]
          : ""}
      </div>
    </div>
  );
}

export default WeatherCard;
