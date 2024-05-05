//^ today variables
let todayDayName = document.getElementById('today-dayName');
let todayDayNum = document.getElementById('today-dayNum');
let todayMonthName = document.getElementById('today-monthName');
let todayLocation = document.getElementById('today-location');
let todayTemp = document.getElementById('today-temp');
let todayImg = document.getElementById('today-img');
let todayCondition = document.getElementById('today-condition');
let todayHumidity = document.getElementById('today-humidity');
let todayWind = document.getElementById('today-wind');
let todayWindDir = document.getElementById('today-wind-dir');
//^ next days variables
let nextDayName = document.getElementsByClassName('next-dayName');
let nextImg = document.getElementsByClassName('next-img');
let nextMaxTemp = document.getElementsByClassName('next-maxTemp');
let nextMinTemp = document.getElementsByClassName('next-minTemp');
let nextCondition = document.getElementsByClassName('next-condition');
//^input variable
let search = document.getElementById('search');

//&fetch data function
async function getWeatherData(city="cairo"){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50e9f59d1ad3485d99f64459243004&q=${city}&days=3`);
    let weatherResult = await data.json()
    if(!weatherResult.error){
        displayToday(weatherResult);
        displayNext(weatherResult);
    }
}
getWeatherData();

//& display today weather function
function displayToday(data){
    const todayIconUrl = `https:${data.current.condition.icon}`;
    let date = new Date();
    todayDayName.innerHTML = date.toLocaleDateString('en-us',{weekday:"long"});
    todayDayNum.innerHTML = date.getDate();
    todayMonthName.innerHTML = date.toLocaleDateString('en-us',{month:"short"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayImg.setAttribute('src',todayIconUrl);
    todayCondition.innerHTML = data.current.condition.text;
    todayHumidity.innerHTML = data.current.humidity;
    todayWind.innerHTML = data.current.wind_kph;
    todayWindDir.innerHTML= data.current.wind_dir;
}

//& display next days weather function
function displayNext(data){
    let nextData = data.forecast.forecastday;
    for(let i=0; i<2 ; i++){
        const nextIconUrl = `https:${nextData[i+1].day.condition.icon}`;
        let date = new Date(nextData[i+1].date);
        nextDayName[i].innerHTML= date.toLocaleDateString('en-us',{weekday:"long"});
        nextImg[i].setAttribute('src',nextIconUrl);
        nextMaxTemp[i].innerHTML = nextData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = nextData[i+1].day.mintemp_c;
        nextCondition[i].innerHTML = nextData[i+1].day.condition.text;
    }
}

//& on search for city function
search.addEventListener("input",function(){
    getWeatherData(search.value);
})

