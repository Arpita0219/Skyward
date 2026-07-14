import { motion } from "framer-motion";
import { FaTint, FaEye } from "react-icons/fa";
import WindStatusCard from "./WindStatusCard";
import UVIndexGauge from "./UVIndexGauge";

const WeatherHighlights = ({ weather, forecast }) => {
  if (!weather) return null;

  return (
    <div>
      <h3 className="text-sm text-gray-300 mb-4">Today's Highlight</h3>

      <div className="grid grid-cols-2 gap-4">
        <WindStatusCard forecast={forecast} weather={weather} />
        <UVIndexGauge />

        <motion.div whileHover={{ y: -4 }} className="panel rounded-3xl p-5">
          <div className="flex items-center gap-2 text-cyan-300 text-lg mb-3">
            <FaTint />
          </div>
          <h3 className="text-sm text-gray-300">Humidity</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{weather.main.humidity}%</p>
            <p className="text-xs text-gray-400 text-right max-w-[110px]">
              Dew point is {Math.round(weather.main.temp - 5)}° right now
            </p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="panel rounded-3xl p-5">
          <div className="flex items-center gap-2 text-yellow-300 text-lg mb-3">
            <FaEye />
          </div>
          <h3 className="text-sm text-gray-300">Visibility</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">
              {weather.visibility ? Math.round(weather.visibility / 1000) : "--"}
            </p>
            <p className="text-xs text-gray-400 text-right max-w-[110px]">
              {weather.visibility && weather.visibility < 5000
                ? "Haze is affecting visibility"
                : "Clear conditions"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherHighlights;