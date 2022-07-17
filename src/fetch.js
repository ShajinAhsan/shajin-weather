import axios from "axios";
const { REACT_APP_API_KEY } = process.env;
export const getWeatherData = async (args) => {
  const { units, latitude, longitude } = args;
  const base_url = "https://api.openweathermap.org/data/2.8/onecall?";
  return axios.get(
    `${base_url}units=${
      units || "metric"
    }&exclude=minutely&lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY}`
  );
};
export const getIpInfo = async () => {
  const base_url = "https://ipinfo.io/?";
  return axios.get(`${base_url}token=${process.env.REACT_APP_IP_API_KEY}`);
};
