// declared variables
var searchButton = document.querySelector("#search-button");
var clearButton = document.querySelector("#clear-button");
var inputEl = document.querySelector("#city");
var currentWeatherDiv = document.querySelector("#current-weather-container");
var fiveDayDiv = document.querySelector("#five-day-container");

var formSubmitHandler = function(event) {

// prevent page from refreshing
event.preventDefault();

// get value from input element
var cityInput = inputEl.value.trim();

if (cityInput) {
getWeather(cityInput);


// clear old content
currentWeatherDiv = "";
fiveDayDiv = "";
inputEl.value = "";
} else {
alert("Please enter a city.");
}
};


// create function when search button is clicked
// fetch current weather from api
var getWeather = function(city) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

 fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
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
};



// add searched cities to localstorage
// clear searched cities from localstorage


// add event listeners for search button and saved cities
searchButton.addEventListener("submit", formSubmitHandler);