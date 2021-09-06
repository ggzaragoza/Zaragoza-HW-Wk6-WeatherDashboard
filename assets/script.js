

// base URL for calling current weather data API:
// http://api.openweathermap.org/data/2.5/weather

var apiKey = "38a07745366c739b58fb8517656acd34";

// var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

function getAPI() {

    // var currentTime = moment().format("h:mm a");
    // var today = moment().format("dddd, MMMM D, YYYY");

    var citySearch = document.getElementById('city-search');
    var city = citySearch.value;

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
  
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
      })
        
        .then(function (data) {
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

            var latitude = data.coord.lat;
            var longitude = data.coord.lon;

            var cityName = document.getElementById('city-name');
            cityName.innerHTML = "It is " + data.name + ".";

            // var iconEl = document.createElement('img');
            var iconEl = document.getElementById('icon');
            iconEl.setAttribute('src', data.weather.icon);

            var cityTemp = document.getElementById('city-temp');
            cityTemp.innerHTML = "It is currently " + data.main.temp + "\u00B0" + "F.";

            var windSpeed = document.getElementById('wind-speed');
            windSpeed.innerHTML = data.wind.speed + " MPH";

            var humidity = document.getElementById('humidity');
            humidity.innerHTML = data.main.humidity;

            return (latitude, longitude);
      });

    var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

    fetch(queryUrl2)
        .then(function (response) {
            return response.json();
      })

        .then(function (data) {
            var uvIndex = document.getElementById('uv-index');
            uvIndex.innerHTML = "data.current.uvi";
      })

  }

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getAPI);




// for (var i = 0; i < data.length; i++) {
//     var listItem = document.createElement('li');
//     listItem.textContent = data[i].html_url;
//     repoList.appendChild(listItem);
//   }