

import AnimatedBackground from "../components/AnimatedBackground";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import HeroCard from "../components/HeroCard";
import WeatherHighlights from "../components/WeatherHighlights";
import WeeklyForecast from "../components/WeeklyForecast";
import WeatherMap from "../components/WeatherMap";
import useWeather from "../hooks/useWeather";
import WeatherDetailCard from "../components/WeatherDetailCard";
import Loading from "../components/Loading";

const Home = () => {
  const { weather, forecast, loading, error, fetchWeather } = useWeather("Bengaluru");
  const [activeView, setActiveView] = useState("dashboard");

 
  if (error) {
    return <div className="text-red-500 text-2xl text-center mt-40">{error}</div>;
  }
if (loading) {
  return <Loading />;
}

    

      return (
  <div className="flex h-screen overflow-hidden relative">
   
    <AnimatedBackground condition={weather.weather[0].main} temp={weather.main.temp} />
    <Sidebar activeView={activeView} onSelect={setActiveView} />

      <div className="flex-1 overflow-y-auto">
        <main className="min-h-full flex items-center justify-center px-5 sm:px-8 py-8">
          <div className="w-full max-w-[1400px]">
            {activeView === "dashboard" && (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="lg:col-span-4">
                  <HeroCard weather={weather} onSearch={fetchWeather} />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="lg:col-span-8">
                  <WeatherHighlights weather={weather} forecast={forecast} />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="lg:col-span-4">
                  <WeeklyForecast forecast={forecast} />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="lg:col-span-8">
                  <WeatherMap weather={weather} />
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Sunrise", value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
                    { label: "Sunset", value: new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
                    { label: "Pressure", value: `${weather.main.pressure} hPa` },
                    { label: "Feels Like", value: `${Math.round(weather.main.feels_like)}°` },
                  ].map((stat, i) => (
                    <div key={i} className="panel rounded-2xl px-5 py-4">
                      <p className="text-label">{stat.label}</p>
                      <p className="text-value text-xl mt-1">{stat.value}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeView === "map" && (
              <div className="h-[80vh]">
                <WeatherMap weather={weather} />
              </div>
            )}

            {activeView === "locations" && (
              <div className="panel rounded-3xl p-8 text-gray-300">
                Saved locations view — coming soon.
              </div>
            )}

            {activeView === "radar" && (
              <div className="panel rounded-3xl p-8 text-gray-300">
                Radar view — coming soon.
              </div>
            )}

            {activeView === "calendar" && (
              <div className="flex justify-center">
                <WeatherDetailCard weather={weather} forecast={forecast} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;