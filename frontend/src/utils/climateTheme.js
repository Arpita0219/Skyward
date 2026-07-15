// Background photo per weather condition (free Unsplash photos, no key needed)
const photos = {
  clear: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80",
  hot: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
  clouds: "https://images.unsplash.com/photo-1499956827185-0d63ee78a910?auto=format&fit=crop&w=1600&q=80",
  rain: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1600&q=80",
  thunder: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1600&q=80",
  snow: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=1600&q=80",
  fog: "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=1600&q=80",
};

export const getClimatePhoto = (main, temp) => {
  switch (main) {
    case "Clear":
      return temp >= 30 ? photos.hot : photos.clear;
    case "Clouds":
      return photos.clouds;
    case "Rain":
    case "Drizzle":
      return photos.rain;
    case "Thunderstorm":
      return photos.thunder;
    case "Snow":
      return photos.snow;
    case "Mist":
    case "Fog":
    case "Haze":
      return photos.fog;
    default:
      return photos.clouds;
  }
};

// Dark overlay gradient so white text stays readable over any photo
export const getOverlay = () =>
  "linear-gradient(180deg, rgba(8,8,14,0.75) 0%, rgba(8,8,14,0.55) 40%, rgba(8,8,14,0.85) 100%)";