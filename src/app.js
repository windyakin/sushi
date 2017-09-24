const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = electron;

let mainWindow = null;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
  });

  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.setAlwaysOnTop(true, 'floating', 1);
  mainWindow.maximize();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
