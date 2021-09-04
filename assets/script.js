// base URL for calling current weather data API:
// http://api.openweathermap.org/data/2.5/weather

var apiKey = "38a07745366c739b58fb8517656acd34";

var city;

// var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

function getAPI() {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.textContent = data[i].html_url;
          repoList.appendChild(listItem);
        }
      });
  }

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getAPI);