//date and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];
let month = monthNames[now.getMonth()];

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = ` ${day}, ${month} ${date}, ${hours}:${minutes}`;

//formatting hours for Forecast

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// displaying Forcast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-3">
          <h4>
            <span class="increment">${formatHours(forecast.dt * 1000)}</span>
          </h4> <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" id="forecast-pic" />
          <h4>
            ${Math.round(forecast.main.temp_max)} °| ${Math.round(
      forecast.main.temp_min
    )}°
          </h4>
        </div>`;
  }
}

// Api's and functions for search engine and temperature

function search(city) {
  let apiKey = `ee7de68645500b3b3a6e0543259fe146`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeDisplay);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = `ee7de68645500b3b3a6e0543259fe146`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeDisplay);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Temperature

function changeDisplay(response) {
  console.log(response);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemperature = response.data.main.temp;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

// Search Engine Form

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Fahrenheit and Celcuis Conversion

function fahrenheitConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector("#temperature-now");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  fConversion.innerHTML = Math.round(fahrenheitTemperature);
}

function celciusConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector("#temperature-now");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  fConversion.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusConversion);

search("London");
