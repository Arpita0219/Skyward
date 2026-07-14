import { motion } from "framer-motion";

const WindStatusCard = ({ forecast, weather }) => {
  const points = forecast?.list?.slice(0, 8) || [];
  const speeds = points.map((p) => p.wind.speed);
  const max = Math.max(...speeds, 1);
  const min = Math.min(...speeds, 0);

  const path = speeds
    .map((s, i) => {
      const x = (i / (speeds.length - 1 || 1)) * 100;
      const y = 40 - ((s - min) / (max - min || 1)) * 32;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const currentTime = weather
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  return (
    <motion.div whileHover={{ y: -4 }} className="panel rounded-3xl p-5 flex flex-col">
      <h3 className="text-sm text-gray-300">Wind Status</h3>

      <svg viewBox="0 0 100 40" className="w-full h-16 mt-3" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="#818cf8" strokeWidth="1.5" />
      </svg>

      <div className="flex gap-[3px] items-end h-6 mt-1">
        {speeds.map((s, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${i === 0 ? "bg-indigo-400" : "bg-white/15"}`}
            style={{ height: `${((s - min) / (max - min || 1)) * 100 || 15}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between items-end mt-4">
        <p className="text-3xl font-bold">
          {weather ? weather.wind.speed.toFixed(2) : "--"}
          <span className="text-sm font-normal text-gray-400 ml-1">km/h</span>
        </p>
        <span className="text-xs text-gray-400">{currentTime}</span>
      </div>
    </motion.div>
  );
};

export default WindStatusCard;