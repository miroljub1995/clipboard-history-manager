import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppNavigation from './AppNavigation';
import Home from './Home';
import Update from './Update';
import './index.css';

class Settings extends Component {
    render() {
        return (
            <div className='settings-container'>
                <AppNavigation />
                <div className='body'>
                    <Switch>
                        <Route path='/settings/home' component={Home} />
                        <Route path='/settings/update' component={Update} />
                    </Switch>
                </div>
            </div>);
    }
}

export default Settings;