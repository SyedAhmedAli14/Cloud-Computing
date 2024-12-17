import React, { useState } from "react";
import axios from "axios";


const ForecastWeather = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "d1905dbfb0d29348b3aab151e14cd7be"; 

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(response.data.list.slice(0, 5)); 
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setForecast([]);
    }
  };

  return (
    <div className="forecast-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchForecast}  className="search-button">Get 5 days Forecast</button>
      </div>

      {error && <p className="error">{error}</p>}

      {forecast.length > 0 && (
        <div className="forecast-list">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Condition: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastWeather;
