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

var displayWeather = function(data, searchCity) {
    currentWeatherDiv.textContent = "";
    currentHeader.textContent = searchCity;

    var currentDate = document.createElement("span")
    currentDate.textContent =" - "+ moment().format("MMM D, YYYY") +" ";
    currentHeader.appendChild(currentDate);

    var weatherImg = document.createElement("img")
    weatherImg.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    currentHeader.appendChild(weatherImg);

    // these do not show on page
    var temperature = document.createElement("span");
    temperature.textContent = "Temp: " + data.main.temp + " °F";
    temperature.classList = "list-group-item";
    //currentWeatherDiv.appendChild(temperature);

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
    humidity.classList = "list-group-item";
    //currentWeatherDiv.appendChild(humidity);

    var wind = document.createElement("span");
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    wind.classList = "list-group-item";
    //currentWeatherDiv.appendChild(wind);

};



var getFiveDay = function(city) {

var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

fetch(apiUrl)
.then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      displayFiveDay(data);
    });
  } else {
    alert('Error: City Not Found');
  }
})
.catch(function(error) {
  alert("Unable to connect to OpenWeather");
});
};

var displayFiveDay = function(data) {
  fiveDayDiv.textContent = "";
  fiveDayHeader.textContent = "Five Day Forecast:";

  var forecast = data.list;
    for(var i = 5; i < forecast.length; i = i + 8){
    var dailyForecast = forecast[i];

  var forecastDiv = document.createElement("div")
  forecastDiv.class = "card bg-secondary text-dark m-2";
  //console.log(dailyForecast);

  var forecastDate = document.createElement("h5")
  forecastDate.textContent = moment(dailyForecast.dt).format("MMM D, YYYY");
  forecastDate.classList = "card-header text-center";
  forecastDiv.appendChild(forecastDate);

  var weatherIcon = document.createElement("img")
  weatherIcon.classList = "card-body text-center";
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
  forecastDiv.appendChild(weatherIcon);

  fiveDayDiv.appendChild(forecastDiv);
  
  }
}


// add searched cities to localstorage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};
// clear searched cities from localstorage


// add event listeners for search button and saved cities
searchButton.addEventListener("click", formSubmitHandler);