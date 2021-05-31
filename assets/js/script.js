// declared variables
var cities = [];
var searchButton = document.querySelector("#search-button");
var historyButtons = document.querySelector("#history-buttons");
var inputEl = document.querySelector("#city");
var currentWeatherDiv = document.querySelector("#current-weather-container")
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
cities.unshift({city});

saveSearch();
searchHistory(city);

// clear old content
inputEl.value = "";
} else {
alert("Please enter a city.");
}
};

// create function when search button is clicked
// fetch current weather from api
var getWeather = function(city) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=259fafdbfd373c06e5bf522bb9ac44cc"

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
    var currentWeatherDiv = document.getElementById("current-weather-container");
    currentWeatherDiv.textContent = "";
    currentHeader.textContent = searchCity;

    var currentDate = document.createElement("span")
    currentDate.textContent = ": "+ moment().format("MMM D, YYYY") +" ";
    currentHeader.appendChild(currentDate);

    var weatherImg = document.createElement("img")
    weatherImg.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    currentHeader.appendChild(weatherImg);

    var temperature = document.createElement("span");
    temperature.textContent = "Temp: " + data.main.temp + " °F";
    temperature.classList = "list-group-item";
    currentWeatherDiv.appendChild(temperature);

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
    humidity.classList = "list-group-item";
    currentWeatherDiv.appendChild(humidity);

    var wind = document.createElement("span");
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    wind.classList = "list-group-item";
    currentWeatherDiv.appendChild(wind);

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    getUvIndex(lat, lon);

};

var getUvIndex = function (lat, lon) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=259fafdbfd373c06e5bf522bb9ac44cc"

  fetch(apiUrl)
  .then(function(response) {
    response.json().then(function(data) {
    displayUvIndex(data)
    })
  })
}

var displayUvIndex = function (index) {
  var currentWeatherDiv = document.getElementById("current-weather-container");
  var uvIndex = document.createElement("div");
  uvIndex.textContent = "UV Index: ";
  uvIndex.classList = "list-group-item";
  
  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value; 

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable"
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList= "moderate"
  }
  else {
    uvIndexValue.classList = "severe"
  };

  uvIndex.appendChild(uvIndexValue);
  currentWeatherDiv.appendChild(uvIndex);
  }


var getFiveDay = function(city) {

var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=259fafdbfd373c06e5bf522bb9ac44cc"

fetch(apiUrl)
.then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      displayFiveDay(data);
    });
  }
})
};

var displayFiveDay = function(data) {
  var fiveDayDiv = document.getElementById("five-day-container");
  fiveDayDiv.textContent = "";
  fiveDayHeader.textContent = "Five Day Forecast:";

  var forecast = data.list;
    for(var i = 5; i < forecast.length; i = i + 8){
    var dailyForecast = forecast[i];

  var forecastDiv = document.createElement("div")
  forecastDiv.classList = "card bg-secondary text-light m-2";

  var forecastDate = document.createElement("h5")
  forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
  forecastDate.classList = "card-header text-center";
  forecastDiv.appendChild(forecastDate);

  var weatherIcon = document.createElement("img")
  weatherIcon.classList = "card-body";
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + dailyForecast.weather[0].icon + ".png");
  forecastDiv.appendChild(weatherIcon);

  var forecastTemp = document.createElement("span")
  forecastTemp.classList = "card-body";
  forecastTemp.textContent = "Temp: " + dailyForecast.main.temp + " °F";
  forecastDiv.appendChild(forecastTemp);

  var forecastHumidity = document.createElement("span");
  forecastHumidity.classList = "card-body";
  forecastHumidity.textContent = "Humidity: " + dailyForecast.main.humidity + " %";
  forecastDiv.appendChild(forecastHumidity);

  var forecastWind = document.createElement("span");
  forecastWind.classList = "card-body";
  forecastWind.textContent = "Wind: " + dailyForecast.wind.speed + " MPH";
  forecastDiv.appendChild(forecastWind);

  fiveDayDiv.appendChild(forecastDiv);
  
  }
}


// add searched cities to localstorage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var searchHistory = function(searchHistory) {

  searchHistoryBtn = document.createElement("button");
  searchHistoryBtn.textContent = searchHistory;
  searchHistoryBtn.classList = "d-flex w-100 btn-secondary text-light border m-2 p-2";
  searchHistoryBtn.setAttribute("data-city", searchHistory);
  searchHistoryBtn.setAttribute("type", "submit");

  historyButtons.prepend(searchHistoryBtn);

}

  var searchHistoryHandler = function (event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
      getWeather(city);
      getFiveDay(city);
    }
  }

// add event listeners for search button and saved cities
searchButton.addEventListener("click", formSubmitHandler);
historyButtons.addEventListener("click", searchHistoryHandler);

// fix bugs with UV Index