favoritesEl=document.getElementById("Favorites");
inputEl=document.getElementById("serchCity");
currentDayEl=document.getElementById("CurrentDaysWeather");
cityEl=document.getElementById("cityName")
tempEl=document.getElementById("temperature")
humidityEl=document.getElementById("humidity")
windEl=document.getElementById("windSpeed")
UvEl=document.getElementById("uvIndex")
submitSearchBtn=document.getElementById("submitBtn");





//request data from oneweather API
var WeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.37&lon=122.20&appid=fac969b25d4eb179bf7de6d01c2e017f'
function getApi(WeatherURL) {
    fetch(WeatherURL)
      .then(function (response) {
        console.log(response.status);
        if (response.status !== 200) {
          console.log(response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.current.humidity)
        console.log(data.current.uvi)
        console.log(data.current.temp)
        console.log(data.current.wind_speed)

        cityEl.textContent=data.timezone;
        windEl.textContent="Wind Speed:" + " " + data.current.wind_speed;
        tempEl.textContent="Temp:" + " " + data.current.temp;
        UvEl.textContent="UV Index:" + " " + data.current.uvi;
        humidityEl.textContent="Humidity" + " " + data.current.humidity;

      });
      
  }



//listening for click on search button
submitSearchBtn.addEventListener('click', getApi(WeatherURL));