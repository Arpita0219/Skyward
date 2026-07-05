function WeatherCard({ weather }) {

    if (!weather) return null;

    return (

        <div className="max-w-md mx-auto mt-10">

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">

                <img
                    src={`https:${weather.icon}`}
                    alt="Weather"
                    className="mx-auto w-28"
                />

                <h2 className="text-4xl font-bold mt-3">

                    {weather.city}

                </h2>

                <p className="text-gray-500">

                    {weather.region}, {weather.country}

                </p>

                <h1 className="text-6xl font-bold text-blue-700 mt-6">

                    {weather.temperature}°C

                </h1>

                <p className="text-xl mt-4">

                    {weather.condition}

                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div className="bg-blue-100 rounded-xl p-4">

                        💧

                        <h3 className="font-bold">

                            Humidity

                        </h3>

                        <p>{weather.humidity}%</p>

                    </div>

                    <div className="bg-green-100 rounded-xl p-4">

                        💨

                        <h3 className="font-bold">

                            Wind

                        </h3>

                        <p>{weather.wind} km/h</p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default WeatherCard;