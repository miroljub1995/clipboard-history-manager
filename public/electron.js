const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

app.disableHardwareAcceleration();

let win;
app.once('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff'
    });
    if(isDev){
        win.loadURL('http://localhost:3000');
    }
    else{
        win.loadURL(`file://${__dirname}/build/index.html`);
    }
});