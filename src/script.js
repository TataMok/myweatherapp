function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if ((hours, 10)) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if ((minutes, 10)) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["wed", "thu", "fri", "sat", "sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
           <div class="col">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                    <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.weather[0].icon
                    }.png" alt="" width="36" />
                </di>
                <div class="forecast-weather-1" id="forecast1">
                    <i class="fa-solid fa-cloud-sun"></i>
                </div>
                <span class="forecast-temp-top-1"> ${Math.round(
                  forecastDay.temp.max
                )}°C</span>
                <span class="forecast-temp-bottom-1"> ${Math.round(
                  forecastDay.temp.min
                )}°C</span>
            
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let apiKey = "512dt820d5aa382ofe0da024901542b3";
  let city = document.querySelector("#search-text-input");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&appid=${apiKey}&units=metric`;

  https: axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `Searching for ${searchInput.value}`;
  } else {
    h1.innerHTML = undefined;
    alert("Please type a city");
  }
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", search);
console.log(form);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "512dt820d5aa382ofe0da024901542b3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinate.lon}&lat=${coordinate.lat}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriplionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriplionElement.innerHTML = response.data.weather[0].descriplion;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].descriplion);

  getForecast(response.data.coord);
}
search("Tallinn");
