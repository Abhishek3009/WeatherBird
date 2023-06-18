const { contextBridge, ipcRenderer} = require('electron');
const alert = require('alert');

let cityList = new Array();

let getWeatherData = (cityName) => {
    console.log(cityName)
    ipcRenderer.send("getWeatherData",cityName)
}

let addWeatherTile = () =>{
    ipcRenderer.on('weatherData',(event,message)=>{
        console.log(message)
        const weatherData = JSON.parse(message)
        console.log(weatherData)
        if(weatherData.City === 'error'){
            console.log('City does not exist')
            alert("City does not exist! Please retry")
        }
        else if (weatherData.City === 'Request Error. Please Check Connection'){
            alert(weatherData.City)
        }
        else{
            const dataBlock = createDataBlock(weatherData);
            if(typeof dataBlock === "undefined"){
                console.log("City is already added")
            }
            else{
                let prevChild = weatherGrid.firstElementChild;
                weatherGrid.insertBefore(dataBlock,prevChild);
            }
        }
    })
} 

let indexBridge = {
    getWeatherData,
    addWeatherTile,
}

contextBridge.exposeInMainWorld("Bridge",indexBridge)

function createDataBlock(weatherData) {

    if (cityList.includes(weatherData.City)){
        return
    }
    else{
        cityList.push(weatherData.City)

        // Icon Block
        const iconBlock = document.createElement('div');
        iconBlock.className = 'weather-icon';

        let weathIcon = document.createElement('img');
        weathIcon.src =`file://D:\\My Projects\\weather-bird\\images\\${weatherData.Icon}@2x.png`;
        iconBlock.appendChild(weathIcon);

        // Data Block
        const dataBlock = document.createElement('div');
        dataBlock.className = 'weather-data';

        // Data Block Left
        const dataBlockL = document.createElement('div');
        dataBlockL.className = 'weather-dataL';
        // City Name
        const cityName = document.createElement('h2');
        cityName.textContent = weatherData.City;
        dataBlockL.appendChild(cityName);
        // Temperature
        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${weatherData.Temperature}°C`;
        dataBlockL.appendChild(temperature);
        // Min Max Temperature
        const minmaxTemp = document.createElement('p');
        minmaxTemp.textContent = `↓${weatherData.TemperatureMin}°C ↑${weatherData.TemperatureMax}°C`;
        dataBlockL.appendChild(minmaxTemp);
        
        // Data Block Right
        const dataBlockR = document.createElement('div');
        dataBlockR.className = 'weather-dataR';
        // Description
        const description = document.createElement('p');
        description.textContent = `Weather: ${weatherData.Description}`;
        dataBlockR.appendChild(description);
        // Humidity
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${weatherData.Humidity}`;
        dataBlockR.appendChild(humidity);
        // WindSpeed
        const wind = document.createElement('p');
        wind.textContent = `Wind Speed: ${weatherData.WindSpeed}`;
        dataBlockR.appendChild(wind);

        // Final Data block
        dataBlock.appendChild(dataBlockL);
        dataBlock.appendChild(dataBlockR);

        // Weather Tile
        const weatherTile = document.createElement('div');
        weatherTile.className = 'weather-tile';

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash" id="delButton"></i>';
        deleteButton.addEventListener('click', () => {
            weatherTile.remove();
        });
        weatherTile.appendChild(iconBlock);
        weatherTile.appendChild(dataBlock);
        weatherTile.appendChild(deleteButton);
      
        return weatherTile;
    }
}