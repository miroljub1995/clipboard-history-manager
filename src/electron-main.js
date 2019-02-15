import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import State from './State';

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
        win.loadURL('http://localhost:3000#popup');
    }
    else {
        let index = `file://${__dirname}/../build/index.html#popup`;
        win.loadURL(index);
    }
});

app.on('window-all-closed', app.quit);