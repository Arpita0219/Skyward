import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const glowIcon = (temp) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width:56px;height:56px;border-radius:9999px;
        background:radial-gradient(circle, rgba(245,166,35,0.5), rgba(245,166,35,0.05) 70%);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 0 25px rgba(245,166,35,0.5);
      ">
        <div style="
          background:rgba(20,20,20,0.9);color:white;
          font-family:'Space Grotesk',sans-serif;font-weight:600;
          padding:4px 10px;border-radius:9999px;font-size:13px;
          border:1px solid rgba(255,255,255,0.15);
        ">${Math.round(temp)}°</div>
      </div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });

const WeatherMap = ({ weather }) => {
  if (!weather) return null;
  const { lat, lon } = weather.coord;

  return (
    <div>
      <h3 className="text-sm text-gray-300 mb-4">Weather condition map</h3>

      <div className="panel rounded-3xl overflow-hidden h-[340px] relative">
        <div className="absolute top-4 left-4 z-[400] bg-white/85 backdrop-blur px-4 py-3 rounded-2xl text-xs shadow-md">
          <p className="text-gray-700 mb-2 font-medium">Precipitation</p>
          <div className="w-40 h-1.5 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-sky-400" />
          <div className="flex justify-between mt-1 text-[10px] text-gray-500">
            <span>Extreme</span>
            <span>Heavy</span>
            <span>Moderate</span>
            <span>Light</span>
          </div>
        </div>

        <MapContainer
          center={[lat, lon]}
          zoom={9}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[lat, lon]} icon={glowIcon(weather.main.temp)}>
            <Popup>
              {weather.name}, {weather.sys.country} — {Math.round(weather.main.temp)}°
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;