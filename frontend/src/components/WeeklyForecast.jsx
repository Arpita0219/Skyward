import { motion } from "framer-motion";
import { getMeteoIcon } from "../utils/meteoIcons";

const WeeklyForecast = ({ forecast }) => {
  if (!forecast) return null;

  const dailyForecast = forecast.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-300">7 days Forecast</h3>
        <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-gray-300">
          {dailyForecast.length} day
        </span>
      </div>

      <div className="panel rounded-3xl p-3 flex flex-col gap-1">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition ${
              index === 0 ? "bg-white/[0.06] border border-white/10" : "hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={getMeteoIcon(day.weather[0].icon)} alt="" className="w-8 h-8" />
              <span className="font-semibold">
                +{Math.round(day.main.temp_max)}°/{Math.round(day.main.temp_min)}°
              </span>
            </div>

            <span className="text-sm text-gray-400">
              {new Date(day.dt * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "long" })}
            </span>

            <span className="text-sm text-gray-300 w-20 text-right">
              {new Date(day.dt * 1000).toLocaleDateString("en-IN", { weekday: "long" })}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;