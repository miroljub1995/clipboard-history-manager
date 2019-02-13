import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import State from '../src/state';

global.state = new State();

app.disableHardwareAcceleration();

let win;
app.once('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff'
    });
    if (isDev) {
        win.loadURL('http://localhost:3000');
    }
    else {
        win.loadURL(`file://${__dirname}/../build/index.html`);
    }
});

app.on('window-all-closed', app.quit);