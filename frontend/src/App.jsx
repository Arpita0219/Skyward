import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherService";

function App() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchWeather = async (city) => {
        try {
            setLoading(true);
            setError("");

            const data = await getWeather(city);

            setWeather(data);
        } catch (err) {
            setWeather(null);

            setError(
                err.response?.data?.message ||
                "Unable to fetch weather data."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
   
          <div className="min-h-screen bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300">
            <Navbar />

            <SearchBar onSearch={searchWeather} />

            {loading && (
                <p className="text-center mt-8 text-xl">
                    Loading...
                </p>
            )}

            {error && (
                <p className="text-center mt-8 text-red-600 font-bold">
                    {error}
                </p>
            )}

            <WeatherCard weather={weather} />
        </div>
    );
}

export default App;