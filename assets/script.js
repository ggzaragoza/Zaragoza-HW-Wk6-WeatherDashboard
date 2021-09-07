// base URL for calling current weather data API:
// http://api.openweathermap.org/data/2.5/weather










var apiKey = "38a07745366c739b58fb8517656acd34";

// var citySearch = document.getElementById('city-search');
// var city = citySearch.value;



    function getCoordinates() {

        var citySearch = document.getElementById('city-search');
        var city = citySearch.value;
    
        // var currentTime = moment().format("h:mm a");
        // var today = moment().format("dddd, MMMM D, YYYY");
    
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
      
        fetch(queryUrl)
            .then(function (response) {
                return response.json();
                }
            )
            .then(function (data) {
                console.log(data);
                coordinates = [data.coord.lat, data.coord.lon];
                console.log(coordinates);
                
                getForecast();

                }
            );
    
    }
    
    // var cityCoordinates = getCoordinates();
    // var latitude = coordinates[0];
    // var longitude = coordinates[1];
    
    function getForecast() {
    
        var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&appid=" + apiKey + "&units=imperial";
    
        fetch(oneCallAPI)
            .then(function (response) {
                return response.json();
                }
            )
        
        .then(function (data) {
                console.log(data);
                return data;
                }
            );
    }







  

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getCoordinates)

//     var citySearch = document.getElementById('city-search');
//     var city = citySearch.value;

// });
// submitBtn.addEventListener('click', getForecast);




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