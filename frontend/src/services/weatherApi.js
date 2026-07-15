



import axios from "axios";

const API_KEY = "import.meta.env.VITE_WEATHER_API_KEY;";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Weather Error:", error);
    throw error;
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Forecast Error:", error);
    throw error;
  }
};