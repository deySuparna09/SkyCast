import React, { useState } from "react";
import sunny from "./assets/sunny.jpg";
import rainy from "./assets/rainy.jpg";
import cloudy from "./assets/cloudy.jpg";
import snow from "./assets/snow.jpg";
import defaultBg from "./assets/default.jpg";
import "./index.css";

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); // ✅ New: error state
  const [loading, setLoading] = useState(false); // ✅ New: loading state

  // ✅ Step 1: Fetch weather data
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    if (!query.trim()) {
      setError("⚠️ Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError("");
      } else if (data.cod === "404") {
        setError("❌ City not found. Please try again.");
      } else {
        setError("⚠️ Unable to fetch weather data. Try again later.");
      }
    } catch (err) {
      setError("🚨 Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Choose background based on weather
  const getBackgroundImage = () => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return defaultBg;
    }

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("cloud")) return cloudy;
    if (condition.includes("rain")) return rainy;
    if (condition.includes("clear")) return sunny;
    if (condition.includes("snow")) return snow;
    return defaultBg;
  };

  // ✅ Step 3: UI rendering
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white transition-all duration-700"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">🌤 SkyCast</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city"
          className="p-2 rounded text-black w-60 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* ✅ Show loading state */}
      {loading && <p className="text-lg font-medium">⏳ Loading...</p>}

      {/* ✅ Show error message */}
      {error && <p className="text-red-300 font-medium">{error}</p>}

      {/* ✅ Show weather details if available */}
      {weather && weather.main && (
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center space-y-2 shadow-lg w-72">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>

          {/* Weather Icon */}
          {weather.weather && weather.weather[0] && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto"
            />
          )}

          <p className="text-lg font-medium capitalize">
            {weather.weather[0].main} ({weather.weather[0].description})
          </p>

          {/* ✅ Temperature Details */}
          <p className="text-lg">🌡 Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">🤗 Feels Like: {weather.main.feels_like}°C</p>

          {/* ✅ Extra Weather Details */}
          <p className="text-lg">💧 Humidity: {weather.main.humidity}%</p>
          <p className="text-lg">📊 Pressure: {weather.main.pressure} hPa</p>
          <p className="text-lg">💨 Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
