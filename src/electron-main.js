import { app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, clipboard } from 'electron';
import isDev from 'electron-is-dev';
import State from './State';
import * as path from 'path'
import * as ks from 'node-key-sender';
// import * as clipboardEx from 'electron-clipboard-extended';
import * as robotjs from 'robotjs';

// let a = clipboard.readText();

debugger;

global.state = new State();

app.disableHardwareAcceleration();
ks.setOption('startDelayMillisec', 0);
ks.setOption('globalDelayBetweenMillisec', 0);
ks.setOption('globalDelayPressMillisec', 0);

// console.log(clipboardEx);

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
let popupWin = null;

// let needToRegisterInHide = false;
const createPopupWindow = (iconPath) => {
    const registerFirstPaste = () => {
        globalShortcut.register("CommandOrControl+V", () => {
            popupWin.show();
        });
    }

    const unregisterFirstPaste = () => {
        globalShortcut.unregister("CommandOrControl+V");
    }

    let popupWin = new BrowserWindow({
        width: 400,
        height: 365,
        title: 'Clipboard history manager',
        backgroundColor: '#ffffff',
        icon: iconPath,
        show: false,
        webPreferences: { nodeIntegration: true }
    });
    popupWin.toggleDevTools();
    if (isDev) {
        popupWin.loadURL('http://localhost:3000#popup');
        console.log('development');
    }
    else {
        let index = `file://${__dirname}/../build/index.html#popup`;
        popupWin.loadURL(index);
        console.log('production');
    }
    popupWin.once('closed', () => { popupWin = null; });
    popupWin.on('blur', () => {
        popupWin.hide();
    });
    popupWin.on('show', () => {
        // needToRegisterInHide = true;
        unregisterFirstPaste();
    });
    popupWin.on('hide', () => {
        // if (needToRegisterInHide) {
        //     registerFirstPaste();
        // }
        // needToRegisterInHide = false;
        registerFirstPaste();
    });

    registerFirstPaste();
    ipcMain.on('onPopupPaste', () => {
        debugger;
        // needToRegisterInHide = false;
        popupWin.blur();
        // ks.sendCombination(['control', 'v'])
        //     .then(() => {
        //         // needToRegisterInHide = true;
        //         debugger;
        //         registerFirstPaste();
        //     }, (err) => {
        //         console.log("greska--------------- " + err);
        //     });
        robotjs.keyTap('v', 'control');
        // needToRegisterInHide = true;
        registerFirstPaste();
    });
    return popupWin;
}

const createTray = (iconPath) => {
    let tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', type: 'normal', click: app.exit }
    ]);
    tray.setToolTip('Clipboard history manager');
    tray.setContextMenu(contextMenu);
    return tray;
}

app.once('ready', () => {
    popupWin = createPopupWindow(iconPath);
    tray = createTray(iconPath);

    // popupWin.on('ready-to-show', function () {
    //     popupWin.show();
    //     popupWin.focus();
    // });
});


app.on('window-all-closed', app.quit);