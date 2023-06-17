const reqWeatherButton = document.getElementById('reqWeatherButton')
const cityInput = document.getElementById('cityInput');
const weatherGrid = document.getElementById('weatherGrid');

reqWeatherButton.addEventListener("click", (event,arg)=>{
    let city = cityInput.value;
    var weatherData;
    if (city.trim() !== '') {
        weatherData = window.Bridge.getWeatherData(city);
        cityInput.value = '';
    }
    window.Bridge.addWeatherTile();
});