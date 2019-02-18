import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Popup from './views/Popup';
import Settings from './views/Settings';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/popup" component={Popup} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
