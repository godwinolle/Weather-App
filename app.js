const apiKey = '5000fb63a79e39e141d6ed5478dceb4e';

function imperialTemp(temp){
    let fahrenheit = (temp - 273.15) * 9/5 + 32
    return Math.round(fahrenheit);
}

const weather = async (zip) =>{
    try{
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
        const description = await data.weather[0].description;
        

        const currentTempHTML = document.querySelector('.currentTemp');
        const weatherIcon = document.getElementById('weatherIcon');
        const descriptionHTML = document.getElementById('description');
        const highTempHTML = document.querySelector('.highTemp');
        const lowTempHTML = document.querySelector('.lowTemp');
        const location = document.querySelector('.located');

        currentTempHTML.innerHTML = `${currentWeather}`;
        weatherIcon.src = `icons/${icon}.png`;
        descriptionHTML.innerHTML = `${description}`;
        highTempHTML.innerHTML = `${highWeather}`;
        lowTempHTML.innerHTML = `${lowWeather}`;
        location.innerHTML = `${city}, US`;
    } catch(Error){
        const currentTempHTML = document.querySelector('.currentTemp');
        currentTempHTML.innerHTML = `Weather not located`;
        currentTempHTML.style.fontSize = '10';
    }

};

const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e=>{
    e.preventDefault();
    const cityZIP = cityForm.zip.value.trim();
    console.log(cityZIP);
    weather(cityZIP);
});
