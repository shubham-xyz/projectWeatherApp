const locationInput = document.getElementById("location")
const getWeatherButton = document.getElementById("getWeatherBtn")
const weatherDisplay = document.getElementById("weatherInfo")

getWeatherButton.addEventListener("click", ()=> {
    const location = locationInput.value.trim()

    if(location === ""){
        weatherDisplay.innerHTML = "Please enter a location"
        return;
    }
    fetchWeather(location)
})

async function fetchWeather(location) {
    const key = "SX2EXLUUZ3KQREHXM2GV95H7F"
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;
    

    try {
        const response = await fetch (apiUrl)

        if(!response.ok){
            throw new Error("Location not found. Please try again.")
        }
        
        const data = await response.json()
        displayWeather(data)

console.log(data)
console.log(response)
        
    }catch(error){
        weatherDisplay.innerHTML = `Error: ${error.message}`
    }
}

function displayWeather(data){
    const {resolvedAddress, currentConditions, days, description } = data
    const today = days[0]

    weatherDisplay.innerHTML = `
    <h2>Weather in ${resolvedAddress}</h2>
    <p><strong>Condition:</strong> ${today.conditions}</p>
    <p><strong>Temperature:</strong> ${today.temp} °C</p>
    <p><strong>Humidity:</strong> ${today.humidity} %</p>
    <p><strong>Wind Speed:</strong> ${today.windspeed} km/h</p>

    <h2>Weather in ${resolvedAddress}</h2>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Current Condition:</strong> ${today.conditions}</p>
    <p><strong>Temperature:</strong> ${today.temp} °C</p>
    <p><strong>Humidity:</strong> ${today.humidity} %</p>
    <p><strong>Wind Speed:</strong> ${today.windspeed} km/h</p>
    <p><strong>UV Index:</strong> ${today.uvindex}</p>
    <p><strong>Visibility:</strong> ${today.visibility} km</p>
    <p><strong>Sunrise:</strong> ${today.sunrise}</p>
    <p><strong>Sunset:</strong> ${today.sunset}</p>
    <hr>
    <h3>Next 7-Day Forecast</h3>
    ${generateForecastHTML(days)}
  `;
  updateBackground(today.conditions);

  function generateForecastHTML(days) {
    // Generate a forecast for the next 7 days
    return days.slice(0, 7).map(day => `
      <div style="margin-bottom: 10px;">
        <p><strong>Date:</strong> ${day.datetime}</p>
        <p><strong>Condition:</strong> ${day.conditions}</p>
        <p><strong>Max Temp:</strong> ${day.tempmax} °C</p>
        <p><strong>Min Temp:</strong> ${day.tempmin} °C</p>
        <p><strong>Humidity:</strong> ${day.humidity} %</p>
      </div>
    `).join('');
}
}
function updateBackground(condition) {
    const body = document.body;
  
    if (condition.includes("Rain")) {
      body.style.background = "linear-gradient(to bottom, #4e54c8, #8f94fb)";
    } else if (condition.includes("Cloud")) {
      body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    } else if (condition.includes("Clear")) {
      body.style.background = "linear-gradient(to bottom, #74ebd5, #9face6)";
    } else {
      body.style.background = "linear-gradient(to bottom, #ff9966, #ff5e62)";
    }
  }

  