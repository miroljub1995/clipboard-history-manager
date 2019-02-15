import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import State from './state';

global.state = new State();

app.disableHardwareAcceleration();

let win;
app.once('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff'
    });
    win.toggleDevTools();
    if (isDev) {
        win.loadURL('http://localhost:3000');
    }
    else {
        let index = `file://${__dirname}/../build/index.html`;
        win.loadURL(index);
    }
});

app.on('window-all-closed', app.quit);