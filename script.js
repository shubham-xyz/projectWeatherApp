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
        
    }catch(error){
        weatherDisplay.innerHTML = `Error: ${error.message}`
    }
}

function displayWeather(data){
    const {resolvedAddress , days } = data
    const today = days[0]

    weatherDisplay.innerHTML = `
    <h2>Weather in ${resolvedAddress}</h2>
    <p><strong>Condition:</strong> ${today.conditions}</p>
    <p><strong>Temperature:</strong> ${today.temp} °C</p>
    <p><strong>Humidity:</strong> ${today.humidity} %</p>
    <p><strong>Wind Speed:</strong> ${today.windspeed} km/h</p>
  `;
  updateBackground(today.conditions);
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

  