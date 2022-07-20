import {
  faCircleArrowDown,
  faCircleArrowUp,
  faCloud,
  faDroplet,
  faGaugeHigh,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faWind
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import { getForecastData, getIpInfo, getWeatherData } from "../../../fetch";
import useFormatTime from "../../../hooks/useFormatTime";
import { useRootContext } from "../../../hooks/useRootContext";
import { useUnixTime } from "../../../hooks/useUnixTime";
import { Bounce } from "../../global/Bounce";
import "./Dashboard.css";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const { GetDoc } = useRootContext();
  GetDoc();
  const { userPref } = useRootContext();
  const { units, email } = userPref;
  const whichUnit = (which) => {
    if (which === "temp") {
      switch (units) {
        case "standard":
          return "K";
        case "metric":
          return "°C";
        case "imperial":
          return "°F";
        default:
          return "°C";
      }
    } else if (which === "speed") {
      switch (units) {
        case "standard":
          return "m/s";
        case "metric":
          return "m/s";
        case "imperial":
          return "mi/h";
        default:
          return "m/s";
      }
    }
  };
  const UnixTimeConverter = (unixTime) => {
    const { hour, minutes } = useUnixTime(unixTime);
    const formated_hour = useFormatTime(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    return { hour, minutes, ampm, formated_hour };
  };
  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        getWeatherData({ units, latitude, longitude })
          .then((res) => {
            const { data, error } = res;
            setWeatherData(data);
          })
          .then(() => {
            getForecastData({ units, latitude, longitude })
              .then((res) => {
                const { data, error } = res;
                setForecastData(data);
              })
              .finally(() => {
                setIsLoading(false);
              });
          });
      },
      function (err) {
        console.warn(err.message);
        getIpInfo().then((res) => {
          const [latitude, longitude] = res.data.loc.split(",");
          getWeatherData({ units, latitude, longitude })
            .then((res) => {
              const { data, error } = res;
              setWeatherData(data);
            })
            .then(() => {
              getForecastData({ units, latitude, longitude })
                .then((res) => {
                  const { data, error } = res;
                  setForecastData(data);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            });
        });
      }
    );
  }, [userPref]);
  if (isLoading === true) {
    return <Bounce className={"text-center min-h-screen"}></Bounce>;
  }
  if (isLoading === false) {
    const { temp, feels_like, humidity, pressure, temp_max, temp_min } =
      weatherData?.main;
    const { speed, deg } = weatherData?.wind;
    const { sunrise, sunset, country } = weatherData?.sys;
    const { all } = weatherData?.clouds;
    const { dt, name } = weatherData;
    return (
      <Fragment>
        <main className="container mx-auto my-12">
          <section className="space-y-10">
            <div
              className={`sm:rounded-md lg:rounded-lg py-14 flex justify-center relative ${sunrise < dt && dt < sunset ? "bg-dayTime" : "bg-nightTime"
                }`}
            >
              <span
                className={`absolute top-2 left-2 px-4 py-2 rounded-full inline-flex items-center space-x-1 text-sm sm:text-base font-medium ${sunrise < dt && dt < sunset
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  }`}
              >
                <LocationMarkerIcon className="w-4 sm:w-5" />
                <span>
                  {name}, {country}
                </span>
              </span>
              <div
                className={`inline-flex flex-col bg-opacity-60 rounded-md py-4 px-7 ${sunrise < dt && dt < sunset
                    ? " bg-white text-black"
                    : "bg-black text-white"
                  }`}
              >
                <span className="text-6xl md:text-6xl lg:text-8xl font-bold">
                  {Math.round(temp)}
                  {whichUnit("temp")}
                </span>
                <span className="text-sm lg:text-base font-medium tracking-tight">
                  Feels like {Math.round(feels_like)}
                  {whichUnit("temp")}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-black sm:rounded-md lg:rounded-lg p-6 md:p-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faWind}
                        className="text-pink-600"
                      />
                      <p className="text-white">
                        {speed}
                        {whichUnit("speed")}
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Wind speed</p>
                </div>
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faDroplet}
                        className="text-pink-600"
                      />
                      <p className="text-white">{humidity}%</p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Humidity</p>
                </div>
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faCloud}
                        className="text-pink-600"
                      />
                      <p className="text-white">{all}%</p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Cloudiness</p>
                </div>
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faGaugeHigh}
                        className="text-pink-600"
                      />
                      <p className="text-white">{pressure}hPa</p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">
                    -Atmospheric pressure
                  </p>
                </div>
              </div>
              <div className="bg-black sm:rounded-md lg:rounded-lg p-6 md:p-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faTemperatureArrowUp}
                        className="text-pink-600"
                      />
                      <p className="text-white">
                        {temp_max}
                        {whichUnit("temp")}
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Temp max</p>
                </div>
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faTemperatureArrowDown}
                        className="text-pink-600"
                      />
                      <p className="text-white">
                        {temp_min}
                        {whichUnit("temp")}
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Temp min</p>
                </div>
                <div className="inline-flex flex-col gap-y-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faCircleArrowUp}
                        className="text-pink-600"
                      />
                      <p className="text-white">
                        {UnixTimeConverter(sunrise).formated_hour}:
                        {UnixTimeConverter(sunrise).minutes}{" "}
                        {UnixTimeConverter(sunrise).ampm}
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Sunrise</p>
                </div>
                <div className="inline-flex flex-col gap-y-1 -col-end-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 sm:rounded-md lg:rounded-lg blur-lg opacity-30"></div>
                    <div className="relative flex items-center gap-2 bg-black rounded-full px-4 py-2">
                      <FontAwesomeIcon
                        icon={faCircleArrowDown}
                        className="text-pink-600"
                      />
                      <p className="text-white">
                        {UnixTimeConverter(sunset).formated_hour}:
                        {UnixTimeConverter(sunset).minutes}{" "}
                        {UnixTimeConverter(sunset).ampm}
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-70">-Sunset</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Fragment>
    );
  }
};

export default Dashboard;
