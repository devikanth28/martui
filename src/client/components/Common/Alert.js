import React from 'react';
import PropTypes from "prop-types";
import Validate from '../../helpers/Validate';

export const ALERT_TYPE_SUCCESS = "Success";
export const ALERT_TYPE_ERROR = "Error";
export const ALERT_TYPE_INFO = "Info";
export const ALERT_TYPE_WARNING = "Warning";

export const Alert = (props) => {

    const validate = Validate();
    const message = validate.isNotEmpty(props.alertInfo.message) ? props.alertInfo.message : "";
    const type = validate.isNotEmpty(props.alertInfo.type) ? props.alertInfo.type : "";

    const getSvg = (type) =>{
        switch (type) {
            case ALERT_TYPE_SUCCESS:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g transform="translate(-0.047 -0.046)">
                            <circle fill="#08ce73" cx="12" cy="12" r="12" transform="translate(0.047 0.046)" />
                            <path fill="#fcfcfc" d="M10.191,17.921a.882.882,0,0,1-.6-.3l-3.58-3.59a.9.9,0,0,1,1.193-1.2l2.984,2.992,8.951-7.85a.9.9,0,0,1,1.193,1.34l-9.548,8.376a.834.834,0,0,1-.6.227Z" transform="translate(-1.207 -0.868)" />
                        </g>
                    </svg>
                )
                break;
            case ALERT_TYPE_INFO:
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18">
                        <path fill="#FFF" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"/>
                    </svg>
                )
                break;
            case ALERT_TYPE_WARNING:
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                )
                break;
            case ALERT_TYPE_ERROR:
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                )
                break;
            default:
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18">
                        <path fill="#FFF" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"/>
                    </svg>
                )
                break;
        }
    }

    if(validate.isEmpty(message)) {
        return null;
    }

    if(validate.isNotEmpty(props.duration)) {
        setTimeout(() => {
            props.onDurationEnd({ message: "", type: "" });
        }, props.duration);
    }

    return (
        <React.Fragment>
            <ol className={validate.isNotEmpty(props.className)? props.className : "toast-container b-l"}>
                <li className="with-btn">
                    <span className="mr-3">
                        {getSvg(type)}
                    </span>
                    <span className="toast-content">{message}</span>
                    <button type="button" role="button" className="btn border-0" value="close" onClick={() => props.onDurationEnd({ message: "", type: "" })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <g transform="translate(-48.941 -281.937)">
                                <rect fill="none" width="18" height="18" transform="translate(48.941 281.937)"/>
                                <path fill="#FFF" d="M66.7,298.492l-7.579-7.562,7.563-7.563a.831.831,0,0,0-1.175-1.175l-7.567,7.562-7.562-7.578a.832.832,0,0,0-1.175,1.176l7.562,7.579-7.562,7.562a.831.831,0,1,0,1.132,1.218c.015-.013.029-.028.043-.043l7.562-7.563,7.563,7.563a.831.831,0,0,0,1.175,0h0a.818.818,0,0,0,.039-1.156Z" transform="translate(0 -0.002)"/>
                            </g>
                        </svg>
                    </button>
                </li>
            </ol>
        </React.Fragment>
    );
};

Alert.propTypes = {
    alertInfo: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    onDurationEnd: PropTypes.func.isRequired
};

export default Alert;