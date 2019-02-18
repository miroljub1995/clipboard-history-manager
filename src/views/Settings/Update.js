import React, { Component } from 'react';
import './Update.css';

class Update extends Component {
    render() {
        const { versionInfo, onDownloadClick, onInstallClick } = this.props;
        if(versionInfo.checkingForUpdates) {
            return <CheckingForUpdate />;
        }
        if(versionInfo.updateDownloaded) {
            return <ReadyToInstall onInstallClick={onInstallClick} />
        }
        if (versionInfo.updateDownloading) {
            return <Downloading />;
        }
        if (versionInfo.updateAvailable) {
            return <UpdateAvailables onDownloadClick={onDownloadClick} currentVersion={versionInfo.current} newVersion={versionInfo.updateInfo.version} />;
        }
        return <UpToDate version={versionInfo.current} />;
    }
}

const UpToDate = ({ version }) => {
    return (
        <div className='view-container'>
            <svg className="svg-icon" viewBox="0 0 20 20">
                <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
            </svg>
            <p>Your application is up to date</p>
            <p>{`Current version: ${version}`}</p>
        </div>);
}

const CheckingForUpdate = () => (
    <div className='view-container'>
        <svg className="checking-for-update-icon" viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1" />
            </circle>
            <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2" />
            </circle>
            <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3" />
            </circle>
        </svg>
        <p>Checking for updates</p>
    </div>
);

const UpdateAvailables = ({currentVersion, newVersion, onDownloadClick}) => {
    return (
        <div className='view-container'>
            <svg version="1.1" className="download-update-icon" viewBox="0 0 471.2 471.2" enableBackground="new 0 0 471.2 471.2">
                <g>
	                <g>
		                <path d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8
			                c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8
			                C471.2,236.25,465.2,230.15,457.7,230.15z"/>
		                <path d="M226.1,346.75c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-62.7,62.8
			                V30.75c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
			                L226.1,346.75z"/>
	                </g>
                </g>
            </svg>
            <strong>Update available</strong>
            <strong>{`Current version is: ${currentVersion}`}</strong>
            <strong>{`New version is: ${newVersion}`}</strong>
            <button onClick={onDownloadClick} className="update-button">Download</button>
        </div>
    );
}

const Downloading = () => (
    <div className='view-container'>
<svg className="downloading-icon" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#00">
    <rect y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
        <animate attributeName="height"
             begin="0s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
</svg>
<p>Downloading</p>
    </div>
)

const ReadyToInstall = ({onInstallClick}) => (
    <div className='view-container'>
        <button onClick={onInstallClick} className="update-button">Install</button>
    </div>
)

export default Update;