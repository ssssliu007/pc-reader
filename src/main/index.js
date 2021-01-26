let electron = require('electron');
let { Menu, MenuItem, app, BrowserWindow, dialog } = electron;
let path = require('path');

const WINURL = process.env.NODE_ENV == "development" ? "http://localhost:1900/index.html" : `file://${__dirname}/renderer/index.html`;
let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1980,
    height: 1080,
    //resizable: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    frame: false,// 无边框
    backgroundColor: "#00000000", // 透明背景
    transparent: true,
  })
  mainWindow.loadURL(WINURL);
  mainWindow.webContents.on('did-finish-load', () => {
    process.env.NODE_ENV == "development" ? mainWindow.webContents.openDevTools() : "";
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  })
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'toggleFullScreen',
      accelerator: 'F11',
      click: ()=>{
        mainWindow.setFullScreen(!mainWindow.isFullScreen())
      }
    },{
      role: 'toggleDevTools',
      accelerator: 'F12',
      click: ()=>{
        let webContents = mainWindow.webContents
        if(webContents.isDevToolsOpened()){
          webContents.closeDevTools()
        }else{
          webContents.openDevTools()
        }
      }
    }]
  }))

  Menu.setApplicationMenu(menu)
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})