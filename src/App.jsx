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

  // ✅ Step 1: Function to get weather data
  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your actual key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  // ✅ Step 2: Choose background image based on weather
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


  // ✅ Step 3: Apply the background dynamically
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white transition-all duration-700"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      <h1 className="text-4xl font-bold mb-4">🌤 Weather Now</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city"
          className="p-2 rounded text-black"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 rounded">
          Search
        </button>
      </form>

      {weather && weather.main && (
  <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center space-y-2">
    <h2 className="text-2xl font-semibold">{weather.name}</h2>

    {/* Weather Icon */}
    {weather.weather && weather.weather[0] && (
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto"
      />
    )}

    <p className="text-lg font-medium">
      {weather.weather[0].main} ({weather.weather[0].description})
    </p>

    {/* Temperature */}
    <p className="text-lg">🌡 Temperature: {weather.main.temp}°C</p>

    {/* New features 👇 */}
    <p className="text-lg">💧 Humidity: {weather.main.humidity}%</p>
    <p className="text-lg">📊 Pressure: {weather.main.pressure} hPa</p>

    {/* Wind */}
    <p className="text-lg">💨 Wind Speed: {weather.wind.speed} km/h</p>
  </div>
)}

    </div>
  );
};

export default WeatherApp;
