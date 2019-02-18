import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppNavigation from './AppNavigation';
import Home from './Home';
import Update from './Update';
import Export from './Export';
import './index.css';
const { remote, ipcRenderer } = window.require('electron');

class Settings extends Component {
    state = {
        versionInfo: remote.getGlobal('versionInfo')
    }
    constructor() {
        super();
        ipcRenderer.on('versionInfo-updated', (e, versionInfo) => {
            console.log(e, versionInfo);
            this.setState({ versionInfo });
        });
        document.title = "Settings";
    }

    handleDownloadClick = () => {
        ipcRenderer.send('download-update');
    }

    handleInstallClick = () => {
        ipcRenderer.send('install-update');
    }

    handleOnExport = () => {
        const { remote } = window.require('electron');
        const { dialog } = remote;
        var fs = window.require('fs');

        let content = remote.getGlobal('state').clipboards.join('\n');
        dialog.showSaveDialog((fileName) => {
            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }

            fs.writeFile(fileName, content, (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                }
                alert("The file has been succesfully saved");
            });
        });
    }

    render() {
        return (
            <div className='settings-container'>
                <AppNavigation />
                <div className='body'>
                    <Switch>
                        <Route exact path="/settings/" component={() => (<Update onInstallClick={this.handleInstallClick} onDownloadClick={this.handleDownloadClick} versionInfo={this.state.versionInfo} />)}/>
                        <Route path='/settings/home' component={Home} />
                        <Route path='/settings/update' component={() => (<Update onInstallClick={this.handleInstallClick} onDownloadClick={this.handleDownloadClick} versionInfo={this.state.versionInfo} />)} />
                        <Route path='/settings/export' component={() => <Export onExport={this.handleOnExport} />} />
                    </Switch>
                </div>
            </div>);
    }
}

export default Settings;