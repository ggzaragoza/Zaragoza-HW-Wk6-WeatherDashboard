var apiKey = "38a07745366c739b58fb8517656acd34";

function getCoordinates() {
    var citySearch = document.getElementById('city-search');
    var city = citySearch.value;
    
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
      
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
            }
        )
        .then(function (data) {
            coordinates = [data.coord.lat, data.coord.lon];
            searchedCity = data.name;
            displayCityName(searchedCity);              
            getForecast();
            storeCities(searchedCity);
            }
        );   
}


function displayCityName() {
    var cityName = document.getElementById('city-name');
    // cityName.innerHTML = searchedCity;

    if (cityName !== searchedCity) {
        cityName.innerHTML = searchedCity;
    }
}


var searchedCities = [];

function storeCities() {
    searchedCities.push(searchedCity);
    localStorage.setItem("cities", searchedCities);

    getStoredCities();
}


function getStoredCities() {
    localStorage.getItem("cities");

    // if (storedCities !== null) {
    //     searchedCities = storedCities;
    
    for (var i = 0; i < searchedCities.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.textContent = searchedCities[i];

        var cityHistory = document.getElementById('city-buttons');
        cityHistory.appendChild(cityButton);
    }
    
    // var cityHistory = document.getElementById('city-buttons');
    // cityHistory.appendChild(cityButton);
}


// function renderCityButtons() {
//     for (var i = 0; i < searchedCities.length; i++) {
//         var cityButton = document.createElement("button");
//         cityButton.textContent = searchedCities[i];
//     }

//     var cityHistory = document.getElementById('city-buttons');
//     cityHistory.appendChild(cityButton);
// }
    
    
function getForecast() {    
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&appid=" + apiKey + "&units=imperial";
    
    fetch(oneCallAPI)
        .then(function (response) {
            return response.json();
            }
        )   
        .then(function (data) {
            displayForecast(data);
            }
        );
}


function displayForecast(data) {
    var iconEl = document.getElementById('icon');
    iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

    var currentCityTemp = document.getElementById('city-temp');
    currentCityTemp.textContent = data.current.temp + "\u00B0" + "F";

    var currentWind = document.getElementById('wind-speed');
    currentWind.textContent = data.current.wind_speed + " MPH";

    var currentHumid = document.getElementById('humidity');
    currentHumid.textContent = data.current.humidity + "%";

    var currentUV = document.getElementById('uv-index');
    currentUV.textContent = data.current.uvi;

    var fiveDayDiv = document.getElementById('five-day');
    fiveDayDiv.innerHTML = '';

    for (var i = 1; i < 6; i++) {
        var futureIcon = document.createElement('img');
        futureIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");

        var futureTemp = document.createElement('p');
        futureTemp.textContent = data.daily[i].temp.day + "\u00B0" + "F";

        var futureWind = document.createElement('p');
        futureWind.textContent = data.daily[i].wind_speed + " MPH";

        var futureHumid = document.createElement('p');
        futureHumid.textContent = data.daily[i].humidity + "%";

        var singleDay = document.createElement('div');
        singleDay.appendChild(futureIcon);
        singleDay.appendChild(futureTemp);
        singleDay.appendChild(futureWind);
        singleDay.appendChild(futureHumid);

        fiveDayDiv.appendChild(singleDay);
    }

    return;       
}


var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getCoordinates);
// submitBtn.addEventListener('click', storeCities);