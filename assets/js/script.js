// declared variables
var cities = [];
var searchButton = document.querySelector("#search-button");
var clearButton = document.querySelector("#clear-button");
var inputEl = document.querySelector("#city");
var currentWeatherDiv = document.querySelector("#current-weather-container");
var fiveDayDiv = document.querySelector("#five-day-container");
var currentHeader = document.querySelector("#searched-city");
var fiveDayHeader = document.querySelector("#forecast");


var formSubmitHandler = function(event) {

// prevent page from refreshing
event.preventDefault();

// get value from input element
var city = inputEl.value.trim();

if (city) {
getWeather(city);
getFiveDay(city);

// clear old content
currentWeatherDiv = "";
fiveDayDiv = "";
inputEl.value = "";
} else {
alert("Please enter a city.");
}
// saveSearch();
// pastSearch(cityInput);
};


// create function when search button is clicked
// fetch current weather from api
var getWeather = function(city) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

 fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          displayWeather(data, city);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });

var displayWeather = function(response, city) {
    currentWeatherDiv.textContent = "";
    currentHeader.textContent = city;
    currentHeader.setAttribute("style", "font-style: italic");

    var currentDate = document.createElement("span")
    currentDate.textContent =" - "+ moment().format("MMM D, YYYY") +" ";
    currentHeader.appendChild(currentDate);

    var weatherImg = document.createElement("img")
    weatherImg.setAttribute("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    currentHeader.appendChild(weatherImg);

    var temperature = document.createElement("span");
    temperature.textContent = "Temp: " + response.main.temp + " °F";
    temperature.classList = "list-group-item"

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + response.main.humidity + " %";
    humidity.classList = "list-group-item"

    var wind = document.createElement("span");
    wind.textContent = "Wind: " + response.wind.speed + " MPH";
    wind.classList = "list-group-item"

    var description = document.createElement("span");
    description.textContent = response.weather.description;
    description.classList = "list-group-item"
    // fix bug
    currentWeatherDiv.appendChild(temperature);







};
};


var getFiveDay = function(city) {

var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

fetch(apiUrl)
.then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      console.log(data);
      //displayWeather(data, city);
    });
  } else {
    alert('Error: City Not Found');
  }
})
.catch(function(error) {
  alert("Unable to connect to OpenWeather");
});
};

// add searched cities to localstorage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};
// clear searched cities from localstorage


// add event listeners for search button and saved cities
searchButton.addEventListener("click", formSubmitHandler);