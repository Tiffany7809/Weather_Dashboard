
var cityFormEl=document.querySelector("#cityForm");
var cityInputEl=document.querySelector("#cityInput");
var weatherContainerEl=document.querySelector("#todaysWeather");
var citySearchInputEl = document.querySelector("#cityQuerey");
var forecastTitle = document.querySelector("#weekForecast");
var forecastContainerEl = document.querySelector("#forecastSection");
var pastSearchButtonEl = document.querySelector("#Favorites");

var cities = [];

var formSumbitHandler = function(e){
    e.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        fiveDay(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    favoritesSearch(city);
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
   //clearing the search bar
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

    //setting up access to the weather icons
    const Icon = document.createElement("img")
    Icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(Icon);
 
   //showing the date
   const todaysDate = document.createElement("div")
   //using moment to show date and time
   todaysDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(todaysDate);

   //element to hold temperature data
   const tempEl = document.createElement("div");
   tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
   tempEl.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   const humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   //create a span element to hold Wind data
   const windSpeedEl = document.createElement("div");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   //append to container
   weatherContainerEl.appendChild(tempEl);
   weatherContainerEl.appendChild(humidityEl);
   weatherContainerEl.appendChild(windSpeedEl);

   const lat = weather.coord.lat;
   const lon = weather.coord.lon;
   uvi(lat,lon)
}

//function to get the uvi from the database
var uvi = function(lat,lon){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvi(data)
        });
    });
}
 
//function to display the uvi retrieved from the database
var displayUvi = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    weatherContainerEl.appendChild(uvIndexEl);
}

//retrieve five day forcast from the database
var fiveDay = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           displayFiveDay(data);
        });
    });
};

var displayFiveDay = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

//function for displaying the past searches as a button
var favoritesSearch = function(pastSearch){

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastFavoritesHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        fiveDay(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastFavoritesHandler);