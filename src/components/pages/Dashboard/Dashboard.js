import React, { useEffect, useState } from "react";
import { getIpInfo, getWeatherData } from "../../../fetch";
import { useRootContext } from "../../../hooks/useRootContext";
import { Bounce } from "../../global/Bounce";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const { GetDoc } = useRootContext();
  GetDoc();
  const { userPref } = useRootContext();
  const { name, units } = userPref;
  console.log(userPref);

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        getWeatherData({ units: units, latitude, longitude }).then((res) => {
          const { data, error } = res;
          setWeatherData(data);
          setIsLoading(false);
        });
      },
      function (err) {
        console.log(err.message);
        getIpInfo().then((res) => {
          const [latitude, longitude] = res.data.loc.split(",");
          getWeatherData({ units: units, latitude, longitude }).then((res) => {
            const { data, error } = res;
            setWeatherData(data);
            setIsLoading(false);
          });
        });
      }
    );
  }, [userPref]);
  console.log(units);

  if (isLoading) {
    return <Bounce className={"text-center min-h-screen"}></Bounce>;
  }
  return (
    <div>
      <p>Temp: {weatherData?.current?.temp}</p>
      <p>Location: {weatherData?.timezone}</p>
    </div>
  );
};

export default Dashboard;
