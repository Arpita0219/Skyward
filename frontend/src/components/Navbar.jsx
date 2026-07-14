import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaCloudSun,
  FaSearch,
  FaLocationArrow,
  FaTemperatureHigh,
} from "react-icons/fa";

const Navbar = ({ onSearch, weather }) => {
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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="glass rounded-3xl px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-6"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="bg-indigo-500 p-3 rounded-full glow">
          <FaCloudSun className="text-white text-3xl weather-icon" />
        </div>

        <div>
          <h1 className="text-3xl font-bold gradient-text">SKYWARD</h1>
          <p className="text-sm text-gray-300">Live Weather Dashboard</p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="glass flex items-center px-5 py-3 rounded-full w-full lg:w-[420px]">
        <FaSearch className="text-white mr-3 text-lg" />

        <input
          type="text"
          placeholder="Search city..."
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="ml-3 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-white"
        >
          Search
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-5 py-3 rounded-full flex items-center gap-2 hover:bg-indigo-500 transition"
        >
          <FaLocationArrow />
          Current Location
        </motion.button>

        <motion.div
          whileHover={{ rotate: 5 }}
          className="glass px-4 py-3 rounded-full flex items-center gap-2"
        >
          <FaTemperatureHigh className="text-orange-300" />

          <span className="font-semibold">
            {weather ? `${Math.round(weather.main.temp)}°C` : "--°C"}
          </span>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;