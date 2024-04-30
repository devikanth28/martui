import React, { useState } from 'react';
import Validate from '../../../../helpers/Validate';
import {Alert,ALERT_TYPE_INFO,ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING} from '../../Alert';
import RegistrationService from '../../../../services/RegistrationService'; 

const ForgotPassword = (props) =>{
    const validate = Validate();
    const registrationService = RegistrationService();
    const [disable, setDisable] = useState(true);
    const [loginId, setLoginId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    const handleChange = (e) => {
        showErr(e, false);
    }

    const handleChangeBlur = (e) => {
        showErr(e, true);
    }

    const showErr = (e, isErrorMsgReq) => {
        let errMsg;
        if (e.target.id == "loginId") {
            setLoginId(e.target.value);
            errMsg = (validate.isEmpty(validate.email(e.target.value, 45)) || validate.isEmpty(validate.mobileNumber(e.target.value))) ? null : "Enter valid Email Id / Mobile Number";
            if (isErrorMsgReq)
                setErrorMsg({ ...errorMsg, [e.target.id]: errMsg })
            else
                setErrorMsg({ ...errorMsg, [e.target.id]: "" });
        }
        if (validate.isEmpty(errMsg)) {
            setDisable(false);
            setErrorMsg({});
        } else {
            setDisable(true);
        }
    }

    const handleSubmit = () => {
        setDisable(true);
        setLoading(true);
        registrationService.forgetPassword(loginId).then(response=>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS"){
                setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});
                setLoginId('');
            } else {
                setAlertInfo({message:response.message,type:ALERT_TYPE_WARNING});
                setLoginId('');
            }
            setDisable(false);
            setLoading(false);
        }).catch(err => {
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            setLoginId('');
            setLoading(false);
            setDisable(false);
            return;
        }); 
    }

    return(
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <a title="Back" onClick={()=>{props.setShowModal({LoginWithPassword:true})}} href="javascript:void(0)" className="btn btn-link btn-sm ml-n2 mt-n5 no-underline text-dark">
                <svg className="align-middle mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g transform="translate(-48.941 -316.765)">
                        <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                        <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                    </g>
                </svg>
                Back
            </a>
            <div className="w-75-form">
                <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['loginId']) && 'form-group-error'}`}>
                    <input tabIndex={-1} type="text" className={validate.isNotEmpty(errorMsg['loginId']) ? "form-control is-invalid" : " form-control"}  id="loginId"  value={loginId} name="Email/Mobile Number" onChange={(e)=>handleChange(e)} onFocus={(e) => handleChange(e)} onBlur={(e)=> handleChangeBlur(e)} maxLength="45" placeholder=' '/>
                    <label htmlFor="loginId">Email Id / Mobile Number</label>
                    {validate.isNotEmpty(errorMsg['loginId']) && 
                    <div className="invalid-feedback d-block">
                        {errorMsg['loginId']}
                    </div>
                    }
                </div>
                <button className="btn btn-brand btn-block" disabled ={disable || loading} onClick={()=>handleSubmit()}>
                    {loading &&
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                    }
                    {!loading &&
                        <React.Fragment>
                            Send Password
                        </React.Fragment>
                    }
                </button>
                <p className="mt-4 mb-0">New to MedPlus Mart? <a onClick={()=>{
                        props.setShowModal({
                            RegistrationForm : true
                    })}} href="javascript:void(0)" title="Sign Up" className="ml-2 font-weight-bold">Sign Up</a>
                </p>
            </div>
        </React.Fragment>
        
    )
}

export default ForgotPassword;