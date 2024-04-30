import React,{useEffect, useRef, useState} from 'react';
import Validate from '../../../../helpers/Validate';
import { Alert,ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../Alert';
import LocalDB from '../../../../DataBase/LocalDB';
import { sendLoginOtp } from '../../../../helpers/CommonUtil';
import { SendOTPEvent } from '../../../../Analytics/Analytics';

const LoginWithOtp = (props) => {
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const validate = Validate();
    const focus = useRef(null);

    useEffect(() => {
        focus.current.focus();
    },[]);

    const handleMobileChange = (e) => {
        if (validate.isEmpty(e.target.value)) {
            showError(e, false);
            setMobileNumber('');
            return;
        }
        else if (validate.isNumeric(e.target.value)) {
            showError(e, false);
        }
        else if (validate.isEmpty(mobileNumber)) {
            setMobileNumber('');
        }

    }
    const handleMobileChangeBlur = (e) => {
       showError(e,true);
    }
    const showError = (e, isErrorMsgReq) => {
        let errMsg = validate.mobileNumber(e.target.value);
        if (!isErrorMsgReq) {
            setErrorMsg('');
            setDisabled(true);
            setMobileNumber(e.target.value);
        }

        if (validate.isNotEmpty(errMsg) && isErrorMsgReq) {
            setDisabled(true);
            setErrorMsg(errMsg);
        }
        else if (validate.isEmpty(errMsg)) {
            setErrorMsg('');
            setDisabled(false);
            setMobileNumber(e.target.value);
        }
    }

    const handleEnter=(e)=> {
        if (e.keyCode == 13) {
            e.target.blur();
            getOtp();
        } 
    }

    const getOtp = async () => {
        setIsLoading(true);
        setDisabled(true);
        let mobileNumber_loginOtp = await sendLoginOtp(mobileNumber).catch(err=>{
            setAlertInfo({ message: err, type: ALERT_TYPE_ERROR });
        });
        if(mobileNumber_loginOtp){
            SendOTPEvent("Success")
            LocalDB.setValue("MOBILE_NUMBER",mobileNumber_loginOtp);
            props.setShowModal({
                VerifyOtp : true
            })
        } else {
            SendOTPEvent('Failure')
        }
        setIsLoading(false);
        setDisabled(false);
    }

    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <h6 className="title">
                Hello User,
                <strong>Welcome to MedPlusMart</strong>
            </h6>
            <small>Login with your Mobile Number</small>
            <div className="w-75-form">
                <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg) && 'form-group-error'}`}>
                    <input type="text" className={errorMsg ? "form-control is-invalid" :"form-control"} placeholder=" " id="mobileNumber" name="mobileNumber" maxLength="10" value={mobileNumber} onFocus={(e)=>handleMobileChange(e)} onBlur ={(e)=>handleMobileChangeBlur(e)} onChange={(e)=>handleMobileChange(e)} onKeyDown={(e)=>handleEnter(e)} ref={focus}/>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    {validate.isNotEmpty(errorMsg) &&
                    <div className="invalid-feedback d-block">
                        {errorMsg}
                    </div>
                    }
                </div>
                <button className="btn btn-brand-gradient rounded-pill btn-block custom-btn-lg" onClick={() => getOtp()} disabled={disabled||isLoading} >
                    {isLoading ? 
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                        :"Send OTP"
                    }
                </button>
            </div>
        </React.Fragment>
    )
}

export default LoginWithOtp;