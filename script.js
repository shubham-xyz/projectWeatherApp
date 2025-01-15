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

function displayWeather(data) {
  const { resolvedAddress, currentConditions, days, description } = data;

  weatherDisplay.innerHTML = `
    <h2>Weather in ${resolvedAddress}</h2>
    <p><strong>Description:</strong> ${description}</p>
    ${generateCurrentWeatherHTML(currentConditions)}
    <hr>
    <h3>Next 7-Day Forecast</h3>
    <div id="forecastContainer" class="forecast-container">
      ${generateForecastHTML(days)}
    </div>
  `;
  updateBackground(currentConditions.conditions);
}

function generateCurrentWeatherHTML(current) {
  return `
    <h3>Current Weather</h3>
    <p><strong>Condition:</strong> ${current.conditions}</p>
    <p><strong>Temperature:</strong> ${current.temp} °C</p>
    <p><strong>Feels Like:</strong> ${current.feelslike} °C</p>
    <p><strong>Humidity:</strong> ${current.humidity} %</p>
    <p><strong>Wind Speed:</strong> ${current.windspeed} km/h</p>
    <p><strong>Wind Direction:</strong> ${current.winddir}°</p>
    <p><strong>Pressure:</strong> ${current.pressure} hPa</p>
    <p><strong>Visibility:</strong> ${current.visibility} km</p>
    <p><strong>UV Index:</strong> ${current.uvindex}</p>
    <p><strong>Sunrise:</strong> ${current.sunrise}</p>
    <p><strong>Sunset:</strong> ${current.sunset}</p>
  `;
}

function generateForecastHTML(days) {
  return days.slice(0, 7).map(day => `
    <div class="forecast-card">
      <h4>${day.datetime}</h4>
      <p><strong>Condition:</strong> ${day.conditions}</p>
      <p><strong>Max Temp:</strong> ${day.tempmax} °C</p>
      <p><strong>Min Temp:</strong> ${day.tempmin} °C</p>
      <p><strong>Avg Temp:</strong> ${day.temp} °C</p>
      <p><strong>Humidity:</strong> ${day.humidity} %</p>
      <p><strong>Wind Speed:</strong> ${day.windspeed} km/h</p>
      <p><strong>Wind Gust:</strong> ${day.windgust} km/h</p>
      <p><strong>Wind Direction:</strong> ${day.winddir}°</p>
      <p><strong>Precipitation:</strong> ${day.precip} mm</p>
      <p><strong>Precipitation Probability:</strong> ${day.precipprob} %</p>
      <p><strong>Snow:</strong> ${day.snow} mm</p>
      <p><strong>Solar Radiation:</strong> ${day.solarradiation} W/m²</p>
      <p><strong>UV Index:</strong> ${day.uvindex}</p>
      <p><strong>Moon Phase:</strong> ${day.moonphase}</p>
      <p><strong>Sunrise:</strong> ${day.sunrise}</p>
      <p><strong>Sunset:</strong> ${day.sunset}</p>
    </div>
  `).join('');
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

  