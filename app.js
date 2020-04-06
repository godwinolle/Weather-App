const apiKey = '5000fb63a79e39e141d6ed5478dceb4e';

function imperialTemp(temp){
    let fahrenheit = (temp - 273.15) * 9/5 + 32
    return Math.round(fahrenheit);
}

const weather = async (zip) =>{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`);
    const data = await response.json();
    const temp = await data.main.temp;
    const high = await data.main.temp_max;
    const low = await data.main.temp_min;
    const currentWeather = await imperialTemp(temp);
    const highWeather = await imperialTemp(high);
    const lowWeather = await imperialTemp(low);
    const city = await data.name;
    const icon = await data.weather[0].icon;
    console.log(city);
    console.log(currentWeather);

    const currentTempHTML = document.querySelector('.currentTemp');
    const weatherIcon = document.getElementById('weatherIcon');
    const location = document.querySelector('.located');
    const highTempHTML = document.querySelector('.highTemp');
    const lowTempHTML = document.querySelector('.lowTemp');

    currentTempHTML.innerHTML = `${currentWeather}`;
    weatherIcon.src = `icons/${icon}.png`;
    location.innerHTML = `${city}, US`;
    highTempHTML.innerHTML = `${highWeather}`;
    lowTempHTML.innerHTML = `${lowWeather}`;

};

const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e=>{
    e.preventDefault();
    const cityZIP = cityForm.zip.value.trim();
    console.log(cityZIP);
    weather(cityZIP);
});
