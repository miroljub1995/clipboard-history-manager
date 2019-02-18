import React from "react";
import './AppNavigation.css';
import { Link } from 'react-router-dom';

class AppNavigation extends React.Component {
    render() {
        return (
            <nav className="main-menu">
                <ul>
                    <li>
                        <Link replace={true} to='/settings/home'>
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">Home</span>
                        </Link>

                    </li>
                    <li>
                        <Link replace={true} to='/settings/update'>
                            <i className="fa fa-download fa-2x"></i>
                            <span className="nav-text">Update</span>
                        </Link>

                    </li>
                    
                    <li>
                        <Link replace={true} to='/settings/export'>
                            <i className="fa fa-file fa-2x"></i>
                            <span className="nav-text">Export</span>
                        </Link>

                    </li>
                </ul>
            </nav>
        );
    }
}

export default AppNavigation;