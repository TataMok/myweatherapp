let now = new Date();
let li = document.querySelector("li");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

li.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["wed", "thu", "fri", "sat", "sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
            <div class="col">
                <p>${day}
                    <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="36" />
                </p>
                <div class="forecast-weather-1" id="forecast1">
                    <i class="fa-solid fa-cloud-sun"></i>
                </div>
                <span class="forecast-temp-top-1">-4°C</span>
                <span class="forecast-temp-bottom-1">-7°C</span>
            
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let city = document.querySelector("#search-text-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  displayForecast();
}
