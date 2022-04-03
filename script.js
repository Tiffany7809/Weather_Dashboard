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

localStorage.setItem("favoritesList", favoritesEl);



submitSearchBtn.addEventListener("click",function(){
  
  var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=fac969b25d4eb179bf7de6d01c2e017f'

  //getting user input
  var qparam = inputEl.value;
  inputEl.value= " ";
  

  //saving user input to local storage
  localStorage.setItem("Recent" , qparam);

  //appening to favorites list
  var RecentSearch=localStorage.getItem('Recent');
  
  favoritesEl.append(RecentSearch);

  getApi(cityURL)
})

function getApi(cityURL) {
 
  fetch(cityURL , {
    method: 'POST', 
  })

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

    });
};



//request data from oneweather API
var WeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.37&lon=122.20&units=imperial&appid=fac969b25d4eb179bf7de6d01c2e017f'
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
        Today.textContent = moment().format("MM Do, YYYY")
        windEl.textContent="Wind Speed:" + " " + data.current.wind_speed;
        tempEl.textContent="Temp:" + " " + data.current.temp + "°" + "F";
        UvEl.textContent="UV Index:" + " " + data.current.uvi;
        humidityEl.textContent="Humidity" + " " + data.current.humidity;



        function Forcast(){

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

          //day 1 forcast
          forcast1=document.createElement("p");
          Wind1=document.createElement("p");
          Temp1=document.createElement("p");
          UV1=document.createElement("p");
          Humidity1=document.createElement("p");

          forcast1.textContent=moment().add(1, "days").format("MM Do, YYYY");
          Wind1.textContent="Wind Speed:" + " " + data.daily[0].wind_speed;
          Temp1.textContent="Temp:" + " " + data.daily[0].temp.day + "°" + "F";
          UV1.textContent="UV Index:" + " " + data.daily[0].uvi;
          Humidity1.textContent="Humidity" + " " + data.daily[0].humidity;

          Day1.append(forcast1)
          Day1.append(Wind1)
          Day1.append(Temp1)
          Day1.append(UV1)
          Day1.append(Humidity1)

          if (data.daily[0].uvi < "2"){
            UV1.setAttribute("class", "safe")
          } else if ( data.daily[0].uvi >= "8"){
            UV1.setAttribute("class", "danger")
          } else {
            UV1.setAttribute("class", "moderate")
          }

          //day 2 forcast
          forcast2=document.createElement("p");
          Wind2=document.createElement("p");
          Temp2=document.createElement("p");
          UV2=document.createElement("p");
          Humidity2=document.createElement("p");

          forcast2.textContent=moment().add(2, "days").format("MM Do, YYYY");
          Wind2.textContent="Wind Speed:" + " " + data.daily[1].wind_speed;
          Temp2.textContent="Temp:" + " " + data.daily[1].temp.day + "°" + "F";
          UV2.textContent="UV Index:" + " " + data.daily[1].uvi;
          Humidity2.textContent="Humidity" + " " + data.daily[1].humidity;

          Day2.append(forcast2)
          Day2.append(Wind2)
          Day2.append(Temp2)
          Day2.append(UV2)
          Day2.append(Humidity2)

          if (data.daily[1].uvi < "2"){
            UV2.setAttribute("class", "safe")
          } else if ( data.daily[1].uvi >= "8"){
            UV2.setAttribute("class", "danger")
          } else {
            UV2.setAttribute("class", "moderate")
          }

          //day 3 forcast
          forcast3=document.createElement("p");
          Wind3=document.createElement("p");
          Temp3=document.createElement("p");
          UV3=document.createElement("p");
          Humidity3=document.createElement("p");

          forcast3.textContent=moment().add(3, "days").format("MM Do, YYYY");
          Wind3.textContent="Wind Speed:" + " " + data.daily[2].wind_speed;
          Temp3.textContent="Temp:" + " " + data.daily[2].temp.day + "°" + "F";
          UV3.textContent="UV Index:" + " " + data.daily[2].uvi;
          Humidity3.textContent="Humidity" + " " + data.daily[2].humidity;

          Day3.append(forcast3)
          Day3.append(Wind3)
          Day3.append(Temp3)
          Day3.append(UV3)
          Day3.append(Humidity3)

          if (data.daily[2].uvi < "2"){
            UV3.setAttribute("class", "safe")
          } else if ( data.daily[2].uvi >= "8"){
            UV3.setAttribute("class", "danger")
          } else {
            UV3.setAttribute("class", "moderate")
          }

          //day 4 forcast
          forcast4=document.createElement("p");
          Wind4=document.createElement("p");
          Temp4=document.createElement("p");
          UV4=document.createElement("p");
          Humidity4=document.createElement("p");

          forcast4.textContent=moment().add(4, "days").format("MM Do, YYYY");
          Wind4.textContent="Wind Speed:" + " " + data.daily[3].wind_speed;
          Temp4.textContent="Temp:" + " " + data.daily[3].temp.day + "°" + "F";
          UV4.textContent="UV Index:" + " " + data.daily[3].uvi;
          Humidity4.textContent="Humidity" + " " + data.daily[3].humidity;

          Day4.append(forcast4)
          Day4.append(Wind4)
          Day4.append(Temp4)
          Day4.append(UV4)
          Day4.append(Humidity4)

          if (data.daily[3].uvi < "2"){
            UV4.setAttribute("class", "safe")
          } else if ( data.daily[3].uvi >= "8"){
            UV4.setAttribute("class", "danger")
          } else {
            UV4.setAttribute("class", "moderate")
          }

          //day 5 forcast

          forcast5=document.createElement("p");
          Wind5=document.createElement("p");
          Temp5=document.createElement("p");
          UV5=document.createElement("p");
          Humidity5=document.createElement("p");

          forcast5.textContent=moment().add(5, "days").format("MM Do, YYYY");
          Wind5.textContent="Wind Speed:" + " " + data.daily[4].wind_speed;
          Temp5.textContent="Temp:" + " " + data.daily[4].temp.day + "°" + "F";
          UV5.textContent="UV Index:" + " " + data.daily[4].uvi;
          Humidity5.textContent="Humidity" + " " + data.daily[4].humidity;

          Day5.append(forcast5)
          Day5.append(Wind5)
          Day5.append(Temp5)
          Day5.append(UV5)
          Day5.append(Humidity5)

          
          if (data.daily[4].uvi < "2"){
            UV5.setAttribute("class", "safe")
          } else if ( data.daily[4].uvi >= "8"){
            UV5.setAttribute("class", "danger")
          } else {
            UV5.setAttribute("class", "moderate")
          }



       

        }


  
          Forcast()
      });
      
  }
 
  getApi(WeatherURL)
  




