favoritesEl=document.getElementById("Favorites");
inputEl=document.getElementById("citySearch");
currentDayEl=document.getElementById("CurrentDaysWeather");
cityEl=document.getElementById("cityName");
tempEl=document.getElementById("temperature");
humidityEl=document.getElementById("humidity");
windEl=document.getElementById("windSpeed");
UvEl=document.getElementById("uvIndex");
submitSearchBtn=document.getElementById("submitBtn");
Today=document.getElementById("currentDate");
Day1=document.getElementById("Day1");
Day2=document.getElementById("Day2");
Day3=document.getElementById("Day3");
Day4=document.getElementById("Day4");
Day5=document.getElementById("Day5");
imageEl=document.getElementById("current")

localStorage.setItem("favoritesList", favoritesEl);




var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');
var clearBtn = $('#clear-button');
var pastSearchedCitiesEl = $('#past-searches');

var currentCity;

var APIkey = 'fac969b25d4eb179bf7de6d01c2e017f'
/// use Open Weather 'Current weather data (API)' to get city coordinates to then send to 'One Call API' to get weather
function getCoordinates () {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    fetch(requestUrl)
      .then(function (response) {
        if (response.status <= 200) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
      })
      .then(function(data) {
 
        var cityInfo = {
            city: currentCity,
            lon: data.coord.lon,
            lat: data.coord.lat
        }

        return cityInfo;
      })
      .then(function (data) {
        getWeather(data);
      })
      return;
}