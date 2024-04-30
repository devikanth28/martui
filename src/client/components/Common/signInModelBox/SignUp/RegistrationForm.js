import React,{useState,useEffect, useRef} from 'react';
import Validate from '../../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO,ALERT_TYPE_ERROR} from '../../Alert';
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import CartAction from '../../../../../redux/action/CartAction';
import RegistrationService from '../../../../services/RegistrationService';
import CONFIG from '../../../../constants/ServerConfig';
import OtpInput from 'react-otp-input';
import LocalDB from '../../../../DataBase/LocalDB';
import { sendRegistrationSuccessEvent } from '../../../../Analytics/UserRegisterAnalytics';
import { SkipRegistrationEvent ,RegistrationLogin} from '../../../../Analytics/Analytics';


const RegistrationForm = (props) =>{
    
    const inputIds = ["fullName"];
    const [registrationObject,setRegistrationObject] = useState({receiveUpdates : false});
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    const registrationService = RegistrationService();
    const [errorMsg, setErrorMsg] = useState({});
    const [otpErrorMsg, setOtpErrorMsg] = useState("");
    const [otp, setOtp] = useState("");
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);
    const [showOtpSection, setShowOtpSection] = useState(false);
    const validate = Validate();
    const focus = useRef(null);

    useEffect(() => {
        focus.current.focus();
    },[]);

    const handleInputChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        let errMsg = validateRegistrationObject(event);
        if (errMsg)  {
            setErrorMsg({...errorMsg, [feildName]:errMsg});
            setDisabled(true);
        } else {
            setErrorMsg({...errorMsg, [feildName]:""});
            setDisabled(false);
        }
        setRegistrationObject({...registrationObject, [feildName]: feildValue});
        /* if (event.target.id.indexOf('confirmPassword') > -1) {
            if(validate.isEmpty(event.target.value)) {
                setErrorMsg({...errorMsg, [feildName]:"Confirm password is required"});
                setDisabled(true);
            } else if(event.target.value != registrationObject.password){
                setErrorMsg({...errorMsg, [feildName]:"Password and re-enter password do not match"});
                setDisabled(true);
            }else{
                setErrorMsg({...errorMsg, [feildName]:""});
            }
        } */
    }

    const validateRegistrationObject = (e) => {
        if (e.target.id.indexOf('fullName') > -1) {
            return validate.name(e.target.value,"Full Name", 30);
        }else if (e.target.id.indexOf('emailId') > -1) {
            if(validate.isEmpty(e.target.value)){
                return undefined;
            }
            else{
                return validate.email(e.target.value,45);
            }
        }/* else if (e.target.id.indexOf('lastName') > -1) {
            return validate.lastName(e.target.value, "Last Name", 30);
        }else if(e.target.id.indexOf('mobileNumber') > -1){
            return validate.mobileNumber(e.target.value);
        }else if(e.target.id.indexOf('password') > -1){
            return validate.password(e.target.value, "Password" , 20);
        } */
    }

    const updateregistrationObject = (event) => {
        if("Enter" === event.key){
            registerNewCustomer();
        }
    }

    const registerNewCustomer = () =>{
        setProcessLoading(true);
        setDisabled(true);
        let errorsFlagMsgs = {}
        let errorFlag = false;
        if(validate.isEmpty(registrationObject)) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["fullName"]:validate.name(registrationObject.fullName, "Full Name", 30)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        } 
        if(validate.isEmpty(registrationObject.fullName) || validate.isNotEmpty(validate.name(registrationObject.fullName, "Full Name", 30))){
            errorsFlagMsgs = {...errorsFlagMsgs, ["fullName"]:validate.name(registrationObject.fullName, "Full Name", 30)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        }
        if(validate.isNotEmpty(registrationObject.emailId) && validate.isNotEmpty(validate.email(registrationObject.emailId, 45))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["emailId"]:validate.email(registrationObject.emailId, 45)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        }
        /* if(validate.isEmpty(registrationObject.lastName) || validate.isNotEmpty(validate.lastName(registrationObject.lastName, "Last Name", 30))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["lastName"]:validate.lastName(registrationObject.lastName, "Last Name", 30)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        }
        if(validate.isEmpty(registrationObject.password) || validate.isNotEmpty(validate.password(registrationObject.password, "password", 20))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["password"]:validate.password(registrationObject.password, "password", 20)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        } 
        if (validate.isEmpty(registrationObject.password)) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["confirmPassword"]:"Confirm Password is required "};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        } else if((registrationObject.confirmPassword != registrationObject.password)) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["confirmPassword"]:"Your password and re-enter password do not match"};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        } 
        if(validate.isEmpty(registrationObject.mobileNumber) || validate.isNotEmpty(validate.mobileNumber(registrationObject.mobileNumber))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["mobileNumber"]:validate.mobileNumber(registrationObject.mobileNumber)};
            setProcessLoading(false);setDisabled(false);
            errorFlag = true
        } */
        if (errorFlag) {
            setProcessLoading(false);setDisabled(false);
            setErrorMsg(errorsFlagMsgs);
            return;
        }
        let customer = {};
        customer['firstName'] = registrationObject.fullName;
        customer['emailId'] = registrationObject.emailId;
        registrationService.registerNewCustomer({customer : JSON.stringify(customer)}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
               RegistrationLogin('Success')
               saveCustomerToToken();
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                RegistrationLogin('Failure')
            }
            setProcessLoading(false);
            setDisabled(false);
        }).catch(function(error) {
            console.log(error);
            RegistrationLogin('Failure')
            setProcessLoading(false);
            setDisabled(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const clearInputError=(event) => {
        let feildName = event.target.id;
        setErrorMsg({...errorMsg, [feildName]:""});
    }

    const handleOtpChange = otp => {
        if(validate.isEmpty(otp)){
            setOtpErrorMsg("Empty OTP");
        }else if(!validate.isNumeric(otp)){
            setOtpErrorMsg("OTP must be numeric");
        }else{
            setOtpErrorMsg();
            setOtp(otp);
            if(otp.length == 5){
                verifyRegistrationOTP(otp);
            }
        }
    }

    const verifyRegistrationOTP = (otpValue) =>{
        setProcessLoading(true);
        setDisabled(true);
        if(!validate.isNumeric(otpValue) || otpValue.length!==5){
            setOtpErrorMsg("Invalid OTP");
            setProcessLoading(false);
            setDisabled(false);
            return;
        }
        registrationService.verifyRegistrationOTP(otpValue).then(async response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                sendRegistrationSuccessEvent(response.responseData.customer.customerID);
                await userInfoAction.reloadUserInfo();
                await cartAction.updateShoppingCartInfo();
                setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});
                let url = LocalDB.getValue("fromPage");
                LocalDB.removeValue("fromPage");
                window.location.href = validate.isNotEmpty(url) ? url : CONFIG.REDIRECT_HOME_URL+"myProfile" ;
            }else{
                setOtp("");
                setAlertInfo({message:response.message,type:ALERT_TYPE_ERROR});
            }
            setProcessLoading(false);
            setDisabled(false);
        }).catch(function(error) {
            console.log('err', error);
            setProcessLoading(false);
            setDisabled(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
        });
    }

    const resendOtpForRegistration = () =>{
        setResendLoader(true);
        setDisabled(true);
        if(validate.isEmpty(registrationObject) ||validate.isEmpty(registrationObject.mobileNumber) || validate.isNotEmpty(validate.mobileNumber(registrationObject.mobileNumber))) {
            setResendLoader(false);
            return;
        }
        registrationService.regenerateOtpForRegistration().then(response =>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.responseData) && response.statusCode === "SUCCESS") {
                setAlertInfo({message:"OTP has been resent succesfully!",type:ALERT_TYPE_SUCCESS});     
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
            setDisabled(false);
            setResendLoader(false);
            setOtp("");
        }).catch(function(error) {
            console.log(error);
            setDisabled(false);
            setResendLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_ERROR});
            return;
        });
    }

    const isDataAvailable=() => {
        let buttonDisable = false;
        if (showRegistrationForm) {
            inputIds.forEach(inputType => {
                if (validate.isEmpty(registrationObject[inputType]) || validate.isNotEmpty(errorMsg[inputType])) {
                    buttonDisable = true;
                }
            });
            if (validate.isNotEmpty(validate.name(registrationObject["fullName"]))) {
                return true;
            }
            /*if (validate.isNotEmpty(validate.lastName(registrationObject["lastName"]))) {
                return true;
            }
            if (registrationObject["password"] !== registrationObject["confirmPassword"]) {
                return true;
            }
            if (validate.isNotEmpty(validate.email(registrationObject["emailId"]))) {
                return true;
            }
            if (validate.isNotEmpty(validate.mobileNumber(registrationObject["mobileNumber"]))) {
                return true;
            } */
        }
        return buttonDisable;
    }

    const handleValueChange = (event) => {
        if(event.target.id == 'emailId'){
            setErrorMsg('');
        }
        setRegistrationObject({ ...registrationObject , [event.target.id]: event.target.value});
        setDisabled(false);
    }

    const saveCustomerToToken = async () => {
        SkipRegistrationEvent()
        await userInfoAction.reloadUserInfo();
        await cartAction.updateShoppingCartInfo();
        let url = LocalDB.getValue("fromPage");
        LocalDB.removeValue("fromPage");
        window.location.href = validate.isNotEmpty(url) ? url : CONFIG.REDIRECT_HOME_URL+"myProfile" ;
    }
    
    return(
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            {showRegistrationForm &&
                <React.Fragment>
                    <h6 className="title">
                        Looks like you’re new here,
                        <strong>It is our pleasure to have you as a customer</strong>
                    </h6>
                    {/* <small className="text-muted">Please use your valid Email ID and Mobile Number</small> */}
                    <div className="mx-0 mt-3">
                            <div className={`form-group has-float-label px-0 mb-3 ${validate.isNotEmpty(errorMsg['fullName']) && 'form-group-error'}`}>
                                <input type="text" className="form-control" onChange={(e)=>handleValueChange(e)} id="fullName"  name="fullName"  maxLength="30" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onKeyPress={(event) => updateregistrationObject(event)} ref={focus}/>
                                <label htmlFor="fullName">Full Name<sup className="text-danger">*</sup></label>
                                {validate.isNotEmpty(errorMsg['fullName']) && <div className="invalid-feedback d-block">
                                        {errorMsg['fullName']}
                                </div>}
                            </div>               
                            <div className={`form-group has-float-label px-0 mb-3`}>
                                <input type="text" className="form-control" onChange={(e)=>handleValueChange(e)} id="emailId"  name="emailId" maxLength="45" placeholder=" " onFocus={clearInputError} onBlur={handleInputChange} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="emailId">Email Address</label>
                                {validate.isNotEmpty(errorMsg['emailId']) && <div className="invalid-feedback d-block">
                                    {errorMsg['emailId']}
                                </div>
                                }
                            </div>
                        </div>
                        {/* <div className="col-6 pr-0">
                            <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['lastName']) && 'form-group-error'}`}>
                                <input type="text" className="form-control" onChange={(e)=>handleValueChange(e)} id="lastName"  name="lastName" maxLength="30" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="lastName">Enter Last Name</label>
                                {validate.isNotEmpty(errorMsg['lastName']) &&
                                <div className="invalid-feedback d-block">
                                    {errorMsg['lastName']}
                                </div>
                                }
                            </div>
                        </div> */}
                    {/* <div className="row mx-0">
                        <div className="col-6 px-0">                
                            <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['emailId']) && 'form-group-error'}`}>
                                <input type="text" className="form-control" onChange={(e)=>handleValueChange(e)} id="emailId"  name="emailId"  maxLength="45" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="emailId">Enter Email ID</label>
                                {validate.isNotEmpty(errorMsg['emailId']) && <div className="invalid-feedback d-block">
                                    {errorMsg['emailId']}
                                </div>
                                }
                            </div>
                        </div>
                        <div className="col-6 pr-0">
                            <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['mobileNumber']) && 'form-group-error'}`}>
                                <input type="text" className="form-control" value={registrationObject["mobileNumber"] || ""}  id="mobileNumber"  name="mobileNumber" maxLength="10" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onChange={(e)=>handleMobileChange(e)} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="mobileNumber">Enter Mobile Number</label>
                                {validate.isNotEmpty(errorMsg['mobileNumber']) && 
                                <div className="invalid-feedback d-block">
                                    {errorMsg['mobileNumber']}
                                </div>
                                }
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="row mx-0">
                        <div className="col-6 px-0">
                            <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['password']) && 'form-group-error'}`}>
                                <input type="password" className="form-control" onChange={(e)=>handleValueChange(e)} id="password"  name="password" maxLength="20" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="password">Enter Password</label>
                                {validate.isNotEmpty(errorMsg['password']) &&
                                <div className="invalid-feedback d-block">
                                    {errorMsg['password']}
                                </div>
                                }
                            </div>
                        </div>
                        <div className="col-6 pr-0">
                            <div className={`form-group has-float-label ${validate.isNotEmpty(errorMsg['confirmPassword']) && 'form-group-error'}`}>
                                <input type="password" className="form-control" onChange={(e)=>handleValueChange(e)} id="confirmPassword"  name="confirmPassword" maxLength="20" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onKeyPress={(event) => updateregistrationObject(event)} />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                {validate.isNotEmpty(errorMsg['confirmPassword']) &&
                                    <div className="invalid-feedback d-block">
                                        {errorMsg['confirmPassword']}
                                    </div>
                                }
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="custom-control custom-checkbox mb-3" onClick={(e)=>{
                        e.preventDefault();
                        setRegistrationObject({
                            ...registrationObject,
                            receiveUpdates : !registrationObject.receiveUpdates
                        });
                        }}>
                        <input type="checkbox" checked={registrationObject.receiveUpdates} readOnly className="custom-control-input" id="recieve-updates"/>
                        <label className="custom-control-label" htmlFor="recieve-updates">Yes, I would like to be updated of new promotional offers.</label>
                    </div> */}
                </React.Fragment>
            }
            {showOtpSection &&
                <div className="pt-5">
                    <a title="Back" onClick={()=>{setShowOtpSection(false);setShowRegistrationForm(true);setRegistrationObject({receiveUpdates:true});}} href="javascript:void(0)" className="btn btn-link btn-sm ml-n2 mt-n5 no-underline text-dark">
                        <svg className="align-middle mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Back
                    </a>
                    <h5>OTP Confirmation</h5>
                    <h6>Please type the OTP sent to {registrationObject.mobileNumber}.</h6>
                    <div className="w-75-form">
                        <div className="filled-form position-relative form-group mb-3">      
                            <OtpInput className="custom-otp-fields" value={otp} inputStyle="otp-fields" onChange={handleOtpChange} numInputs={5} isInputNum={true}/>
                            <small  className="form-text invalid-feedback">{otpErrorMsg}</small>
                        </div>
                        <div className="d-flex justify-content-between mx-n2 mb-3">
                            <a type="button" className="btn btn-link text-dark font14 no-underline btn-sm font-weight-normal" href="javascript:void(0)" disabled={disabled || resendLoader} onClick={()=>{resendOtpForRegistration()}}>
                                {resendLoader ? 
                                    <React.Fragment>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </React.Fragment>
                                : <React.Fragment>Resend OTP</React.Fragment>
                                }
                            </a>
                            {/* <a type="button" class="btn btn-link text-dark font14 no-underline btn-sm font-weight-normal" href="javascript:void(0)" onClick={()=>{resetRegistration()}}>Back</a> */}
                        </div>
                    </div>
                </div>
            }
            <button className="btn btn-brand-gradient rounded-pill btn-block mb-4" disabled={ isDataAvailable() || disabled || isProcessLoading} onClick={()=>registerNewCustomer()}>
                    {isProcessLoading &&
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                    }
                    {!isProcessLoading && 
                        <React.Fragment>
                            Sign Up
                        </React.Fragment>
                    }
            </button>
            <a href="javascript:void(0)" title="skip" className='btn btn-link px-0 text-secondary position-absolute' style={{'bottom':'-3rem',right:'-.15rem'}} onClick={()=> saveCustomerToToken()}>Skip</a>
            
            {/* <div className="d-flex mt-4">
                <div className="col-6 px-0">
                    By Signing up you agree to our <a className="d-block font-weight-bold" disabled={isProcessLoading} href="/termsAndConditions" title="terms and conditions">T&C</a>
                </div>
                <div className="col-6 pr-0">
                    Existing user of MedPlus? <a className="d-block font-weight-bold" disabled={isProcessLoading} onClick={()=>{
                    props.setShowModal({
                        LoginWithOtp : true
                })}} href="javascript:void(0)" title="Login">Login</a>
                </div>
            </div> */}
        </React.Fragment>
    )
}

export default RegistrationForm;