// Global variables
var API = "2df62c30dae6653493ac68c2bd19af8b"
var weather = document.getElementById('weather')
var form = document.querySelector('form')
var search = document.getElementById('weather-search')

//main function
form.onsubmit = function (e) {
    e.preventDefault()
    var URL = "https://api.openweathermap.org/data/2.5/weather?q="
    var city = this.search.value.trim()
    var usedURL = URL + city + "&units=imperial&appid=" + API
    //if no input given, clear form
    if (!city) return
        city = ''
        weather.innerHTML = ''
        search.value = ''
    
     fetch(usedURL)
//location not found
        .then(function (res) {
            if (res.status !== 200) 
            throw new Error('Location not Found')
            return res.json()
        })
        //display location information
        .then(displayData)
        //catch errors
        .catch(function (err) {
            weather.innerHTML = err.message
        })
}

//display info function
function displayData(data) {
    city = ""
    weather.innerHTML = ""
    search.value = ''
//show city
var location = document.createElement('h2')
weather.appendChild(location)
location.textContent = data.name + " , " + data.sys.country

//show map link
var mapLink = document.createElement('a')
var lat = data.coord.lat
var lon = data.coord.lon
var googleMap = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
weather.appendChild(mapLink)
mapLink.textContent = "Click to View Map"
mapLink.href = googleMap
mapLink.target = "_BLANK"

//show weather condition icon
var icon = document.createElement('img')
var iconCode = data.weather[0].icon
var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
icon.src = iconURL
icon.alt = data.name
weather.appendChild(icon)

//show weather condition
var condition = document.createElement('p')
condition.setAttribute('style', 'text-transform: capitalize')
condition.textContent = data.weather[0].description
weather.appendChild(condition)

}