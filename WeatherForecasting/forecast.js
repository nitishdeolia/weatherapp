//initMap callback function
window.initMap = function () {}

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

//call for automatic weather data
window.onload = function(){
    autoShowWeather();
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

//address validation

function addressValidation(address){
    if(address==null || address==undefined || address==""){
        return false;
    }else return true;
}

function formSubmit() {

    //get address0
    address = document.getElementById("search").value;
    // console.log(address);
    //validation
    if(addressValidation(address)){
        fetch(`${geocodingApi.baseurlforward}?access_key=${geocodingApi.key}&query=${address}`)
            .then(jsonCreater =>{
                return jsonCreater.json();
            })
            .then((geo_data) => {
                //console.log(geo_data);
                const latitude=geo_data["data"][0]["latitude"];
                const longitude=geo_data["data"][0]["longitude"];
                // console.log(`${latitude} ${longitude}`);
                //initiate weather process with fetched latitude and longitude
                initiate(latitude,longitude);
            });
        //empty the input value after showing data
        document.getElementById("search").value="";
        //console.log(address);
    }else{
        const error=document.getElementById("error");
        //add error
        error.innerHTML=`<br><div class="alert alert-warning alert-dismissible fade show" style="width:100%;" role="alert">
        <strong>Oops!</strong>  Fill the address First!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div><br>`;
      var timeout=setTimeout(function(){
          error.innerHTML="";
      },5000);
    }
    // logic function
    return false;
}

function initiate(latitude,longitude){
    fetch(`${api.baseurl}forecast?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
        .then((forecast)=>{
            return forecast.json();
        })
        .then((forecast)=>{
            fillAddress(forecast);
            // console.log(forecast);
            const timestampList=forecast.list;
            for(let i=1;i<=5;i++){
                dayWise(timestampList,i);
            }
        })
}

function fillAddress(forecast){
    const address=document.querySelector(".address");
    let sunrise_time = new Date(forecast.city.sunrise * 1000);

    // sunset time at the place converted from UTC to normal time
    let sunset_time = new Date(forecast.city.sunset * 1000);
    address.innerHTML="";
    address.innerHTML=`<div class="display-4">${forecast.city.name}</div>
    <div class="d-block mt-3">
        <div class="d-flex justify-content-around">
            <p>Latitude</p>
            <p>${forecast.city.coord.lat}</p>
        </div>
        <div class="d-flex justify-content-around mb-2">
            <p>Longitude</p>
            <p>${forecast.city.coord.long}</p>
        </div>
        <h6 class="text-center">Sunrise</h6>
        <div class="d-block text-center mt-2">
            <p>${sunrise_time}</p>
        </div>
        <h6 class="text-center">Sunset</h6>
        <div class="d-block text-center mt-2">
            <p>${sunset_time}</p>
        </div>
    </div>`;

}

var forecastlist;
var startIndex,lastIndex;

function dayWise(timestampList,day){
    if(day==1){
        forecastlist=document.getElementById("one");
        startIndex=0;
        lastIndex=7;
    }else if(day==2){
        forecastlist=document.getElementById("two");
        startIndex=8;
        lastIndex=15;
    }else if(day==3){
        forecastlist=document.getElementById("three");
        startIndex=16;
        lastIndex=23;
    }else if(day==4){
        forecastlist=document.getElementById("four");
        startIndex=24;
        lastIndex=31;
    }else if(day==5){
        forecastlist=document.getElementById("five");
        startIndex=32;
        lastIndex=39;
    }

    forecastlist.innerHTML="";
    for(let start=startIndex;start<=lastIndex;start++){
        let timeObj=timestampList[start];
        var addingItem=`<div class="forecast-item shadowclass">
        <div class="timestamp text-center">
            <p class="font-weight-bold">${timeObj.dt_txt} hrs</p>
        </div>
        <div class="weather d-flex justify-content-around align-items-center mt-1">
            <p class="lead text-capitalize">${timeObj.weather[0].description}</p>
            <img src="../icons/${timeObj.weather[0].icon}.png" alt="" class="icon-to-fill">
        </div>
        <h6 class="text-center mt-1">Temperature</h6>
        <div class="d-flex justify-content-around">
            <p>Feels Like</p>
            <p id="feelslike">${Math.round((timeObj.main.temp-273.13 + Number.EPSILON) * 100) / 100} C°</p>
        </div>
        <div class="d-flex justify-content-around">
            <p>Temperature</p>
            <p id="temp">${Math.round((timeObj.main.temp-273.13 + Number.EPSILON) * 100) / 100} C°</p>
        </div>
        <div class="d-flex justify-content-around">
            <p>Humidity</p>
            <p id="humidity">${timeObj.main.humidity} hPa</p>
        </div>
        <div>
        <h6 class="text-center">Wind Data</h6>
        <div class="wind d-flex justify-content-around mt-1">
            <p id="deg">${timeObj.wind.deg}</p>
            <p id="gust">${timeObj.wind.gust} m/s</p>
            <p id="speed">${timeObj.wind.speed} m/s</p>
        </div>
        </div>`;
        forecastlist.innerHTML+=addingItem;
    }
}


//pagination
//only show first block
document.getElementById("one").classList.add("show");
document.getElementById("1").classList.add("activePage");

const pagelist=document.querySelectorAll(".page-item");

const pageMap= {
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five"
}
pagelist.forEach(page => {
    page.addEventListener('click',(event)=>{
        let pageId=event.target.getAttribute("id");
        if(pageId == 0){
            let activeP=document.querySelector(".show");
            let previousId=Number(getKeyByValue(pageMap,activeP.getAttribute("id")))-1;
            if(previousId<=0){
                //do nothing
            }else{
                document.querySelector(".activePage").classList.remove("activePage");
                document.getElementById(previousId).classList.add("activePage");
                activeP.classList.remove("show");
                document.getElementById(pageMap[previousId]).classList.add("show");       
            }
        }else if(pageId == 6){
            let activeF=document.querySelector(".show");
            let forwardId=Number(getKeyByValue(pageMap,activeF.getAttribute("id")))+1;
            console.log(forwardId);
            if(forwardId>=6){
                //do nothing
            }else{
                document.querySelector(".activePage").classList.remove("activePage");
                document.getElementById(forwardId).classList.add("activePage");
                activeF.classList.remove("show");
                document.getElementById(pageMap[forwardId]).classList.add("show");
            }
        }else{
            const forecastlist=document.querySelectorAll(".forecast-list");
            document.querySelector(".activePage").classList.remove("activePage");
            document.getElementById(pageId).classList.add("activePage");
            forecastlist.forEach(forecast =>{
                if(forecast.getAttribute("id") === pageMap[pageId]){
                    if(!forecast.classList.contains("show")){
                        forecast.classList.add("show");
                    }else{
                        //do nothing
                    }
                }else{
                    if(forecast.classList.contains("show")) forecast.classList.remove("show");
                    else{
                        //do nothing
                    }
                }
            })
        }
    })
})


//get key by value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


//animations
const tl=gsap.timeline({paused : true});
//animations
tl.to("#icon",{
    duration: 0.3,
    rotation : 360,
    ease : "power4.out",
    color : "white"
}).to(".addlabel",{
    duration : 0.3,
    delay : -0.3,
    backgroundColor: "grey",
    border : 0,
    ease : "power3.out"
})

document.querySelector(".addlabel").addEventListener('mouseover',(event)=>{
    event.preventDefault();
    tl.play();
});

document.querySelector(".addlabel").addEventListener('mouseout',(event)=>{
    event.preventDefault();
    tl.reverse();
})


//adding address div
const tl1=gsap.timeline();

tl1.to(".address",{
    duration : 0.7,
    x : -50,
    opacity : 0.5
})

document.querySelector(".address").addEventListener('mouseover',(event)=>{
    event.preventDefault();
    tl1.reverse();
});

document.querySelector(".address").addEventListener('mouseout',(event)=>{
    event.preventDefault();
    tl1.play();
})

//stagger animation
const texttl=gsap.timeline();
texttl.from(".textbanner",{
    duration : 0.5,
    y : -30,
    opacity : 0
}).to(".textbanner",{
    duration : 0.5,
    letterSpacing : "5px",
    ease : "back"
}).to(".textbanner",{
    duration : 0.3,
    letterSpacing : "0px",
    ease : "power2.out"
})