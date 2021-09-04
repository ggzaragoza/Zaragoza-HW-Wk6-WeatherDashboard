// base URL for calling current weather data API:
// http://api.openweathermap.org/data/2.5/weather

var apiKey = "38a07745366c739b58fb8517656acd34";

// var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

function getAPI() {

    var citySearch = document.getElementById('city-search');
    var city = citySearch.value;

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
  
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
      })
        
        .then(function (data) {
            var cityTemp = document.getElementById('city-temp');
            cityTemp.innerHTML = data.main.temp;
      });
  }

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getAPI);




// for (var i = 0; i < data.length; i++) {
//     var listItem = document.createElement('li');
//     listItem.textContent = data[i].html_url;
//     repoList.appendChild(listItem);
//   }