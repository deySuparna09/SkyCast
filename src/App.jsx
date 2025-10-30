import { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setError("");
      setWeather(null);

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-200 to-sky-400">
      <h1 className="text-3xl font-bold mt-10">🌤 Weather Now</h1>
      <SearchBar onSearch={fetchWeather} />

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded-2xl text-center">
          <h2 className="text-2xl font-semibold">
            {weather.name}, {weather.country}
          </h2>
          <p className="text-lg mt-2">Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
