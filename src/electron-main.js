import { app, BrowserWindow, Menu, Tray } from 'electron';
import isDev from 'electron-is-dev';
import State from './state';

global.state = new State();

app.disableHardwareAcceleration();

let tray = null;
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

    ///system tray
    let tray = new Tray(`${__dirname}/../assets/TrayIcons/electron_icon.png`);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', type: 'normal', click: app.exit }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);

});

app.on('window-all-closed', app.quit);