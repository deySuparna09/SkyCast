import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm p-3 rounded-full shadow-md"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="p-2 rounded-full w-52 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 text-center"
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full font-medium transition-all"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
