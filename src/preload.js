const { contextBridge, ipcRenderer } = require('electron');
let cityList = new Array();

let getWeatherData = (cityName) => {
    console.log(cityName)
    ipcRenderer.send("getWeatherData",cityName)
}

let addWeatherTile = () =>{
    ipcRenderer.on('weatherData',(event,message)=>{
        console.log(message)
        const weatherData = JSON.parse(message)
        const dataBlock = createDataBlock(weatherData);
        if(typeof dataBlock === "undefined"){
            console.log("City is already added")
        }
        else{
            weatherGrid.appendChild(dataBlock);
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

        const dataBlock = document.createElement('div');
        dataBlock.className = 'weather-block';
      
        const cityName = document.createElement('h2');
        cityName.textContent = weatherData.City;
        dataBlock.appendChild(cityName);
      
        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${weatherData.Temperature}°C`;
        dataBlock.appendChild(temperature);
      
        const description = document.createElement('p');
        description.textContent = `Weather: ${weatherData.Description}`;
        dataBlock.appendChild(description);
      
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
          dataBlock.remove();
        });
        dataBlock.appendChild(deleteButton);
      
        return dataBlock;
    }
}