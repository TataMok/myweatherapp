let now = new Date();
let li = document.querySelector("li");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

li.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-text-input");
  let city = document.querySelector("h1");
  if (searchCity.value) {
    city.innerHTML = `${searchCity.value}`;
  } else {
    city.innerHTML = null;
    alert("Please type a city");
  }
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function current(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-location-button");
  alert`${currentCity}`;
}
let button = document.querySelector(".current-location");
button.addEventListener("current");

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.name;
}
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
