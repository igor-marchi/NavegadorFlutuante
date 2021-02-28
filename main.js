const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./configs');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(config.url)
  // win.loadFile(config.url)
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShotCuts() {
  globalShortcut.register('cmdOrCtrl + J', toggleDevTools);
}

app.whenReady()
.then(createWindow)
.then(createShotCuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
