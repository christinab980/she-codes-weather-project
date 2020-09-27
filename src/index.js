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

function search(city) {
  let apiKey = `ee7de68645500b3b3a6e0543259fe146`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeDisplay);
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
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeDisplay(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemperature = response.data.main.temp;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feel-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("London");

function fahrenheitConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector("#temperature-now");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  fConversion.innerHTML = Math.round(fahrenheitTemperature) + "°";
}

function celciusConversion(event) {
  event.preventDefault();
  let fConversion = document.querySelector("#temperature-now");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  fConversion.innerHTML = Math.round(celciusTemperature) + "°";
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusConversion);
