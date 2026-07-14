import { motion } from "framer-motion";
import { WiDaySunny, WiCloud, WiRain, WiThunderstorm } from "react-icons/wi";

const HourlyForecast = ({ forecast }) => {
  if (!forecast) return null;

  const getIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny className="text-yellow-300 text-4xl" />;
      case "Clouds":
        return <WiCloud className="text-slate-200 text-4xl" />;
      case "Rain":
      case "Drizzle":
        return <WiRain className="text-sky-300 text-4xl" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-indigo-300 text-4xl" />;
      default:
        return <WiDaySunny className="text-yellow-300 text-4xl" />;
    }
  };

  return (
    <section className="mt-14">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="text-3xl font-bold mb-8"
      >
        Hourly Forecast
      </motion.h2>

      <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory">
        {forecast.list.slice(0, 8).map((item, index) => {
          const isNow = index === 0;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -6 }}
              className={`shrink-0 w-24 sm:w-28 rounded-full flex flex-col items-center gap-3 py-6 px-3 snap-center ${
                isNow ? "glass-active" : "glass"
              }`}
            >
              <h3 className="font-semibold text-xs sm:text-sm text-gray-200">
                {isNow
                  ? "Now"
                  : new Date(item.dt * 1000).toLocaleTimeString([], {
                      hour: "numeric",
                    })}
              </h3>

              {getIcon(item.weather[0].main)}

              <h2 className="text-xl font-bold">
                {Math.round(item.main.temp)}°
              </h2>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;