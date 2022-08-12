const weather = {
    "apiKey": "23e2d80a7eaf577a56cf99cbe281d33b",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=imperial&appid=" 
             + this.apiKey
        ).then((response)=> response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        // watched a video tutorial on this,
        // goes into the dictionary containing the weather for each city
        // and pulls the following information to display them
        const { name } = data;
        const { icon, description }= data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/0"+ icon +".png" // supposed to display the weather icon next to the weather description
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
        // if we are searching for a location's weather, it will remove the hidden visibility styling
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?" + name + ")"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

// will run the search when the search icon is clicked
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// will run the search when enter key is hit
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// will show a default city when loading up the page
weather.fetchWeather("Jersey City");
