import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import LoadingSpinner from "./LoadingSpinner";
import ForecastWeather from "./ForecastWeather";

const Home = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "d1905dbfb0d29348b3aab151e14cd7be"; 

  const fetchWeather = async () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    setIsLoading(true);

    try {
      
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);

      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data.list.slice(0, 5)); 
    } catch (error) {
      alert("Failed to fetch weather data. Please check the location.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Weather Data */}
      {weatherData && <WeatherCard weatherData={weatherData} />}

      {/* Forecast Data */}
      {forecastData && <ForecastWeather forecastData={forecastData} />}
    </div>
  );
};

export default Home;
