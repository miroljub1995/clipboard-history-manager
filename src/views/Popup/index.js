import React, { Component } from 'react';
import './index.css';
import SelectableList from './SelectableList';

const electron = window.require('electron');
const clipboard = window.require('electron-clipboard-extended');
const ipcRenderer = electron.ipcRenderer;
const electronMain = electron.remote;
let globalState = electronMain.getGlobal('state');

class Popup extends Component {
  state = {
    clipboards: globalState.clipboards,
    selectedIndex: 0
  };

  constructor(props) {
    super(props);

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'v') || e.key === 'Enter') {
        e.preventDefault();
        globalState.commitSelect(this.state.selectedIndex);
        this.setState({ clipboards: globalState.clipboards, selectedIndex: 0 });
        ipcRenderer.send('onPopupPaste');
      }
    });
    clipboard.on('text-changed', this.onTextChange).startWatching();
  }

  onTextChange = () => {
    this.setState(() => {
      let currentText = clipboard.readText();
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
