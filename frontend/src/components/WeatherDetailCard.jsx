import { motion } from "framer-motion";
import { getMeteoIcon } from "../utils/meteoIcons";

const groupByDay = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) {
      days[date] = { temps: [], pops: [], icon: item.weather[0].icon, dt: item.dt };
    }
    days[date].temps.push(item.main.temp);
    days[date].pops.push(item.pop || 0);
  });
  return Object.entries(days).map(([date, d]) => ({
    date,
    dt: d.dt,
    min: Math.min(...d.temps),
    max: Math.max(...d.temps),
    pop: Math.max(...d.pops),
    icon: d.icon,
  }));
};

const WeatherDetailCard = ({ weather, forecast }) => {
  if (!weather || !forecast) return null;

  const dailyData = groupByDay(forecast.list);
  const weekMin = Math.min(...dailyData.map((d) => d.min));
  const weekMax = Math.max(...dailyData.map((d) => d.max));
  const range = weekMax - weekMin || 1;
  const hourly = forecast.list.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel rounded-[36px] w-full max-w-3xl mx-auto p-12 sm:p-14 text-center"
    >
      <p className="text-label">My Location</p>
      <h2 className="font-display text-2xl font-semibold mt-1">{weather.name}</h2>

      <h1 className="font-display text-8xl sm:text-9xl font-bold mt-3 gradient-text">
        {Math.round(weather.main.temp)}°
      </h1>
      <p className="text-lg text-gray-300 capitalize mt-2">{weather.weather[0].description}</p>
      <p className="text-sm text-gray-400 mt-1">
        H:{Math.round(weather.main.temp_max)}°  L:{Math.round(weather.main.temp_min)}°
      </p>

      {/* Everything below shares one consistent inner gutter */}
      <div className="px-2 sm:px-6">
        <div className="text-left text-sm text-gray-300 bg-white/5 rounded-2xl px-6 py-4 mt-8">
          {weather.weather[0].main} conditions expected today. Wind gusts up to{" "}
          {Math.round(weather.wind.speed * 3.6)} kph.
        </div>

        <div className="flex justify-between gap-2 mt-8 border-t border-white/10 pt-7">
          {hourly.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="flex-1 flex flex-col items-center gap-3 text-sm rounded-2xl py-4 px-2 hover:bg-white/5 transition cursor-default"
            >
              <span className="text-gray-400 text-xs">
                {i === 0 ? "Now" : new Date(item.dt * 1000).toLocaleTimeString([], { hour: "numeric" })}
              </span>
              <img src={getMeteoIcon(item.weather[0].icon)} alt="" className="w-10 h-10" />
              <span className="text-sky-300 text-xs">{Math.round((item.pop || 0) * 100)}%</span>
              <span className="font-semibold text-base">{Math.round(item.main.temp)}°</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-7 pb-2">
          <p className="text-label mb-4 text-left">5-Day Forecast</p>
          <div className="flex flex-col gap-1.5">
            {dailyData.map((day, i) => {
              const leftPct = ((day.min - weekMin) / range) * 100;
              const widthPct = ((day.max - day.min) / range) * 100;
              return (
                <motion.div
                  key={day.date}
                  whileHover={{ x: 4 }}
                  className="grid grid-cols-[70px_36px_44px_1fr_44px] items-center gap-4 text-sm rounded-xl px-4 py-4 hover:bg-white/5 transition cursor-default"
                >
                  <span className="text-left font-medium">
                    {i === 0
                      ? "Today"
                      : new Date(day.dt * 1000).toLocaleDateString("en-IN", { weekday: "short" })}
                  </span>
                  <img src={getMeteoIcon(day.icon)} alt="" className="w-8 h-8" />
                  <span className="text-gray-400 text-right">{Math.round(day.min)}°</span>
                  <div className="relative h-1.5 rounded-full bg-white/10">
                    <div
                      className="absolute h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    />
                  </div>
                  <span className="text-right font-semibold">{Math.round(day.max)}°</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDetailCard;