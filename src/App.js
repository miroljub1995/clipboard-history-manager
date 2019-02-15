import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Popup from './views/Popup';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/popup" component={Popup} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
