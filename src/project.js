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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherTemplate(response) {
  let forecastElement = document.querySelector("#template-forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
            <div class="col-2">
              <div class="cards">
                <div class="day-of-week">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="cloudy"
                  width="42"
                />
                <div class="temp-forecast">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            </div>
          
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherTemplate);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#button-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
  getWeather(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function getWeather(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeWeather);
}

let tempForChanges = null;

function changeWeather(response) {
  tempForChanges = response.data.main.temp;
  let temp = Math.round(tempForChanges);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let weatherFirst = response.data.weather[0].description;
  const weather = weatherFirst.charAt(0).toUpperCase() + weatherFirst.slice(1);
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#weather-icon");
  document.querySelector("#value-of-temp").innerHTML = temp;
  document.querySelector("#value-of-pressure").innerHTML = pressure;
  document.querySelector("#value-of-humidity").innerHTML = humidity;
  document.querySelector("#value-of-wind").innerHTML = wind;
  document.querySelector("#value-of-weather").innerHTML = weather;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function currentTemp(response) {
  let city = response.data.name;
  let pressure = response.data.main.pressure;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let weatherFirst = response.data.weather[0].description;
  const weather = weatherFirst.charAt(0).toUpperCase() + weatherFirst.slice(1);
  let iconElement = document.querySelector("#weather-icon");
  document.querySelector("h2").innerHTML = city;
  document.querySelector("#value-of-pressure").innerHTML = pressure;
  document.querySelector("#value-of-temp").innerHTML = temp;
  document.querySelector("#value-of-humidity").innerHTML = humidity;
  document.querySelector("#value-of-wind").innerHTML = wind;
  document.querySelector("#value-of-weather").innerHTML = weather;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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

let tempForCelsius = null;

function changeOnFahrenheits() {
  let temperature = document.querySelector("#value-of-temp");
  let fahrenheitClick = Math.round((tempForChanges * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitClick;
  tempForCelsius = fahrenheitClick;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeOnFahrenheits);

function changeOneCelsius() {
  let temp = document.querySelector("#value-of-temp");
  temp.innerHTML = Math.round(tempForChanges);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeOneCelsius);

getWeather("Kyiv");
