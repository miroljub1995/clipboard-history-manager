import { app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, clipboard } from 'electron';
import { CancellationToken } from 'builder-util-runtime';
import isDev from 'electron-is-dev';
import State from './State';
import * as path from 'path'
// import * as clipboardEx from 'electron-clipboard-extended';
import * as robotjs from 'robotjs';
import { autoUpdater } from 'electron-updater';

global.state = new State();
global.versionInfo = {
    current: app.getVersion()
};

const updateVersionInfo = (updater) => {
    global.versionInfo = { ...global.versionInfo, ...updater };
    settingsWin && settingsWin.webContents.send('versionInfo-updated', global.versionInfo);
}

app.disableHardwareAcceleration();
let baseUrl;
if (isDev) {
    baseUrl = 'http://localhost:3000';
}
else {
    baseUrl = `file://${__dirname}/../build/index.html`;
}

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
let settingsWin = null;

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
        webPreferences: { nodeIntegration: true },
        frame: false
    });
    popupWin.loadURL(baseUrl + '#popup');
    popupWin.once('closed', () => { popupWin = null; });
    popupWin.on('blur', () => {
        popupWin.hide();
    });
    popupWin.on('show', () => {
        unregisterFirstPaste();
    });
    popupWin.on('hide', () => {
        registerFirstPaste();
    });

    registerFirstPaste();
    ipcMain.on('onPopupPaste', () => {
        clipboard.writeText(global.state.first());
        popupWin.blur();
        robotjs.keyTap('v', 'control');
    });
    return popupWin;
}

const onSettings = () => {
    settingsWin = new BrowserWindow({
        width: 700,
        height: 700,
        title: 'Settings',
        backgroundColor: '#ffffff',
        icon: iconPath,
        webPreferences: { nodeIntegration: true },
        // show: false
    });
    // settingsWin.setMenu(null);
    // settingsWin.toggleDevTools();
    settingsWin.loadURL(baseUrl + '#settings');
    // settingsWin.on('ready-to-show', () => {
    //     settingsWin.show();
    // });
    settingsWin.on('close', () => {
        settingsWin = null;
    });

}

const createTray = (iconPath) => {
    let tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Settings', type: 'normal', click: onSettings },
        { label: 'Quit', type: 'normal', click: app.exit }
    ]);
    tray.setToolTip('Clipboard history manager');
    tray.setContextMenu(contextMenu);
    return tray;
}

app.once('ready', () => {
    popupWin = createPopupWindow(iconPath);
    tray = createTray(iconPath);

    autoUpdater.autoDownload = false;
    attachAutoUpdaterListeners();
    autoUpdater.checkForUpdatesAndNotify();
    setInterval(() => {
        console.log("======================================================");
        // if(global.versionInfo.)
        if(!updateInProgress) { 
            autoUpdater.checkForUpdatesAndNotify();
        }
    }, 10000);
    // popupWin.on('ready-to-show', function () {
    //     popupWin.show();
    //     popupWin.focus();
    // });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('quit', () => {
    popupWin = null;
    settingsWin = null;
    tray = null;
});

let updateInProgress = false;
const attachAutoUpdaterListeners = () => {
    autoUpdater.on('checking-for-update', () => {
        // console.log('-----------checking-for-update: ');
        updateVersionInfo({ checkingForUpdates: true, updateInfo: null });
    });

    autoUpdater.on('update-available', (info) => {
        updateInProgress = true;
        // console.log('-----------update-available: ', info);
        updateVersionInfo({ updateAvailable: true, checkingForUpdates: false, updateInfo: info });
    });
    autoUpdater.on('update-not-available', (info) => {
        // console.log('-----------update-not-available: ', info);
        updateVersionInfo({ updateAvailable: false, checkingForUpdates: false });
    });

    // autoUpdater.on('download-progress', (progress) => {
    //     // console.log('-----------download-progress: ', progress);
    //     updateVersionInfo({ updateProgress: progress });
    // });

    autoUpdater.on('update-downloaded', (info) => {
        // console.log('-----------update-downloaded: ', info);
        updateVersionInfo({ updateDownloaded: true });
    });

    ipcMain.on('download-update', () => {
        const cancellationToken = new CancellationToken();
        autoUpdater.downloadUpdate(cancellationToken).then(() => {
            updateInProgress = false;
            // console.log('-------------autoUpdater.downloadUpdate - resolved');
        }, () => {
            // console.log('-------------autoUpdater.downloadUpdate - rejected');
            updateInProgress = false;
        });
        updateVersionInfo({ updateDownloading: true, checkingForUpdates: false });
        // cancellationToken.cancel();
    });

    ipcMain.on('install-update', () => {
        autoUpdater.quitAndInstall();
    });
}
