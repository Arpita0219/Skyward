const axios = require("axios");

const getWeather = async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                message: "City is required"
            });
        }

        const apiKey = process.env.WEATHER_API_KEY;

        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        const response = await axios.get(url);

        const data = response.data;

        res.json({
            city: data.location.name,
            country: data.location.country,
            region: data.location.region,
            temperature: data.current.temp_c,
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch weather",
            error: error.message
        });
    }
};

module.exports = {
    getWeather
};