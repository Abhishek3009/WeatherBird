// Imports
const { app, BrowserWindow, dialog, contextBridge, ipcMain, Menu } = require('electron');
const path = require('path');
const {PythonShell} = require('python-shell');

// Variables
var mainWindow;
let weatherDat;

//////////////////////////////////////////////// Window Related Default Code /////////////////////////////////////////////////////////////////

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      allowRunningInsecureContent:true,
      contextIsolation:true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  const wc = mainWindow.webContents;
  // wc.openDevTools();
};

app.whenReady().then(()=>{
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

////////////////////////////////////////////////// IPC to run python script ////////////////////////////////////////////////////////////////

ipcMain.on("getWeatherData", (event, city)=>{
  let pyshell = new PythonShell(path.join(__dirname, '../scripts/weatherAPI.py'));
  pyshell.send(JSON.stringify([city]))
  let weatherData = pyshell.on('message', function(message) {
    mainWindow.webContents.send('weatherData',message)
  })
  pyshell.end(function (err) {
    if (err){
      throw err;
    };
    console.log('finished');
  });
})

/////////////////////////////////////////////////////////// Window Menu /////////////////////////////////////////////////////////////////////

const weatherBirdMenuOptions = [
  {
    label:"About",
    submenu:[
      {
        label:"My Git",
        click: async () => {
          let myGitWin = new BrowserWindow({
            width: 600,
            height: 600,
            title: "GitHub",
            autoHideMenuBar:true,
          });
          myGitWin.loadURL('https://github.com/Abhishek3009')
        },
      }
    ]
  }
]

const weatherBirdMenu = Menu.buildFromTemplate(weatherBirdMenuOptions)
Menu.setApplicationMenu(weatherBirdMenu)