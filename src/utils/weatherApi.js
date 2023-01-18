import WeatherCard from "../components/WeatherCard/WeatherCard";
import { location } from "../utils/constants";

const getForecastWeather = (location, apiKey) => {
  console.log({ location });
  console.log({ apiKey });
  // const parsedLocation = `${location.latitude},&lon=${location.longitude}`;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
    // `https://api.openweathermap.org/data/2.5/weather?lat=${parsedLocation}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const filterDataFromWeatherAPI = (data) => {
  console.log("data", data);
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.name;
  weather.temperature = data.main.temp;
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
