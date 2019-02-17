import React, { Component } from 'react';
import './index.css';
import SelectableList from './SelectableList';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const electronMain = electron.remote;

// let a = electron.remote.clipboard.readText();
let a = navigator.clipboard.readText().then(text => console.log(text));

let globalState = electronMain.getGlobal('state');
// globalState.add("proba");
// globalState = electronMain.getGlobal('state');

class Popup extends Component {
  // clipboard = window.require('electron-clipboard-extended');
  state = {
    clipboards: globalState.clipboards,
    selectedIndex: 0
  };

  constructor(props) {
    super(props);

    window.addEventListener('keydown', (e) => {
      debugger;
      console.log(e.ctrlKey, e.key);
      if ((e.ctrlKey && e.key === 'v') || e.key === 'enter') {
        e.preventDefault();
        globalState.commitSelect(this.state.selectedIndex);
        ipcRenderer.send('onPopupPaste');
      }
    });
    debugger;
    // window.require('electron-clipboard-extended').on('text-changed', this.onTextChange).startWatching();
  }

  onShortcutPaste = () => {
    ipcRenderer.send('popup-paste');
  }

  onTextChange = () => {
    this.setState(() => {
      let currentText = window.require('electron-clipboard-extended').readText();
      globalState.add(currentText);
      return { clipboards: globalState.clipboards }
    });
  }

  handleOnSelect = (index) => {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { clipboards, selectedIndex } = this.state;
    return (
      <div className="Popup">
        <header className="Popup-header">
          {/* <div>{"Is developement enviroment: " + isDev}</div> */}
          {/* <div>{"Global state: " + JSON.stringify(this.state.clipboards)}</div> */}
          {/* <div>This is popup window</div> */}
          <SelectableList items={clipboards} selectedIndex={selectedIndex} onSelect={this.handleOnSelect} />
        </header>
      </div>
    );
  }
}

export default Popup;
