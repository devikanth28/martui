import React, { useEffect, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import RegistrationService from '../../../../services/RegistrationService';
import {Alert, ALERT_TYPE_ERROR, ALERT_TYPE_WARNING } from '../../Alert';
import LocalDB from '../../../../DataBase/LocalDB';
import CONFIG from '../../../../constants/ServerConfig';
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import CartAction from '../../../../../redux/action/CartAction';
import { sendLoginOtp } from '../../../../helpers/CommonUtil';
const LoginWithPassword = (props) => {

    const validate = Validate();
    const registrationService = RegistrationService();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    const [captchaCode, setCaptchaCode] = useState(null);
    const [captchaData, setCaptchaData] = useState(null);
    const [isCaptchaRequired, setIsCaptchaRequired] = useState(false);
    useEffect(()=>{
        getCaptchaImage({});
    },[])
    const getCaptchaImage = (obj) => {
        registrationService.getLoginCaptcha(obj).then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setCaptchaData(response.dataObject);
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.timeStamp)){
                    setCaptchaCode(response.dataObject.timeStamp);
                    setIsCaptchaRequired(false);
                } else {
                    setCaptchaCode("");
                    setIsCaptchaRequired(true);
                }
            }
        });
    }
    const handleInputChange = (e) => {
        showErr(e, false);
    }
    const showErr = (e, isErrorMsgReq) => {
        let errMsg, loginErr, passwordErr;
        if (e.target.id == "Password") {
            setPassword(e.target.value);
            passwordErr = validate.password(e.target.value, e.target.id);
            loginErr = (validate.isEmpty(validate.email(loginId, 45)) || validate.isEmpty(validate.mobileNumber(loginId))) ? null : "Enter valid Email Id / Mobile Number";
            if (isErrorMsgReq)
                setErrorMsg({ ...errorMsg, [e.target.id]: passwordErr });
            else
                setErrorMsg({ ...errorMsg, [e.target.id]: "" });
        } else if (e.target.id == "loginId") {
            setLoginId(e.target.value);
            passwordErr = validate.password(password, "password");
            loginErr = (validate.isEmpty(validate.email(e.target.value, 45)) || validate.isEmpty(validate.mobileNumber(e.target.value))) ? null : "Enter valid Email Id / Mobile Number";
            if (isErrorMsgReq)
                setErrorMsg({ ...errorMsg, [e.target.id]: loginErr })
            else
                setErrorMsg({ ...errorMsg, [e.target.id]: "" });
        }
        if (validate.isEmpty(loginErr) && validate.isEmpty(passwordErr)) {
            setDisable(false);
            setErrorMsg({});
        } else {
            setDisable(true);
        }
    }
    const handleInputChangeBlur = (e) => {
        showErr(e, true);
    }

    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            e.target.blur();
            loginWithPassword();
        }
    }

    async function signInOtp(){
        let loginErrorMsg = validate.mobileNumber(loginId);
        if(validate.isNotEmpty(loginErrorMsg)){
            if(validate.isEmpty(loginId)){
                props.setShowModal({
                    LoginWithOtp : true
                })
            } else {
                setErrorMsg({ ...errorMsg, ["loginId"]: "Please enter valid mobile number" });
                return;
            }
        } else if(validate.isNotEmpty(loginId)){
            let mobileNumber_loginOtp = await sendLoginOtp(loginId).catch(err=>{
                setAlertInfo({ message: err, type: ALERT_TYPE_ERROR });
            });
            if(mobileNumber_loginOtp){
                LocalDB.setValue("MOBILE_NUMBER",mobileNumber_loginOtp);
                props.setShowModal({
                    VerifyOtp : true
                })
            }
        }
    }

    const loginWithPassword = () => {
        if(validate.isEmpty(loginId)){
            setErrorMsg({ ...errorMsg, ["loginId"]: "Please enter valid UserId" });return;
        } else if(!(validate.isEmpty(validate.email(loginId, 45)) || validate.isEmpty(validate.mobileNumber(loginId)))){
            setErrorMsg({ ...errorMsg, ["loginId"]: "Enter valid emailId/mobile" });setDisable(true);return;
        } else if(validate.isNotEmpty(validate.password(password))){
            setErrorMsg({ ...errorMsg, ["Password"]: validate.password(password,"Password") });setDisable(true);return;
        } else if(isCaptchaRequired && validate.isEmpty(captchaCode)){
            setErrorMsg({ ...errorMsg, ["captchaCode"]: "Please enter captcha" });setDisable(true);return;
        }
        setLoading(true);
        registrationService.loginWithPassword({ loginId: loginId, password: password, captchaCode: captchaCode }).then(async data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" === data.statusCode) {
                await userInfoAction.reloadUserInfo();
                await cartAction.updateShoppingCartInfo();
                let url = LocalDB.getValue("fromPage");
                LocalDB.removeValue("fromPage");
                window.location.href = validate.isNotEmpty(url) ? url : CONFIG.REDIRECT_HOME_URL + "myProfile";
                // redirect to from page/relaod page/move to home page 
            } else if (data.message === "USER_ALREADY_LOGEDIN"){
                setAlertInfo({ message: "User Already loggedin", type: ALERT_TYPE_WARNING });
                    let url = LocalDB.getValue("fromPage");
                    LocalDB.removeValue("fromPage");
                    if(url) {
                        window.location.href = url;
                    } else {
                        props.history.go(-1);
                    }
            } else{
                if(data.message === "INVALID_CAPTCHA"){
                    setAlertInfo({ message: isCaptchaRequired ? "Invalid Captcha" : "Login Failed please try again", type: ALERT_TYPE_WARNING });
                } else {
                    setLoginId('');
                    setAlertInfo({ message: data.message, type: ALERT_TYPE_WARNING });
                }
                setPassword('');
                getCaptchaImage({loginId:loginId});
                setDisable(true);
                setLoading(false);
            }
        }).catch(err => {
            setAlertInfo({ message: "something went wrong", type: ALERT_TYPE_ERROR });
            setDisable(false);
            setLoading(false);
        })
    }

    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            <a title="Back" onClick={()=>{props.setShowModal({LoginWithOtp:true})}} href="javascript:void(0)" className="btn btn-link btn-sm ml-n2 mt-n5 no-underline text-dark">
                <svg className="align-middle mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g transform="translate(-48.941 -316.765)">
                        <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                        <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                    </g>
                </svg>
                Back
            </a>
            <h6 className="title">
                Hello User,
                <strong>Welcome to MedPlusMart</strong>
            </h6>
            <small>Login with your registered Email ID or Mobile Number</small>
            <div className="w-75-form">
                <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['loginId']) && 'form-group-error'}`}>
                    <input type="text" className={validate.isNotEmpty(errorMsg['loginId']) ? "form-control is-invalid" : "form-control"} id="loginId" name="Email/Mobile Number" placeholder=" " value={loginId} onFocus={(e) => handleInputChange(e)} onBlur={(e) => handleInputChangeBlur(e)} onKeyDown={(e) => handleEnter(e)} maxLength="45" onChange={(e) => handleInputChange(e)} />
                    <label htmlFor="loginId">Email ID / Mobile Number</label>
                    {validate.isNotEmpty(errorMsg['loginId']) &&
                        <div className="invalid-feedback d-block">
                            {errorMsg['loginId']}
                        </div>
                    }
                </div>
                <div className={`form-group has-float-label password-feild ${validate.isNotEmpty(errorMsg['Password']) && 'form-group-error'}`}>
                    <input type={showPassword ? "text" : "password"} className={validate.isNotEmpty(errorMsg['Password']) ? "form-control is-invalid" : "form-control"} id="Password" name="password" maxLength="20" placeholder=" " onKeyDown={(e) => handleEnter(e)} value={password} onFocus={(e) => handleInputChange(e)} onBlur={(e) => handleInputChangeBlur(e)}  onChange={(e) => handleInputChange(e)} />
                    <label htmlFor="Password">Enter Password</label>
                    {validate.isNotEmpty(errorMsg['Password']) &&
                        <div className="invalid-feedback d-block">
                            {errorMsg['Password']}
                        </div>
                    }
                    <a href="javascript:void(0)" tabIndex={-1} className="btn btn-link" title="" onClick={() => { setShowPassword(!showPassword) }} style={validate.isNotEmpty(errorMsg['Password']) ? { "right": "2.25rem"}  : {}}>
                        {!showPassword &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.748 24.748">
                                <g className="svg-opacity" transform="translate(0.488 0.732)">
                                    <rect fill="none" width="24" height="24" />
                                    <g transform="translate(17250 18250)">
                                        <path fill="#b7b7b7" d="M30.114,31.523l.386-.478-.414-.5c-3.641-4.3-7.559-6.457-11.7-6.35-6.7.159-11.31,6.138-11.5,6.4l-.386.478.414.478c3.559,4.225,7.421,6.35,11.448,6.35h.276C25.314,37.741,29.921,31.762,30.114,31.523ZM18.555,36.332c-3.421.08-6.786-1.7-9.959-5.288,1.186-1.355,4.993-5.155,9.848-5.261,3.448-.08,6.786,1.7,9.959,5.288C27.217,32.4,23.41,36.226,18.555,36.332ZM18.5,27.166a3.882,3.882,0,1,0,4.028,3.879A3.96,3.96,0,0,0,18.5,27.166Zm0,6.191a2.313,2.313,0,1,1,2.4-2.312A2.359,2.359,0,0,1,18.5,33.357Z" transform="translate(-17256.5 -18269.186)" />
                                        <g fill="#b7b7b7" stroke="#FFF" transform="translate(-17249.074 -18247.904) rotate(-45)">
                                            <rect stroke="none" width="2" height="29" rx="1" />
                                            <rect fill="none" x="-0.5" y="-0.5" width="3" height="30" rx="1.5" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        }
                        {showPassword &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <g className="svg-opacity">
                                    <rect id="Rectangle_2791" data-name="Rectangle 2791" width="24" height="24" fill="none" />
                                    <g id="Group_4075" data-name="Group 4075" transform="translate(17250 18250)">
                                        <path id="Path_1936" data-name="Path 1936" d="M30.114,31.523l.386-.478-.414-.5c-3.641-4.3-7.559-6.457-11.7-6.35-6.7.159-11.31,6.138-11.5,6.4l-.386.478.414.478c3.559,4.225,7.421,6.35,11.448,6.35h.276C25.314,37.741,29.921,31.762,30.114,31.523ZM18.555,36.332c-3.421.08-6.786-1.7-9.959-5.288,1.186-1.355,4.993-5.155,9.848-5.261,3.448-.08,6.786,1.7,9.959,5.288C27.217,32.4,23.41,36.226,18.555,36.332ZM18.5,27.166a3.882,3.882,0,1,0,4.028,3.879A3.96,3.96,0,0,0,18.5,27.166Zm0,6.191a2.313,2.313,0,1,1,2.4-2.312A2.359,2.359,0,0,1,18.5,33.357Z" transform="translate(-17256.5 -18269.186)" fill="#343a40" />
                                    </g>
                                </g>
                            </svg>
                        }
                    </a>
                </div>
                {isCaptchaRequired &&
                    <div className="position-relative captchaCode">
                        <div className={`form-group has-float-label position-relative mb-0  ${validate.isNotEmpty(errorMsg['captchaCode']) && 'form-group-error'}`}>
                            <input type="text" className={validate.isNotEmpty(errorMsg['captchaCode']) ? "form-control is-invalid" : "form-control"} id="captchaCode" name="captchaCode" placeholder=" " maxLength="6" value={captchaCode} onFocus={() => setErrorMsg({ ...errorMsg, ['captchaCode']: "" })} onKeyDown={(e) => handleEnter(e)} onChange={(e)=>setCaptchaCode(e.target.value)} />
                            <label htmlFor="captchaCode">Please enter the code here</label>
                            {validate.isNotEmpty(errorMsg['captchaCode']) &&
                                <div className="invalid-feedback d-block">
                                    {errorMsg['captchaCode']}
                                </div>
                            }
                        </div>
                        <img src={`data:image/png;base64,${captchaData.base64Image}`} className="position-absolute" alt="captcha" title="captcha"/>
                        <p>                        
                            <small>Unable to read, Refresh
                            <svg className='ml-1 pointer' onClick={()=>getCaptchaImage({isRefresh:true})} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.004 24">
                                <g id="refresh_black_icon_24px" transform="translate(-0.302)">
                                    <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(0.306)" fill="none" />
                                    <g id="Group_2531" data-name="Group 2531" transform="translate(0.302 2)">
                                        <path id="Path_1096" data-name="Path 1096" d="M2082.81,339.873a9.622,9.622,0,0,1,9.487,8.111h-1.345a8.276,8.276,0,0,0-15.875-1.451h2.288l-1.616,1.726-1.614,1.725-1.612-1.725-1.616-1.726h2.764A9.609,9.609,0,0,1,2082.81,339.873Z" transform="translate(-2070.905 -339.873)" fill="#080808" />
                                        <path id="Path_1097" data-name="Path 1097" d="M2091.271,347.4l1.613,1.725,1.616,1.726h-2.923a9.6,9.6,0,0,1-18.657-1.355h1.344a8.278,8.278,0,0,0,15.914,1.355h-2.137l1.616-1.726Z" transform="translate(-2070.496 -338.402)" fill="#080808" />
                                    </g>
                                </g>
                            </svg>
                        </small></p>
                    </div>
                }
                <button disabled={disable || loading || (isCaptchaRequired ? validate.isEmpty(captchaCode) : false)} onClick={() => { loginWithPassword() }} className="btn btn-brand btn-block">
                    {!loading && <React.Fragment>Login</React.Fragment>}
                    {loading &&
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                    }
                </button>
                <div className="btn-container my-4 mx-n2">
                    <a href="javascript:void(0)" className="text-primary btn btn-link btn-sm font-14" onClick={() => signInOtp()} title="Login with OTP">Login with OTP</a>
                    <a onClick={() => {
                        props.setShowModal({
                            ForgotPassword: true
                        })
                    }} href="javascript:void(0)" title="Forgot Password?" className="text-primary btn btn-link btn-sm font-14 float-right">Forgot Password?</a>
                </div>
                <p className="mb-0 mt-4">New to MedPlus Mart?
                    <a href="javascript:void(0)" onClick={() => {
                        props.setShowModal({
                            RegistrationForm: true
                        })
                    }} title="Sign Up" className="ml-2 font-weight-bold">Sign Up</a>
                </p>
            </div>
        </React.Fragment>
    )
}

export default LoginWithPassword;