import React from "react";
import sunny from "../assets/sunny.svg";
import cloudy from "../assets/cloudy.svg";
import rain from "../assets/rain.svg";

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather } = weatherData;

  const getWeatherIcon = (description) => {
    switch (description) {
      case "Clear":
        return sunny;
      case "Clouds":
        return cloudy;
      case "Rain":
        return rain;
      default:
        return sunny;
    }
  };

  return (
    <div className="weather-card animate-slide-in">
      <img
        src={getWeatherIcon(weather[0].main)}
        alt={weather[0].main}
        className="weather-icon"
      />
      <h2>{name}</h2>
      <h3>{main.temp}°C</h3>
      <p>{weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
