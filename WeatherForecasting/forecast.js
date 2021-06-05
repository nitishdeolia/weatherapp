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
        //initiate(baseLat,baseLong);
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
    console.log(address);
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
        error.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" style="width:100%;" role="alert">
        <strong>Oops!</strong>  Fill the address First!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
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
            console.log(forecast);
        })
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