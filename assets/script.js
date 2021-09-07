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
            }
        );
    
}


function displayCityName() {
    var cityName = document.getElementById('city-name');
    cityName.innerHTML = searchedCity;
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

    var iconEl = document.getElementById('icon');
    iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

    var currentCityTemp = document.getElementById('city-temp');
    currentCityTemp.innerHTML = data.current.temp + "\u00B0" + "F";

    var currentWind = document.getElementById('wind-speed');
    currentWind.innerHTML = data.current.wind_speed + " MPH";

    var currentHumid = document.getElementById('humidity');
    currentHumid.innerHTML = data.current.humidity + "%";

    var currentUV = document.getElementById('uv-index');
    currentUV.innerHTML = data.current.uvi;
        
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