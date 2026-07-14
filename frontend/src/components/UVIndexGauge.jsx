import { motion } from "framer-motion";

// NOTE: OpenWeather's free /weather + /forecast endpoints don't return UV Index.
// Real UV needs the One Call API 3.0 (separate subscription on OpenWeather's dashboard).
// Wire `uvValue` up to that response's `.current.uvi` once you add that endpoint.
const UVIndexGauge = ({ uvValue = 5.5, maxValue = 12 }) => {
  const pct = Math.min(uvValue / maxValue, 1);
  const circumference = 2 * Math.PI * 40; // r = 40
  const arcLength = circumference * 0.75; // 270deg arc
  const offset = arcLength - pct * arcLength;

  return (
    <motion.div whileHover={{ y: -4 }} className="panel rounded-3xl p-5 flex flex-col items-center">
      <h3 className="text-sm text-gray-300 self-start">UV Index</h3>

      <div className="relative w-28 h-28 mt-2">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
          <circle
            cx="50" cy="50" r="40"
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            cx="50" cy="50" r="40"
            fill="none" stroke="#60a5fa" strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className="font-display text-2xl font-bold amber-text">{uvValue.toFixed(2)}</span>
          <span className="text-[10px] text-gray-400">uv</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UVIndexGauge;