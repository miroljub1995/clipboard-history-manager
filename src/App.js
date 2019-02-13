import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const isDev = window.require('electron-is-dev');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>{"Is developement enviroment: " + isDev}</div>
        </header>
      </div>
    );
  }
}

export default App;
