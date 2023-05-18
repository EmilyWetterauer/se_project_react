import { handleServerResponse } from "../utils/api";

const getForecastWeather = (location, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
  ).then(handleServerResponse);
};

const filterDataFromWeatherAPI = (data) => {
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.name;
  weather.temperature = {};
  weather.temperature.F = `${Math.round(data.main.temp)}°F`;
  weather.temperature.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
