const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { default: App } = require('../components.App');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({

        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    })

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
ReactDOM.render(<App />, document.getElementById('root'));

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})