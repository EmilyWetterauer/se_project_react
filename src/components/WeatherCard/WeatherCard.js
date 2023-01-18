import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData, weatherImage }) {
  return (
    <div className="weatherBackgroundImage">
      <div className="weatherTemperature">
        {`${Math.round(weatherData.temperature)}${String.fromCharCode(176)}F`}
      </div>
    </div>
  );
}

export default WeatherCard;
