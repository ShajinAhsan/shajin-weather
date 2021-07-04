import "./css/style.css";
import API from "./src/api";
import unixTimeConverter from "./src/unixTimeConverter";
import capitalizeWords from "./src/capitalizeWords";
import unitConverter from "./src/unitConverter";
import formatTime from "./src/formatTime";
import isDayTime from "./src/isDayTime";

const time = new Date();
document.addEventListener("load", getLocation());

function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const LatLon = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    getWeather(LatLon);
  });
}

function getWeather(data) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API[0]}&units=metric`
  )
    .then((res) => res.json())
    .then((data1) => displayWeather(data1));
}

function displayWeather(data) {
  !isDayTime
    ? document.body.classList.add("dark-mode")
    : document.body.classList.remove("dark-mode");
  document.getElementById("weather").innerHTML = `
  <div class="header-area">
    <div class="city-name">
      <i class="uil uil-location-arrow"></i>
      <span>${data.name}</span>
    </div>
    <div class="time">
      ${time.getDate()}, ${
    unixTimeConverter().months[time.getMonth()]
  } '${time.getFullYear()}
    </div>
  </div>
  <div class="temp">
    <span class="temp-value">${Math.round(data.main.temp)}
    <i class="uil uil-celsius"></i>
    </span>
    <i hidden class="uil uil-fahrenheit"></i>
    <p class="weather-description">${
      data.weather[1] !== undefined
        ? capitalizeWords(data.weather[1].description)
        : capitalizeWords(data.weather[0].description)
    }</p>
  </div>
  <div class="extra-details">
    <div class="WindAndHumidity">
      <p class="wind-speed">
        <i class="uil uil-wind"></i>
        ${
          Math.round(unitConverter.msTokmh(data.wind.speed)) !== 0
            ? Math.round(unitConverter.msTokmh(data.wind.speed)) + " km/h"
            : "?"
        }
        <span class="info">-Wind Speed</span>
      </p>
      <p class="humidity">
        <i class="uil uil-tear"></i>
        ${data.main.humidity}
        %
        <span class="info">-Humidity</span>
      </p>
    </div>
    <div class="SunsetAndSunrise">
      <p class="sunrise">
        <i class="uil uil-cloud-sun"></i>
        ${unixTimeConverter(data.sys.sunrise).hour}:${
    unixTimeConverter(data.sys.sunrise).minutes
  }
    AM
    <span class="info">-Sunrise</span>
    </p>
      <p class="sunset">
        <i class="uil uil-sunset"></i>
        ${formatTime(unixTimeConverter(data.sys.sunset).hour)}:${
    unixTimeConverter(data.sys.sunset).minutes
  }
        PM
        <span class="info">-Sunset</span>
      </p>
    </div>
  </div>
  <div class="TempMinMax">
  <p class="pressure">
    <i class="uil uil-tachometer-fast-alt"></i>
    ${data.main.pressure} 
    mb
    <span class="info">-Pressure</span>
  </p>
  <p class="feels-like">
    <i class="uil uil-wind-sun"></i>
    ${Math.round(data.main.feels_like)} <i class="uil uil-celsius"></i>
    <span class="info">-Feels Like</span>
  </p>
  <p class="temp-max">
    <i class="uil uil-temperature-plus"></i>
    ${Math.round(data.main.temp_max)} <i class="uil uil-celsius"></i>
    <span class="info">-Temp Max</span>
  </p>
    <p class="temp-min">
      <i class="uil uil-temperature-minus"></i>
      ${Math.round(data.main.temp_min)} <i class="uil uil-celsius"></i>
      <span class="info">-Temp Min</span>
    </p>
  </div>
  `;
}
