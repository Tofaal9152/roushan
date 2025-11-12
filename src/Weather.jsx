import axios from "axios";
import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const WEATHER_API_KEY = "d0d3eed219316b96b41c8fb071ed65fb";

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
      );

      setSuggestions(res.data);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  const getWeather = async (name = city) => {
    try {
      setError("");

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${WEATHER_API_KEY}&units=metric`
      );

      setWeather(res.data);
      setCity(name);
      setSuggestions([]);
    } catch {
      setError("❌ City not found. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🌍 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        <button onClick={() => getWeather(city)}>Search</button>
      </div>

      {/* ✅ Suggestions will show BELOW search bar */}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() =>
                getWeather(`${s.name}, ${s.country}`, s.lat, s.lon)
              }
            >
              {s.name}, {s.state ? s.state + ", " : ""}
              {s.country}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="desc">{weather.weather[0].description}</p>
          <p className="temp">{weather.main.temp}°C</p>

          <div className="details">
            <p>🌡 Feels Like: {weather.main.feels_like}°C</p>
            <p>⬆ Max Temp: {weather.main.temp_max}°C</p>
            <p>⬇ Min Temp: {weather.main.temp_min}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>

            {weather.wind.gust && <p>💨 Gusts: {weather.wind.gust} m/s</p>}
            <p>📈 Pressure: {weather.main.pressure} hPa</p>
            <p>☁ Clouds: {weather.clouds.all}%</p>
            <p>🌫 Visibility: {weather.visibility / 1000} km</p>
            <p>
              🌅 Sunrise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              🌇 Sunset:{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
            <p>
              🕑 Local Time:{" "}
              {new Date(
                Date.now() +
                  weather.timezone * 1000 -
                  new Date().getTimezoneOffset() * 60000
              ).toLocaleTimeString()}
            </p>
            <p>
              🗺 Lat: {weather.coord.lat}, Lon: {weather.coord.lon}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
