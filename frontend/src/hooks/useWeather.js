import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getForecast,
} from "../services/weatherApi";

const useWeather = (city = "Bengaluru") => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);

      const current = await getCurrentWeather(cityName);
      const future = await getForecast(cityName);

      setWeather(current);
      setForecast(future);

      setError("");
    } catch (err) {
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
  };
};

export default useWeather;