import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function Loader(props) {
    return (
        <React.Fragment>
            {/* <div className="loader-container">
                <div className="loader">loader</div>
            </div> */}
            Loading...
        </React.Fragment>
    )
}

export function BackDropLoader(props){
    return (
        <React.Fragment>
            <div className="backdrop">
                <div className="loader-container">
                    <div className="loader">BackDropLoader</div>
                </div>
            </div>
        </React.Fragment>
    )
}