import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import { BsBookmarkStarFill } from "react-icons/bs";
import { getCurrentWeather } from "../services/weatherApi";
import { getMeteoIcon } from "../utils/meteoIcons";
import useSavedLocations from "../hooks/useSavedLocations";

const conditionStyle = (main) => {
  switch (main) {
    case "Clear":
      return { tint: "rgba(245,166,35,0.10)", ring: "rgba(245,166,35,0.35)", text: "text-amber-300" };
    case "Clouds":
      return { tint: "rgba(148,163,184,0.08)", ring: "rgba(148,163,184,0.3)", text: "text-slate-300" };
    case "Rain":
    case "Drizzle":
      return { tint: "rgba(56,110,180,0.12)", ring: "rgba(96,165,250,0.35)", text: "text-sky-300" };
    case "Thunderstorm":
      return { tint: "rgba(124,108,246,0.12)", ring: "rgba(124,108,246,0.4)", text: "text-indigo-300" };
    case "Snow":
      return { tint: "rgba(203,213,225,0.1)", ring: "rgba(203,213,225,0.35)", text: "text-slate-200" };
    default:
      return { tint: "rgba(124,108,246,0.08)", ring: "rgba(124,108,246,0.3)", text: "text-indigo-300" };
  }
};

const LocationCard = ({ city, data, index, onSelect, onRemove }) => {
  const style = data ? conditionStyle(data.weather[0].main) : conditionStyle(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.06 } }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
      whileHover={{ y: -3, scale: 1.005 }}
      onClick={() => data && onSelect(city)}
      className="relative overflow-hidden panel rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer group"
      style={{ background: `linear-gradient(120deg, ${style.tint}, transparent 70%)` }}
    >
      <motion.div
        className="absolute w-36 h-36 rounded-full blur-3xl -right-10 -top-10 pointer-events-none"
        style={{ background: style.ring }}
        animate={{ x: [0, 12, -8, 0], y: [0, -10, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* left accent bar, tinted by condition */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-70"
        style={{ background: style.ring }}
      />

      <div className="flex items-center gap-4 relative z-10 pl-2">
        {data ? (
          <motion.img
            src={getMeteoIcon(data.weather[0].icon)}
            alt=""
            className="w-11 h-11"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-white/10 animate-pulse" />
        )}
        <div className="text-left">
          <p className="font-display font-semibold">{city}</p>
          <p className={`text-xs capitalize ${style.text}`}>
            {data ? data.weather[0].description : "Loading..."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 relative z-10">
        {data && (
          <span className="font-display text-2xl font-bold">
            {Math.round(data.main.temp)}°
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(city);
          }}
          className="text-gray-500 hover:text-red-400 transition p-2 opacity-0 group-hover:opacity-100"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const SavedLocations = ({ onSelectCity }) => {
  const { locations, addLocation, removeLocation } = useSavedLocations();
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const entries = await Promise.all(
        locations.map(async (city) => {
          try {
            const data = await getCurrentWeather(city);
            return [city, data];
          } catch {
            return [city, null];
          }
        })
      );
      setWeatherData(Object.fromEntries(entries));
    };
    if (locations.length) fetchAll();
  }, [locations]);

  const handleAdd = async () => {
    if (!cityInput.trim()) return;
    setLoading(true);
    try {
      await getCurrentWeather(cityInput);
      addLocation(cityInput);
      setCityInput("");
    } catch {
      alert("City not found. Check the spelling and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center mb-3 accent-glow">
          <BsBookmarkStarFill className="text-indigo-300 text-2xl" />
        </div>
        <h2 className="font-display text-2xl font-bold">Saved Locations</h2>
        <p className="text-sm text-gray-400 mt-1">
          {locations.length
            ? `Tracking ${locations.length} ${locations.length === 1 ? "city" : "cities"}`
            : "Add your favorite cities to track them here"}
        </p>
      </motion.div>

      {/* Add city input */}
      <div className="w-full flex justify-center">
        <div className="glass flex items-center px-6 py-4 rounded-full w-full max-w-md accent-glow border border-white/10">
          <FaMapMarkerAlt className="text-indigo-300 mr-3 shrink-0" />
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a city..."
            className="search-input text-center"
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            disabled={loading}
            className="ml-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 p-3 rounded-full transition text-black disabled:opacity-50 shrink-0"
          >
            <FaPlus />
          </motion.button>
        </div>
      </div>

      {/* Divider + section label — creates clear separation from the input above */}
      {locations.length > 0 && (
        <div className="w-full flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-label whitespace-nowrap">Your Cities</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      )}

      {/* Empty state */}
      {locations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-12 mt-6 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={getMeteoIcon("02d")} alt="" className="w-20 h-20 opacity-70" />
          </motion.div>
          <p className="text-gray-400 text-sm mt-4 max-w-xs">
            No saved locations yet — search for a city above and it'll show up here with live weather.
          </p>
        </motion.div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3 w-full">
        <AnimatePresence>
          {locations.map((city, i) => (
            <LocationCard
              key={city}
              city={city}
              index={i}
              data={weatherData[city]}
              onSelect={onSelectCity}
              onRemove={removeLocation}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedLocations;