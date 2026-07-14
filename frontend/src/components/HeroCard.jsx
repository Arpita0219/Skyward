import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { getMeteoIcon } from "../utils/meteoIcons";
import SearchBar from "./SearchBar";

const HeroCard = ({ weather, onSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  if (!weather) {
    return <div className="panel rounded-3xl p-8 text-center">Loading Weather...</div>;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="panel rounded-3xl p-6 h-full relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10,10,18,0.55), rgba(10,10,18,0.9)), url('https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=800&q=60')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={() => setSearchOpen((v) => !v)}
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center transition z-10"
      >
        <FaSearch className="text-gray-200" />
      </button>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 max-w-xs relative z-10"
          >
            <SearchBar onSearch={(city) => { onSearch(city); setSearchOpen(false); }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="weather-icon inline-block relative z-10">
        <img
          src={getMeteoIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="w-28 h-28 drop-shadow-[0_0_25px_rgba(124,108,246,0.4)]"
        />
      </div>

      <h1 className="font-display text-7xl font-bold mt-2 gradient-text relative z-10">
        {Math.round(weather.main.temp)}°C
      </h1>

      <p className="text-lg text-gray-200 capitalize mt-1 relative z-10">
        {weather.weather[0].description}
      </p>

      <div className="border-t border-white/10 mt-6 pt-4 flex flex-col gap-1 text-sm text-gray-300 relative z-10">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {weather.name}, {weather.sys.country}
        </div>
        <div>{formattedDate} &nbsp; {time}</div>
      </div>
    </motion.section>
  );
};

export default HeroCard;