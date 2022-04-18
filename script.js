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




submitSearchBtn.addEventListener("click",function(){
  event.preventDefault();
 
  // var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fac969b25d4eb179bf7de6d01c2e017f'

  //getting user input
  var qparam = inputEl.value;
  inputEl.value= " ";
  

  //saving user input to local storage
  localStorage.setItem("Recent" , qparam);

  //appening to favorites list
  var RecentSearch=localStorage.getItem('Recent');
  
  favoritesEl.append(RecentSearch);

  console.log(qparam);

  //function to call city from search bard
      function currentCondition(qparam) {
        var qparam = inputEl.value;
     
      var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${qparam}&units=imperial&appid=fac969b25d4eb179bf7de6d01c2e017f`;

        fetch({
            url: cityURL,
            method: "GET"
            }).then(function(cityWeatherResponse) {

            console.log(cityWeatherResponse);
            console.log(cityURL);
            // console.log(data)
            return cityWeatherResponse.json;
            });
          }
       
currentCondition();

})
















//request data from oneweather API
var WeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.6062&lon=-122.3321&units=imperial&appid=fac969b25d4eb179bf7de6d01c2e017f'
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
        console.log(data)
        console.log(data.current.wind_speed)

        cityEl.textContent=data.timezone;
        Today.textContent = moment().format("(M/D/YY)")
        windEl.textContent="Wind Speed:" + " " + data.current.wind_speed + "MPH";
        tempEl.textContent="Temp:" + " " + data.current.temp + "°" + "F";
        UvEl.textContent="UV Index:" + " " + data.current.uvi;
        humidityEl.textContent="Humidity" + " " + data.current.humidity + "%";

        

        function Forcast(){
          
          //setting UVI color
          if (data.current.uvi < "2"){
            console.log("safe");
            UvEl.setAttribute("class", "safe")
  
          }else if (data.current.uvi >= "8"){
            console.log("DANGER");
            UvEl.setAttribute("class", "danger")
          }else {
            console.log("moderate");
            UvEl.setAttribute("class", "moderate")
          }

           // setting weather emojis
          if(data.current.weather[0].description === "clear sky"){
            console.log("CLEAR")
            imageEl.textContent = "🌞"
          } else if (data.current.weather[0].description === "overcast clouds") {
            imageEl.textContent = "☁️"
          } else if (data.current.weather[0].description === "few clouds") {
            imageEl.textContent="🌤"
          }else if (data.current.weather[0].description === "scattered clouds") {
            imageEl.textContent = "☁️"
          }else if (data.current.weather[0].description === "broken clouds") {
            imageEl.textContent="🌤"
          }else if (data.current.weather[0].description === "shower rain") {
            imageEl.textContent="🌧"
          }else if (data.current.weather[0].description === "rain") {
            imageEl.textContent="🌧"
          }else if (data.current.weather[0].description === "thunderstorm") {
            imageEl.textContent="⛈"
          }else if (data.current.weather[0].description === "snow"){
            imageEl.textContent="🌨"
          }else {
            imageEl.textContent="🌫"
          };


          //day 1 forcast
          current1=document.createElement("p");
          forcast1=document.createElement("p");
          Wind1=document.createElement("p");
          Temp1=document.createElement("p");
          UV1=document.createElement("p");
          Humidity1=document.createElement("p");


          forcast1.textContent=moment().add(1, "days").format("(M/D/YY)");
          Wind1.textContent="Wind Speed:" + " " + data.daily[0].wind_speed + "MPH";
          Temp1.textContent="Temp:" + " " + data.daily[0].temp.day + "°" + "F";
          UV1.textContent="UV Index:" + " " + data.daily[0].uvi;
          Humidity1.textContent="Humidity" + " " + data.daily[0].humidity + "%";

          Day1.append(forcast1)
          Day1.append(current1)
          Day1.append(Wind1)
          Day1.append(Temp1)
          Day1.append(UV1)
          Day1.append(Humidity1)

          //setting UVI color
          if (data.daily[0].uvi < "2"){
            UV1.setAttribute("class", "safe")
          } else if ( data.daily[0].uvi >= "8"){
            UV1.setAttribute("class", "danger")
          } else {
            UV1.setAttribute("class", "moderate")
          }

          // setting weather emojis
          if(data.daily[0].weather[0].description === "clear sky"){
            console.log("CLEAR")
            current1.textContent = "🌞"
          } else if (data.daily[0].weather[0].description === "overcast clouds") {
            current1.textContent = "☁️"
          } else if (data.daily[0].weather[0].description === "few clouds") {
            current1.textContent="🌤"
          }else if (data.daily[0].weather[0].description === "scattered clouds") {
            current1.textContent = "☁️"
          }else if (data.daily[0].weather[0].description === "broken clouds") {
            current1.textContent="🌤"
          }else if (data.daily[0].weather[0].description === "shower rain") {
            current1.textContent="🌧"
          }else if (data.daily[0].weather[0].description === "rain") {
            current1.textContent="🌧"
          }else if (data.daily[0].weather[0].description === "thunderstorm") {
            current1.textContent="⛈"
          }else if (data.daily[0].weather[0].description === "snow"){
            current1.textContent="🌨"
          }else {
            current1.textContent="🌫"
          };

          //day 2 forcast
          current2=document.createElement("p");
          forcast2=document.createElement("p");
          Wind2=document.createElement("p");
          Temp2=document.createElement("p");
          UV2=document.createElement("p");
          Humidity2=document.createElement("p");

          forcast2.textContent=moment().add(2, "days").format("(M/D/YY)");
          Wind2.textContent="Wind Speed:" + " " + data.daily[1].wind_speed + "MPH";
          Temp2.textContent="Temp:" + " " + data.daily[1].temp.day + "°" + "F";
          UV2.textContent="UV Index:" + " " + data.daily[1].uvi;
          Humidity2.textContent="Humidity" + " " + data.daily[1].humidity + "%";

          Day2.append(forcast2)
          Day2.append(current2)
          Day2.append(Wind2)
          Day2.append(Temp2)
          Day2.append(UV2)
          Day2.append(Humidity2)

          //setting UVI color
          if (data.daily[1].uvi < "2"){
            UV2.setAttribute("class", "safe")
          } else if ( data.daily[1].uvi >= "8"){
            UV2.setAttribute("class", "danger")
          } else {
            UV2.setAttribute("class", "moderate")
          }

           // setting weather emojis
          if(data.daily[1].weather[0].description === "clear sky"){
            console.log("CLEAR")
            current2.textContent = "🌞"
          } else if (data.daily[1].weather[0].description === "overcast clouds") {
            current2.textContent = "☁️"
          } else if (data.daily[1].weather[0].description === "few clouds") {
            current2.textContent="🌤"
          }else if (data.daily[1].weather[0].description === "scattered clouds") {
            current2.textContent = "☁️"
          }else if (data.daily[1].weather[0].description === "broken clouds") {
            current2.textContent="🌤"
          }else if (data.daily[1].weather[0].description === "shower rain") {
            current2.textContent="🌧"
          }else if (data.daily[1].weather[0].description === "rain") {
            current2.textContent="🌧"
          }else if (data.daily[1].weather[0].description === "thunderstorm") {
            current2.textContent="⛈"
          }else if (data.daily[1].weather[0].description === "snow"){
            current2.textContent="🌨"
          }else {
            current2.textContent="🌫"
          };

          //day 3 forcast
          current3=document.createElement("p");
          forcast3=document.createElement("p");
          Wind3=document.createElement("p");
          Temp3=document.createElement("p");
          UV3=document.createElement("p");
          Humidity3=document.createElement("p");

          forcast3.textContent=moment().add(3, "days").format("(M/D/YY)");
          Wind3.textContent="Wind Speed:" + " " + data.daily[2].wind_speed + "MPH";
          Temp3.textContent="Temp:" + " " + data.daily[2].temp.day + "°" + "F";
          UV3.textContent="UV Index:" + " " + data.daily[2].uvi;
          Humidity3.textContent="Humidity" + " " + data.daily[2].humidity + "%";

          Day3.append(forcast3)
          Day3.append(current3)
          Day3.append(Wind3)
          Day3.append(Temp3)
          Day3.append(UV3)
          Day3.append(Humidity3)

          //setting UVI color
          if (data.daily[2].uvi < "2"){
            UV3.setAttribute("class", "safe")
          } else if ( data.daily[2].uvi >= "8"){
            UV3.setAttribute("class", "danger")
          } else {
            UV3.setAttribute("class", "moderate")
          }


           // setting weather emojis
          if(data.daily[2].weather[0].description === "clear sky"){
            console.log("CLEAR")
            current3.textContent = "🌞"
          } else if (data.daily[2].weather[0].description === "overcast clouds") {
            current3.textContent = "☁️"
          } else if (data.daily[2].weather[0].description === "few clouds") {
            current3.textContent="🌤"
          }else if (data.daily[2].weather[0].description === "scattered clouds") {
            current3.textContent = "☁️"
          }else if (data.daily[2].weather[0].description === "broken clouds") {
            current3.textContent="🌤"
          }else if (data.daily[2].weather[0].description === "shower rain") {
            current3.textContent="🌧"
          }else if (data.daily[2].weather[0].description === "rain") {
            current3.textContent="🌧"
          }else if (data.daily[2].weather[0].description === "thunderstorm") {
            current3.textContent="⛈"
          }else if (data.daily[2].weather[0].description === "snow"){
            current3.textContent="🌨"
          }else {
            current3.textContent="🌫"
          };

          //day 4 forcast
          current4=document.createElement("p");
          forcast4=document.createElement("p");
          Wind4=document.createElement("p");
          Temp4=document.createElement("p");
          UV4=document.createElement("p");
          Humidity4=document.createElement("p");

          forcast4.textContent=moment().add(4, "days").format("(M/D/YY)");
          Wind4.textContent="Wind Speed:" + " " + data.daily[3].wind_speed + "MPH";
          Temp4.textContent="Temp:" + " " + data.daily[3].temp.day + "°" + "F";
          UV4.textContent="UV Index:" + " " + data.daily[3].uvi;
          Humidity4.textContent="Humidity" + " " + data.daily[3].humidity + "%";

          Day4.append(forcast4)
          Day4.append(current4)
          Day4.append(Wind4)
          Day4.append(Temp4)
          Day4.append(UV4)
          Day4.append(Humidity4)

          //setting UVI color
          if (data.daily[3].uvi < "2"){
            UV4.setAttribute("class", "safe")
          } else if ( data.daily[3].uvi >= "8"){
            UV4.setAttribute("class", "danger")
          } else {
            UV4.setAttribute("class", "moderate")
          }


           // setting weather emojis
          if(data.daily[3].weather[0].description === "clear sky"){
            console.log("CLEAR")
            current4.textContent = "🌞"
          } else if (data.daily[3].weather[0].description === "overcast clouds") {
            current4.textContent = "☁️"
          } else if (data.daily[3].weather[0].description === "few clouds") {
            current4.textContent="🌤"
          }else if (data.daily[3].weather[0].description === "scattered clouds") {
            current4.textContent = "☁️"
          }else if (data.daily[3].weather[0].description === "broken clouds") {
            current4.textContent="🌤"
          }else if (data.daily[3].weather[0].description === "shower rain") {
            current4.textContent="🌧"
          }else if (data.daily[3].weather[0].description === "rain") {
            current4.textContent="🌧"
          }else if (data.daily[3].weather[0].description === "thunderstorm") {
            current4.textContent="⛈"
          }else if (data.daily[3].weather[0].description === "snow"){
            current4.textContent="🌨"
          }else {
            current4.textContent="🌫"
          };

          //day 5 forcast

          forcast5=document.createElement("p");
          current5=document.createElement("p");
          Wind5=document.createElement("p");
          Temp5=document.createElement("p");
          UV5=document.createElement("p");
          Humidity5=document.createElement("p");

          forcast5.textContent=moment().add(5, "days").format("(M/D/YY)");
          Wind5.textContent="Wind Speed:" + " " + data.daily[4].wind_speed + "MPH";
          Temp5.textContent="Temp:" + " " + data.daily[4].temp.day + "°" + "F";
          UV5.textContent="UV Index:" + " " + data.daily[4].uvi;
          Humidity5.textContent="Humidity" + " " + data.daily[4].humidity + "%";

          Day5.append(forcast5)
          Day5.append(current5)
          Day5.append(Wind5)
          Day5.append(Temp5)
          Day5.append(UV5)
          Day5.append(Humidity5)

          //setting UVI color
          if (data.daily[4].uvi < "2"){
            UV5.setAttribute("class", "safe")
          } else if ( data.daily[4].uvi >= "8"){
            UV5.setAttribute("class", "danger")
          } else {
            UV5.setAttribute("class", "moderate")
          }


          // setting weather emojis
          if(data.daily[4].weather[0].description === "clear sky"){
            console.log("CLEAR")
            current5.textContent = "🌞"
          } else if (data.daily[4].weather[0].description === "overcast clouds") {
            current5.textContent = "☁️"
          } else if (data.daily[4].weather[0].description === "few clouds") {
            current5.textContent="🌤"
          }else if (data.daily[4].weather[0].description === "scattered clouds") {
            current5.textContent = "☁️"
          }else if (data.daily[4].weather[0].description === "broken clouds") {
            current5.textContent="🌤"
          }else if (data.daily[4].weather[0].description === "shower rain") {
            current5.textContent="🌧"
          }else if (data.daily[4].weather[0].description === "rain") {
            current5.textContent="🌧"
          }else if (data.daily[4].weather[0].description === "thunderstorm") {
            current5.textContent="⛈"
          }else if (data.daily[4].weather[0].description === "snow"){
            current5.textContent="🌨"
          }else {
            current5.textContent="🌫"
          };
        }
          Forcast()
      });
  }
 
  getApi(WeatherURL)
  




