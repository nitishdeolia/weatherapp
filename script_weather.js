window.initMap = function () {}

function submit() {
    slideOver();

    function slideOver() {
        let pageupper = document.querySelector('.page-second');
        if (pageupper.classList.contains('reverse')) pageupper.classList.remove('reverse');
        pageupper.classList.toggle('animate');
    }
    const removeButton = document.querySelector('.removeDiv');
    removeButton.addEventListener('click', (evt) => {
        let pageupper = document.querySelector('.page-second');
        pageupper.classList.remove('animate');
        pageupper.classList.add('reverse');
    })
    const api = {
        key: "c1a51d89a615ac435e206bcb05ec1504",
        baseurl: "https://api.openweathermap.org/data/2.5/"
    }
    initiate();

    function initiate() {
        geocoder = new google.maps.Geocoder();
        var address = document.getElementById("input-search").value;
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // icon to weather latitude and longitude ,full address from maps Javascript API 
                const fullAddress = results[0].formatted_address;
                const latitude = results[0].geometry.location.lat();
                const longitude = results[0].geometry.location.lng();
                document.getElementById('full-address').innerHTML = fullAddress;
                document.getElementById('latfill').innerHTML = latitude;
                document.getElementById('lngfill').innerHTML = longitude;
                // fetch the weather API for weather data 
                fetch(`${api.baseurl}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
                    .then(weather => {
                        // data converted to json format
                        return weather.json();
                    })
                    .then((weather) => {
                        // setting the icon source according to the weather of the place
                        let locationIcon = document.querySelector('.icon_to_weather');
                        const icon = weather.weather[0].icon;
                        locationIcon.src = `icons/${icon}.png`;
                        // weather description of the city and short weather details
                        document.getElementById("description").innerText = `${weather.weather[0].description} in your city`;
                        document.getElementById("main-desc").innerText = weather.weather[0].main;
                        // temp details of the place having the temperature, min-temperature ,max-temperature ,
                        // feels lke in all units K ,C and Fahrenheit
                        let temp = weather.main.temp;
                        document.getElementById("temperature").innerText = `${temp} K`;
                        document.getElementById("tempc").innerText = `${Math.round((temp-273.13 + Number.EPSILON) * 100) / 100} C°`;
                        document.getElementById("tempf").innerText = `${Math.round(((((temp-273.13)*9/5)+32) + Number.EPSILON) * 100) / 100} F°`;
                        let feels_like = weather.main.feels_like;
                        document.getElementById("feelslike").innerText = `${feels_like} K`;
                        document.getElementById("feelslikec").innerText = `${Math.round((feels_like-273.13 + Number.EPSILON) * 100) / 100} C°`;
                        document.getElementById("feelslikef").innerText = `${Math.round(((((feels_like-273.13)*9/5)+32) + Number.EPSILON) * 100) / 100} F°`;
                        let temp_min = weather.main.temp_min;
                        document.getElementById("temperature_min").innerText = `${temp_min} K`;
                        document.getElementById("tempc_min").innerText = `${Math.round((temp_min-273.13 + Number.EPSILON) * 100) / 100} C°`;
                        document.getElementById("tempf_min").innerText = `${Math.round(((((temp_min-273.13)*9/5)+32) + Number.EPSILON) * 100) / 100} F°`;
                        let temp_max = weather.main.temp_max;
                        document.getElementById("temperature_max").innerText = `${temp_max} K`;
                        document.getElementById("tempc_max").innerText = `${Math.round((temp_max-273.13 + Number.EPSILON) * 100) / 100} C°`;
                        document.getElementById("tempf_max").innerText = `${Math.round(((((temp_max-273.13)*9/5)+32) + Number.EPSILON) * 100) / 100} F°`;
                        // pressure humidity ,sealevel and groundlevel pressure values 
                        document.getElementById("pressure").innerText = `${weather.main.pressure} hPa`;
                        document.getElementById("humidity").innerText = `${weather.main.humidity} %`;
                        if (weather.main.sea_level === undefined) {
                            document.getElementById("sealevel").innerText = "-";
                        } else {
                            document.getElementById("sealevel").innerText = `${weather.main.sea_level} hPa`;
                        }
                        if (weather.main.grnd_level === undefined) {
                            document.getElementById("groundlevel").innerText = "-";
                        } else {
                            document.getElementById("groundlevel").innerText = `${weather.main.grnd_level} hPa`;
                        }
                        // windspeed in the area degree of wind and percentage of clouds in the area
                        document.getElementById("windspeed").innerText = `${weather.wind.speed} m/sec`;
                        document.getElementById("degree").innerText = `${weather.wind.deg}°`;
                        document.getElementById("cloudiness").innerText = `${weather.clouds.all} %`;
                        // sunrise time at the place converted from UTC to normal time
                        let sunrise_time = new Date(weather.sys.sunrise * 1000);
                        let min = "0" + sunrise_time.getMinutes();
                        let sec = "0" + sunrise_time.getSeconds();
                        document.getElementById("sunrise").innerText = sunrise_time.getHours() + ":" + min.substr(-2) + ":" + sec.substr(-2);
                        // sunset time at the place converted from UTC to normal time
                        let sunset_time = new Date(weather.sys.sunset * 1000);
                        let minset = "0" + sunset_time.getMinutes();
                        let secset = "0" + sunset_time.getSeconds();
                        document.getElementById("sunset").innerText = sunset_time.getHours() + ":" + minset.substr(-2) + ":" + secset.substr(-2);
                        // weather area visibility in meters
                        document.getElementById("visibility").innerText = `${weather.visibility} m`;
                        // console.log(weather);
                    });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}