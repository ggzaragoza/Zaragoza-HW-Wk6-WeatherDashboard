var apiKey = "38a07745366c739b58fb8517656acd34";

function getCoordinates(event, savedCity) {
    event.preventDefault();

    var citySearch = document.getElementById('city-search');
    var city = citySearch.value;

    if (savedCity) {
        city = savedCity
    }
    
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
            getStoredCities(searchedCity);
            }
        );   
}


function displayCityName() {
    var cityName = document.getElementById('city-name');
    cityName.innerHTML = "<h2>" + searchedCity + "</h2>";
}


var searchedCities = [];

function storeCities() {
    searchedCities.push(searchedCity);
    localStorage.setItem("cities", searchedCities);
}


function getStoredCities() {
    localStorage.getItem("cities");

    var cityHistory = document.getElementById('city-buttons');
    cityHistory.innerHTML = '';

    for (var i = 0; i < searchedCities.length; i++) {
        var cityButton = document.createElement("button");

        cityButton.addEventListener('click', function(event) {
            getCoordinates(event, event.target.textContent)
        })

        cityButton.textContent = searchedCities[i];
        cityHistory.appendChild(cityButton);
    }

    function clearHistory() {
        cityHistory.innerHTML = '';
    }

    var clearCities = document.getElementById('clear-cities');
    clearCities.addEventListener('click', clearHistory);
}
    
    
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
    var date = moment.unix(data.current.dt).format("dddd, MMMM D, YYYY");
    var dateEl = document.getElementById('date');
    dateEl.innerHTML = "<h3>" + date + "</h3>";

    var iconEl = document.getElementById('icon');
    iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

    var currentCityTemp = document.getElementById('city-temp');

        currentCityTemp.innerHTML = '';

        var tempHeading = document.createElement('h4');
        tempHeading.textContent = "CURRENT";

        var tempValue = document.createElement('h3');
        tempValue.textContent = data.current.temp + "\u00B0" + "F";

        currentCityTemp.appendChild(tempHeading);
        currentCityTemp.appendChild(tempValue);

    var currentWind = document.getElementById('wind-speed');

        currentWind.innerHTML = '';

        var windHeading = document.createElement('h4');
        windHeading.textContent = "WIND SPEED";

        var windValue = document.createElement('h3');
        windValue.textContent = data.current.wind_speed + " MPH";

        currentWind.appendChild(windHeading);
        currentWind.appendChild(windValue);

    var currentHumid = document.getElementById('humidity');

        currentHumid.innerHTML = '';

        var humidHeading = document.createElement('h4');
        humidHeading.textContent = "HUMIDITY";

        var humidValue = document.createElement('h3');
        humidValue.textContent = data.current.humidity + "%";

        currentHumid.appendChild(humidHeading);
        currentHumid.appendChild(humidValue);

    var currentUV = document.getElementById('uv-index');

        currentUV.innerHTML = '';

        var uvHeading = document.createElement('h4');
        uvHeading.textContent = "UV INDEX";

        var uvValue = document.createElement('h3');
        uvValue.textContent = data.current.uvi;

        var uvLevel = document.createElement('h5');

            if ((Math.trunc(data.current.uvi)) <= 2) {
                uvLevel.textContent = "Low";
            } else if ((Math.trunc(data.current.uvi)) === 3 || (Math.trunc(data.current.uvi)) === 4 || (Math.trunc(data.current.uvi)) === 5) {
                uvLevel.textContent = "Moderate";
            } else if ((Math.trunc(data.current.uvi)) === 6 || (Math.trunc(data.current.uvi)) === 7) {
                uvLevel.textContent = "High";
            } else if ((Math.trunc(data.current.uvi)) === 8 || (Math.trunc(data.current.uvi)) === 9 || (Math.trunc(data.current.uvi)) === 10) {
                uvLevel.textContent = "Very High";
            } else {
                uvLevel.textContent = "Extreme";
            }

        currentUV.appendChild(uvHeading);
        currentUV.appendChild(uvValue);
        currentUV.appendChild(uvLevel);

    var fiveDayDiv = document.getElementById('five-day');
    fiveDayDiv.innerHTML = '';

    for (var i = 1; i < 6; i++) {
        var futureDate = moment.unix(data.daily[i].dt).format("MM/DD");
        var futureDateEl = document.createElement('h4');
        futureDateEl.textContent = futureDate;

        var futureIcon = document.createElement('img');
        futureIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");

        var futureTemp = document.createElement('p');
        futureTemp.textContent = data.daily[i].temp.day + "\u00B0" + "F";

        var futureWind = document.createElement('p');
        futureWind.textContent = data.daily[i].wind_speed + " MPH";

        var futureHumid = document.createElement('p');
        futureHumid.textContent = data.daily[i].humidity + "%";

        var singleDay = document.createElement('div');
        singleDay.appendChild(futureDateEl);
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