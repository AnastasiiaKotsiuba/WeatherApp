function currentDates() {
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
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let text = document.querySelector("#day-and-time");
  text.innerHTML = `${day} ${hour}:${minutes}`;
}

currentDates();

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#button-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
  getWeather(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function getWeather(value) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let city = value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeWeather);
}

function changeWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let weatherFirst = response.data.weather[0].description;
  const weather = weatherFirst.charAt(0).toUpperCase() + weatherFirst.slice(1);
  document.querySelector("#value-of-temp").innerHTML = temp;
  document.querySelector("#value-of-pressure").innerHTML = pressure;
  document.querySelector("#value-of-humidity").innerHTML = humidity;
  document.querySelector("#value-of-wind").innerHTML = wind;
  document.querySelector("#value-of-weather").innerHTML = weather;
}

function currentTemp(response) {
  let city = response.data.name;
  let pressure = response.data.main.pressure;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let weatherFirst = response.data.weather[0].description;
  const weather = weatherFirst.charAt(0).toUpperCase() + weatherFirst.slice(1);
  document.querySelector("h2").innerHTML = city;
  document.querySelector("#value-of-pressure").innerHTML = pressure;
  document.querySelector("#value-of-temp").innerHTML = temp;
  document.querySelector("#value-of-humidity").innerHTML = humidity;
  document.querySelector("#value-of-wind").innerHTML = wind;
  document.querySelector("#value-of-weather").innerHTML = weather;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentTemp);
}
function search() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", search);

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", changeOnFahrenheits);

//function changeOnFahrenheits(response) {
//  let temp = Math.round(response.data.main.temp);
//  let temperature = document.querySelector("#value-of-temp");
//  let fahrenheitClick = Math.round(temp * 1.8 + 32);
//  temperature.innerHTML = fahrenheitClick;
//}

//function changeOneCelsius() {
//  let temp = document.querySelector("#value-of-temp");
//  let celsiusClick = Math.round((73 - 32) * 0.5556);
//  temp.innerHTML = celsiusClick;
//}

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", changeOneCelsius);
