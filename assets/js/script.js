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
var cityInput = inputEl.value.trim();

if (cityInput) {
getWeather(cityInput);
getFiveDay(cityInput);

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
          displayWeather(response, city);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
};

var getFiveDay = function(city) {

var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

fetch(apiUrl)
.then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      console.log(data);
      // displayWeather(data, city);
    });
  } else {
    alert('Error: City Not Found');
  }
})
.catch(function(error) {
  alert("Unable to connect to OpenWeather");
});
};

var displayWeather = function(response, city) {
    currentWeatherDiv.textContent = "";
    currentHeader.textContent = city;

    var currentDate = document.createElement("span")
    currentDate.textContent =" "+ moment(response.dt).format("MMM D, YYYY") +" ";
    currentHeader.appendChild(currentDate);
};


// add searched cities to localstorage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};
// clear searched cities from localstorage


// add event listeners for search button and saved cities
searchButton.addEventListener("click", formSubmitHandler);