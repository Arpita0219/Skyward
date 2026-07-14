import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="glass flex items-center px-5 py-3 rounded-full w-full lg:w-[420px]">
      <FaSearch className="text-white mr-3 text-lg" />

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />

      <button
        onClick={handleSearch}
        className="ml-3 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;