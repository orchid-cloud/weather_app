function actualDate(date) {
  let day = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Now",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let year = date.getFullYear();

  let hour = `0${date.getHours()}`.slice(-2);

  let minutes = `0${date.getMinutes()}`.slice(-2);

  let today = `${day} ${month} ${year} ${hour}:${minutes}`;
  return today;
}

let currentDate = document.querySelector("#current-day");
currentDate.innerHTML = actualDate(new Date());

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showTemperature(result) {
  console.log(result.data);
  let city = document.querySelector("#city-name");
  let condition = document.querySelector("#description");
  let temperature = Math.round(result.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = result.data.main.temp;

  city.innerHTML = result.data.name;
  condition.innerHTML = result.data.weather[0].description;
  currentTemp.innerHTML = `${temperature}`;
  feelsLike.innerHTML = Math.round(result.data.main.feels_like);
  humidity.innerHTML = result.data.main.humidity;
  windSpeed.innerHTML = Math.round(result.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", result.data.weather[0].description);
}
let celsiusTemperature = null;

function getWeatherByCityName(cityName, callback) {
  let apiKey = "ad08724a8362612bf966360e7b25eb54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  axios.get(`${apiUrl}&APPID=${apiKey}`).then(callback);
}

function getWeatherByCoordinates(position, callback) {
  let apiKey = "ad08724a8362612bf966360e7b25eb54";
  let { latitude, longitude } = position.coords;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(callback);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city-search");

  cityName = capitalizeFirstLetter(searchInput.value.trim());

  getWeatherByCityName(cityName, showTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", search);

function calcTemperatureCels(event) {
  event.preventDefault();

  fahrenheitTemperature.classList.remove("active");
  celsTemperature.classList.add("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsTemperature = document.querySelector("#celcius-link");
celsTemperature.addEventListener("click", calcTemperatureCels);

function calcTemperatureFahrn(event) {
  event.preventDefault();

  celsTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", calcTemperatureFahrn);

function showResult(position) {
  getWeatherByCoordinates(position, showTemperature);
}

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showResult);
}

let currentWeather = document.querySelector("#current-location-weather");
currentWeather.addEventListener("click", getCurrentWeather);
