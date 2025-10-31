import { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setError("");
      setLoading(true);
      setWeather(null);

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        setLoading(false);
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
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 via-sky-200 to-blue-100 px-4">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
        🌤 Weather Now
      </h1>

      {/* Search Bar */}
      <SearchBar onSearch={fetchWeather} />

      {/* Loading */}
      {loading && <p className="text-blue-900 mt-6 text-lg font-medium">Loading...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-600 mt-6 bg-red-100 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Weather Card */}
      {weather && (
        <div className="mt-8 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-80 text-center transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800">
            {weather.name}, {weather.country}
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-4">
            {weather.temperature}°C
          </p>

          <p className="text-gray-600 mt-3">💨 Wind Speed: {weather.windspeed} km/h</p>

        </div>
      )}
    </div>
  );
}

export default App;
