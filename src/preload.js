const { contextBridge, ipcRenderer } = require('electron');

let sendCity = (cityName) => {
    console.log(cityName)
    ipcRenderer.send("gotCityName",cityName)
}

let indexBridge = {
    sendCity,
}

contextBridge.exposeInMainWorld("Bridge",indexBridge)