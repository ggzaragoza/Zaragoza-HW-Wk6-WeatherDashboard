var apiKey = "38a07745366c739b58fb8517656acd34";

function getCoordinates() {

    var citySearch = document.getElementById('city-search');
    var city = citySearch.value;

    if(city) {
        citySearch.value = '';
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
            }
        );
    
}


function displayCityName() {
    var cityName = document.getElementById('city-name');
    cityName.innerHTML = searchedCity;

    var cityList = "searchHistory";

    localStorage.setItem(cityList, searchedCity);
}
    
    
function getForecast() {
    
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&appid=" + apiKey + "&units=imperial";
    
    fetch(oneCallAPI)
        .then(function (response) {
            return response.json();
            }
        )   
        .then(function (data) {
            console.log(data);
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

        var fiveDayDiv = document.getElementById('five-day');
        fiveDayDiv.appendChild(singleDay);
    }

    return;
        
}


var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getCoordinates)




        // var currentTime = moment().format("h:mm a");
        // var today = moment().format("dddd, MMMM D, YYYY");

// for (var i = 0; i < data.length; i++) {
//     var listItem = document.createElement('li');
//     listItem.textContent = data[i].html_url;
//     repoList.appendChild(listItem);
//   }

                // console.log(data);
                // var cityName = data.name;
                // var cityTemp = data.main.temp;
                // var windSpeed = data.wind.speed;
    
                // var currentForecast = document.createElement('h2');
                // var forecastEl = document.getElementById('forecast');
                
                // currentForecast.textContent =
                // "It is " + currentTime + " on " + today + " in " + cityName + ". " +
                // "It is currently " + cityTemp + "\u00B0" + "F. " +
                // "Gusts have been recorded at " + windSpeed + " MPH.";
    
                // forecastEl.appendChild(currentForecast);
    
                // var unixTime = data.dt;
    
                // var timezone =
                // var timestamp = moment.unix(data.dt);
                // var currentTime = timestamp.format("HH:mm:ss");