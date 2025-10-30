import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 mt-5">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border p-2 rounded-lg w-60 text-center"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
