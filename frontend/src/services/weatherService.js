import axios from "axios";

const API = "http://localhost:5000/api/weather";

export const getWeather = async (city) => {
    const response = await axios.get(`${API}?city=${city}`);
    return response.data;
};