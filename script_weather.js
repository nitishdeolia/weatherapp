//initMap callback function
window.initMap = function () {}

//call for automatic weather data
window.onload = function(){
    autoShowWeather();
}

//api values for weather data
const api = {
    key: "c1a51d89a615ac435e206bcb05ec1504",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
//geocoding api for lat long
const geocodingApi = {
    key: "33d53da926c277a6748f7344ac4b7405",
    baseurlforward: "http://api.positionstack.com/v1/forward",
    baseurlreverse: "https://api.positionstack.com/v1/reverse"
}

var address;//store address entered

// console.log(address);
//code for automatic location weather enable
function autoShowWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showWeather);
    }

    function showWeather(position){
        const baseLat=position.coords.latitude;
        const baseLong=position.coords.longitude;
        initiate(baseLat,baseLong);
    }
}

//function over submiting the location
function formSubmit() {
    //get address0
    address = document.getElementById("search").value;
    // console.log(address);
    fetch(`${geocodingApi.baseurlforward}?access_key=${geocodingApi.key}&query=${address}`)
        .then(jsonCreater =>{
            return jsonCreater.json();
        })
        .then((geo_data) => {
            //console.log(geo_data);
            const latitude=geo_data["data"][0]["latitude"];
            const longitude=geo_data["data"][0]["longitude"];
            // console.log(`${latitude} ${longitude}`);
            //adding the address
            const label=geo_data["data"][0]["label"];
            fillAddress(address,label);
            //initiate weather process with fetched latitude and longitude
            initiate(latitude,longitude);
        });
    // logic function
    return false;
}

var temp;
//base function
function initiate(latitude,longitude){
    fetch(`${api.baseurl}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
                .then(weather => {
                    // weather data converted to json format 
                    return weather.json();
                })
                .then((weather) => {
                    console.log(weather);
                    // call for setting the icon for the weather
                    changeIcon(weather.weather[0].icon);
                    // call for changing weather description
                    changeDesc(weather.weather[0]);
                    // temp details of the place having the temperature, min-temperature ,max-temperature ,
                    // feels lke in all units K ,C and Fahrenheit
                    let temp = weather.main.temp;
                    changeTemp("temperature","tempc","tempf",temp);
                    
                    //feels like
                    let feels_like = weather.main.feels_like;
                    changeTemp("feelslike","feelslikec","feelslikef",feels_like);
                    
                    //minimum temperature
                    let temp_min = weather.main.temp_min;
                    changeTemp("temperature_min","tempc_min","tempf_min",temp_min);

                    //maximum temperature
                    let temp_max = weather.main.temp_max;
                    changeTemp("temperature_max","tempc_max","tempf_max",temp_max);

                    // pressure humidity ,sealevel and groundlevel pressure values 
                    changePressure(weather.main.pressure,weather.main.humidity);
                    

                    //sealevel and groundlevel
                    changeLevelData(weather.main.sea_level,weather.main.grnd_level);

                    // windspeed in the area degree of wind and percentage of clouds in the area
                    changeWindData(weather.wind.speed,weather.wind.deg,weather.clouds.all);
                    
                    // sunrise time at the place converted from UTC to normal time
                    let sunrise_time = new Date(weather.sys.sunrise * 1000);
                    changeSunTime(sunrise_time,"sunrise");

                    // sunset time at the place converted from UTC to normal time
                    let sunset_time = new Date(weather.sys.sunset * 1000);
                    changeSunTime(sunset_time,"sunset");

                    // weather area visibility in meters
                    document.getElementById("visibility").innerText = `${weather.visibility} m`;

                    if(address===undefined){
                        helper(weather.name,weather.sys.country);
                    }
                });
}

//helper function on load
function helper(add,lab_add){
    fillAddress(add,lab_add);
}

//filling entered and labeled address
const fillAddress = (address,label) => {
    document.getElementById("full-address").innerHTML=address;
    document.getElementById("label-address").innerHTML=label;
}

//filiing icon data according to weather
const changeIcon = (icon) => {
    let locationIcon = document.querySelector('.icon_to_weather');
    locationIcon.src = `icons/${icon}.png`;
}

//function for changing description
const changeDesc = (desc) => {
    document.getElementById("description").innerText = `${desc.description} in your city`;
    document.getElementById("main-desc").innerText = desc.main;
}

//function for changing the temp values(min,max,feelslike)
const changeTemp =(first,second,third,temp) => {
    //C and F temperature conversions
    let tempC=Math.round((temp-273.13 + Number.EPSILON) * 100) / 100;
    let tempF=Math.round(((((temp-273.13)*9/5)+32) + Number.EPSILON) * 100) / 100;
    //fill data
    document.getElementById(first).innerText = `${temp} K`;
    document.getElementById(second).innerText = `${tempC} C°`;
    document.getElementById(third).innerText = `${tempF} F°`;
}

//filling pressure and humidity
const changePressure = (pressure, humidity) => {
    document.getElementById("pressure").innerText = `${pressure} hPa`;
    document.getElementById("humidity").innerText = `${humidity} %`;
}

const changeLevelData =(seaLevel,grndLevel) => {
    if (seaLevel === undefined) {
        document.getElementById("sealevel").innerText = "-";
    } else {
        document.getElementById("sealevel").innerText = `${seaLevel} hPa`;
    }
    if (grndLevel === undefined) {
        document.getElementById("groundlevel").innerText = "-";
    } else {
        document.getElementById("groundlevel").innerText = `${grndLevel} hPa`;
    }
}

//changinf the cloud data
const changeWindData =(speed,deg,clouds) => {
    document.getElementById("windspeed").innerText = `${speed} m/sec`;
    document.getElementById("degree").innerText = `${deg}°`;
    document.getElementById("cloudiness").innerText = `${clouds} %`;
}

const changeSunTime = (time,input_string) => {
    let min = "0" + time.getMinutes();
    let sec = "0" + time.getSeconds();  
    document.getElementById(input_string).innerText = time.getHours() + ":" + min.substr(-2) + ":" + sec.substr(-2);
}
