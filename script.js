favoritesEl=document.getElementById("Favorites");
inputEl=document.getElementById("serchCity");
currentDayEl=document.getElementById("CurrentDaysWeather");
submitSearchBtn=document.getElementById("submitBtn");




//request data from oneweather API
var WeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=fac969b25d4eb179bf7de6d01c2e017f'
function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status);
        if (response.status !== 200) {
          currentDayEl.textcontent = response.status;
          console.log(data.humidity);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
// getApi(WeatherURL);


//listening for click on search button
submitSearchBtn.addEventListener('click', getApi(WeatherURL));