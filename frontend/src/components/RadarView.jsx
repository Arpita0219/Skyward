import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaCloudRain, FaCloud, FaWind, FaTint, FaCompress, FaEye } from "react-icons/fa";
import { API_KEY } from "../services/weatherApi";

const layers = [
  { key: "precipitation_new", label: "Precipitation", icon: <FaCloudRain />, accent: "#60a5fa" },
  { key: "clouds_new", label: "Clouds", icon: <FaCloud />, accent: "#94a3b8" },
  { key: "wind_new", label: "Wind", icon: <FaWind />, accent: "#7c6cf6" },
];

const legendGradient = {
  precipitation_new: "from-sky-200 via-sky-400 to-indigo-600",
  clouds_new: "from-slate-100 via-slate-400 to-slate-700",
  wind_new: "from-violet-200 via-violet-400 to-violet-700",
};

const pulseIcon = (color) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:20px;height:20px;">
        <div style="
          position:absolute;inset:0;border-radius:9999px;
          background:${color};opacity:0.5;
          animation:radarPulse 2s ease-out infinite;
        "></div>
        <div style="
          position:absolute;inset:5px;border-radius:9999px;
          background:${color};box-shadow:0 0 12px ${color};
        "></div>
      </div>
      <style>
        @keyframes radarPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      </style>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const RadarView = ({ weather }) => {
  const [activeLayer, setActiveLayer] = useState("precipitation_new");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const refresh = () => {
    setLastUpdated(new Date());
    setSecondsAgo(0);
  };

  if (!weather) return null;
  const { lat, lon } = weather.coord;
  const activeMeta = layers.find((l) => l.key === activeLayer);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold">Live Radar</h2>
          <p className="text-xs text-gray-400 mt-1">
            {weather.name}, {weather.sys.country} · Updated {secondsAgo}s ago
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refresh}
          className="text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition"
        >
          Refresh
        </motion.button>
      </div>

      {/* Layer switcher */}
      <div className="flex gap-2 mb-5">
        {layers.map((l) => (
          <motion.button
            key={l.key}
            onClick={() => setActiveLayer(l.key)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition ${
              activeLayer === l.key
                ? "bg-indigo-500/90 text-white accent-glow"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {l.icon}
            {l.label}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Map */}
        <div className="panel rounded-3xl overflow-hidden h-[480px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-4 left-4 z-[400] bg-black/50 backdrop-blur px-4 py-3 rounded-2xl text-xs"
            >
              <p className="text-gray-300 mb-2">{activeMeta.label} Intensity</p>
              <div className={`w-40 h-1.5 rounded-full bg-gradient-to-r ${legendGradient[activeLayer]}`} />
              <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                <span>Light</span>
                <span>Moderate</span>
                <span>Heavy</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <MapContainer
            center={[lat, lon]}
            zoom={8}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <TileLayer
              key={activeLayer}
              url={`https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={0.65}
            />
            <Marker position={[lat, lon]} icon={pulseIcon(activeMeta.accent)} />
          </MapContainer>
        </div>

        {/* Side stats panel */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <FaTint />, label: "Humidity", value: `${weather.main.humidity}%`, color: "text-cyan-300" },
            { icon: <FaWind />, label: "Wind Speed", value: `${weather.wind.speed} m/s`, color: "text-indigo-300" },
            { icon: <FaCompress />, label: "Pressure", value: `${weather.main.pressure} hPa`, color: "text-violet-300" },
            {
              icon: <FaEye />,
              label: "Visibility",
              value: weather.visibility ? `${Math.round(weather.visibility / 1000)} km` : "--",
              color: "text-amber-300",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: i * 0.08 } }}
              whileHover={{ x: -3 }}
              className="panel rounded-2xl px-5 py-4 flex items-center gap-4"
            >
              <div className={`text-xl ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-label">{stat.label}</p>
                <p className="text-value text-lg mt-0.5">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadarView;