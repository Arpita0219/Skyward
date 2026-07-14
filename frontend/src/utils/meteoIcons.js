// Free, open-source (MIT) 3D weather icon set by Bas Milius
// https://github.com/basmilius/weather-icons
const BASE = "https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all";

const iconMap = {
  "01d": "clear-day", "01n": "clear-night",
  "02d": "partly-cloudy-day", "02n": "partly-cloudy-night",
  "03d": "cloudy", "03n": "cloudy",
  "04d": "overcast-day", "04n": "overcast-night",
  "09d": "partly-cloudy-day-rain", "09n": "partly-cloudy-night-rain",
  "10d": "partly-cloudy-day-rain", "10n": "partly-cloudy-night-rain",
  "11d": "thunderstorms-day", "11n": "thunderstorms-night",
  "13d": "snow", "13n": "snow",
  "50d": "fog", "50n": "fog",
};

export const getMeteoIcon = (owmIconCode) => {
  const name = iconMap[owmIconCode] || "cloudy";
  return `${BASE}/${name}.svg`;
};