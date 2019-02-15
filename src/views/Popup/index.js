import React, { Component } from 'react';
import './index.css';
import SelectableList from './SelectableList';

const clipboard = window.require('electron-clipboard-extended');
const electron = window.require('electron');
const electronMain = electron.remote;
const { globalShortcut, ipcRenderer } = electronMain;

let globalState = electronMain.getGlobal('state');
// globalState.add("proba");
// globalState = electronMain.getGlobal('state');

let registerShortcut = (shortcut, callback) => {
  globalShortcut.register(shortcut, callback);
}

let unregisterShortcut = (shortcut) => {
  globalShortcut.unregister(shortcut);
}

class Popup extends Component {
  state = {
    clipboards: globalState.clipboards
  };

  constructor(props) {
    super(props);

    registerShortcut('CommandOrControl+V', this.onShortcutPaste);
    clipboard.on('text-changed', this.onTextChange).startWatching();
  }

  onShortcutPaste = () => {
    ipcRenderer.send('popup-paste');
  }

  onTextChange = () => {
    this.setState(() => {
      let currentText = clipboard.readText();
      globalState.add(currentText);
      return { clipboards: globalState.clipboards }
    });
  }

  render() {
    return (
      <div className="Popup">
        <header className="Popup-header">
          {/* <div>{"Is developement enviroment: " + isDev}</div> */}
          {/* <div>{"Global state: " + JSON.stringify(this.state.clipboards)}</div> */}
          {/* <div>This is popup window</div> */}
          <SelectableList items={this.state.clipboards} selectedIndex={0} onChange={(selected) => { console.log(selected) }} />
        </header>
      </div>
    );
  }
}

export default Popup;
