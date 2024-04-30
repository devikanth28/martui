import React, {useState, useEffect} from 'react';

const AlertMessage = (props) => {

    return (
        <React.Fragment>
            <ol className="toast-container b-l">
                <li className="d-none">
                    <span>Product already available in cart. Please change the quantity12</span>
                </li>
                {props.showAlertMessage && <li className="with-btn">
                    <span className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18">
                        <path fill="#FFF" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"/>
                        </svg>
                    </span>
                    <span className="toast-content">{props.message}</span>
                    <button type="button" className="btn" value="close" onClick={() => props.closeAlertMessage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g transform="translate(-48.941 -281.937)">
                            <rect fill="none" width="18" height="18" transform="translate(48.941 281.937)"/>
                            <path fill="#FFF" d="M66.7,298.492l-7.579-7.562,7.563-7.563a.831.831,0,0,0-1.175-1.175l-7.567,7.562-7.562-7.578a.832.832,0,0,0-1.175,1.176l7.562,7.579-7.562,7.562a.831.831,0,1,0,1.132,1.218c.015-.013.029-.028.043-.043l7.562-7.563,7.563,7.563a.831.831,0,0,0,1.175,0h0a.818.818,0,0,0,.039-1.156Z" transform="translate(0 -0.002)"/>
                        </g>
                        </svg>
                    </button>
                </li>}
                <li className="with-lg-btn d-none">
                    <span>Product already available in cart. Please change the quantity12</span>
                    <div className="text-right mt-2">
                        <button className="btn" type="button" value="Long Text Button">Long Text Button</button>
                    </div>
                    
                </li>
                <li className="with-btn d-none">
                    <span className="toast-content">Product already available in cart. Please change the quantity12</span>
                    <button className="btn" type="button" value="Button">Button</button>
                </li>
            </ol>
        </React.Fragment>
    )
}

export default AlertMessage;