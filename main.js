const weather = {
    "apiKey": "23e2d80a7eaf577a56cf99cbe281d33b", // should prob put this in another folder, can't remmber how to do this at the moment
    getWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=imperial&appid=" // don't need to calc change from K to F - can specify which units of measurement you want to use instead = https://openweathermap.org/current#data
             + this.apiKey
        ).then((response)=> response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        // watched tutorial for this part
        // goes into the dict containing weather info for city
        // and pulls info to display
        const { name } = data;
        const { description }= data.weather[0];
        const { temp, humidity } = data.main;
        // acutally displays info
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        // if searching for location's weather, removes hidden visibility styling
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?" + name + ")"
    },
    search: function () {
        this.getWeather(document.querySelector(".search-bar").value)
    }
};

// will run search when search icon is clicked
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// will run search when enter key is hit
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// will show a default city when loading up the page
weather.getWeather("New York City");
