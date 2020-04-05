const apiKey = '5000fb63a79e39e141d6ed5478dceb4e';

function imperialTemp(temp){
    let fahrenheit = (temp - 273.15) * 9/5 + 32
    return Math.round(fahrenheit);
}

const weather = async (zip) =>{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`);
    const data = await response.json();
    const temp = await data.main.temp;
    const currentWeather = await imperialTemp(temp);
    const city = await data.name;
    const icon = await data.weather[0].icon;
    console.log(city);
    console.log(currentWeather);

    const currentTempHTML = document.querySelector('.currentTemp');
    const weatherIcon = document.getElementById('weatherIcon');
    const location = document.querySelector('.located');

    currentTempHTML.innerHTML = `${currentWeather}`;
    weatherIcon.src = `icons/${icon}.png`;
    location.innerHTML = `${city}, US`;

};

const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e=>{
    e.preventDefault();

    const cityZIP = cityForm.zip.value.trim();
    console.log(cityZIP);
    weather(cityZIP);
})
