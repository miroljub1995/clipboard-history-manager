import React from 'react';
import './Export.css';

const Export = ({onExport}) => {
    return (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%"
        }}>
            <button className="export-button" onClick={onExport} >Export clipboard to file</button>        
        </div>
    )
}

export default Export;