import { app, BrowserWindow, Menu, Tray } from 'electron';
import isDev from 'electron-is-dev';
import State from './State';
import * as path from 'path'

global.state = new State();

app.disableHardwareAcceleration();

let iconPath;
if (process.platform === 'linux') {
    iconPath = path.join(__dirname, '/../assets/icons/512x512.png');
}
else if (process.platform === 'win32') {
    iconPath = path.join(__dirname, '/../assets/icons/icon.ico');
}
else {
    throw new Error("Not suported platform");
}

let tray = null;
let win;
app.once('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        title: 'Clipboard history manager',
        backgroundColor: '#002b36',
        icon: iconPath,
        show: false
    });
    if (isDev) {
        win.loadURL('http://localhost:3000#popup');
    }
    else {
        let index = `file://${__dirname}/../build/index.html#popup`;
        win.loadURL(index);
    }

    ///system tray
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', type: 'normal', click: app.exit }
    ]);
    tray.setToolTip('Clipboard history manager');
    tray.setContextMenu(contextMenu);

    win.on('ready-to-show', function () {
        win.show();
        win.focus();
    });
});


app.on('window-all-closed', app.quit);