import axios from "axios";
const { REACT_APP_API_KEY_ONE, REACT_APP_API_KEY_TWO, REACT_APP_IP_API_KEY } =
  process.env;
const base_url = "https://api.openweathermap.org/data/";
export const getWeatherData = async (args) => {
  const { units, latitude, longitude } = args;
  return axios.get(
    `${base_url}2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY_TWO}&units=${
      units || "metric"
    }`
  );
};
export const getForecastData = async (args) => {
  const { units, latitude, longitude } = args;
  return axios.get(
    `${base_url}2.8/onecall?units=${
      units || "metric"
    }&exclude=minutely,current&lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY_ONE}`
  );
};
export const getIpInfo = async () => {
  const base_url = "https://ipinfo.io/?";
  return axios.get(`${base_url}token=${REACT_APP_IP_API_KEY}`);
};
