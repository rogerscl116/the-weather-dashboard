// declared variables
var searchButton = document.querySelector("#search-button");
var clearButton = document.querySelector("#clear-button");
var inputEl = document.querySelector("#city");
var apiKey = "259fafdbfd373c06e5bf522bb9ac44cc"


// create function when search button is clicked
// function getWeather()
var inputValue = inputEl.value;

// fetch current weather from api
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`)
.then(function(response) {
    response.json()
    .then(function(data) {
    })
});


// locally store cities searched



// add search button event listener for new city
// searchButton.addEventListener("submit", 


// add button event listeners for saved cities



//clear searched cities from localstorage
