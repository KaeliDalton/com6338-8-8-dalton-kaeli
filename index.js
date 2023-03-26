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
}