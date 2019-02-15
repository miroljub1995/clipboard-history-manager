import React, { Component } from 'react';
import './index.css';

// const isDev = window.require('electron-is-dev');
let globalState = window.require('electron').remote.getGlobal('state');
globalState.add("proba");
globalState = window.require('electron').remote.getGlobal('state');

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = globalState;
  }

  render() {
    return (
      <div className="Popup">
        <header className="Popup-header">
          {/* <div>{"Is developement enviroment: " + isDev}</div> */}
          <div>{"Global state: " + JSON.stringify(globalState)}</div>
          <div>This is popup window</div>
        </header>
      </div>
    );
  }
}

export default Popup;
