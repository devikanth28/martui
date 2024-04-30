import React, { useEffect, useState } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import WalletService from '../../../services/WalletService';
import { useInputField } from '../../Common/CustomHooks/useInputField';

const ChangePhoneNumberModal = (props) => {

    const [errorMsg, setErrorMsg] = useState({});
    const [sendOtpLoader,setSendOtpLoader] = useState(false);
    const [verifyOtpLoader,setVerifyOtpLoader] = useState(false);
    const userInfoAction = UserInfoAction();
    var userContactDetails = userInfoAction.getUserContactDetails();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const validate = Validate();
    const myAccountService = MyAccountService();
    const [isEnterOTPSectionOpen,setEnterOTPSectionOpen] = useState(false);
    const [newMobileNumber,setNewMobileNumber] = useState('');
    const [otpOnCall,setOtpOnCall] = useState({otpOnCallFlag:true,dispalyOTPOnCall:false});
    const [currentMobileNumberVerified, setCurrentMobileNumberVerified] = useState(false);
    const [otpValue,otpErrorMessage,setOtpValue,setOtpError,handleOTPOnChange,handleOTPFocusInput,handleOTPOnBlur] = useInputField("NUMBER",5);
    
    const closePhoneNumberModel = () =>{
        setOtpOnCall({otpOnCallFlag:true,dispalyOTPOnCall:false});
        props.toggleModal();
        setEnterOTPSectionOpen(false);
        setNewMobileNumber('');
        setOtpValue('');
        setErrorMsg({});
    }

    useEffect(() => {
        if(props.isModalOpen) {
            setEnterOTPSectionOpen(true);
        } else {
            setCurrentMobileNumberVerified(false);
        }

    },[props.isModalOpen])
    useEffect(()=>{
        if(validate.isEmpty(otpValue) || otpValue.length != 5){
            return;
        }
        if(currentMobileNumberVerified){
            verifyOtpForEditMobNo(otpValue, newMobileNumber);
            return;
        }
        if(!currentMobileNumberVerified){
            verifyOtpForMobileNumber(otpValue);
        }
    }, [otpValue])
    const handleOnChange = e => {
        if(e.target.value === '' || validate.isNumeric(e.target.value)) {
            setNewMobileNumber(e.target.value);
        }
    }

    const handleValidation = (e) =>{
        setErrorMsg({...errorMsg,[e.target.id]: ''})
    }
    
    const validateNewPhoneNumber = e =>{
        let errMsg = validate.mobileNumber(e.target.value) ; 
        if(errMsg){
            setErrorMsg({["newMobileNumber"]:errMsg});
        }else{
            setErrorMsg({});
        }
        setNewMobileNumber(e.target.value);
    }

    const validateOTPForEditNo = otp =>{
        if(validate.isEmpty(otp)){
            setErrorMsg({["otpValue"]:"Empty OTP"});
        }else if(!validate.isNumeric(otp)){
            setErrorMsg({["otpValue"]:"OTP must be numeric"});
        }else{
            setErrorMsg({});
            setOtpValue(otp);
            if(otp.length == 5){
                setOtpValue(otp);
                verifyOtpForEditMobNo(otp,newMobileNumber);
            }
        }
    }

    const updateNumber = (event) => {
        if("Enter" === event.key){
            sendOtpForEditMobileNo(newMobileNumber,"N");
        }
    }
    const verifyOtpForEditMobNo = (otpValue,mobileNumber) =>{
        setVerifyOtpLoader(true);
        if(validate.isEmpty(mobileNumber) || validate.isNotEmpty(validate.mobileNumber(mobileNumber))) {
            setOtpError(validate.mobileNumber(mobileNumber));
            setVerifyOtpLoader(false);
            return;
        }
        if(!validate.isNumeric(otpValue) || otpValue.length!==5){
            setOtpError("Invalid OTP");
            setVerifyOtpLoader(false);
            return;
        }
        setErrorMsg({});
        setOtpError();
        myAccountService.verifyOtpForEditMobNo(otpValue,mobileNumber).then((response) =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                userInfoAction.setUserInfo(response.dataObject.userInfo);
                userInfoAction.setUserContactDetails(response.dataObject.userContactDetails);
                // setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});
                setVerifyOtpLoader(false);
                props.updateUserDetailsInState(response.dataObject.userInfo,response.dataObject.userContactDetails);
                setNewMobileNumber('');
                closePhoneNumberModel();               
            }else{
                setOtpValue("");
                setVerifyOtpLoader(false);
                setOtpError(response.message);
                setErrorMsg(response.message);
            }
        }).catch((error) => {
            setVerifyOtpLoader(false);
            closePhoneNumberModel();
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });

    }

    const sendOtpOnCallForEditNo = () =>{

        myAccountService.sendOtpOnCallForEditNo(otpOnCall.otpKey,otpOnCall.mobileNo).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setOtpOnCall({dispalyOTPOnCall : false});
                setAlertInfo({message:"You will soon get OTP on call",type:ALERT_TYPE_SUCCESS});       
            }else{
                setErrorMsg(response.message);
            }
        }).catch((error) => {
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            closePhoneNumberModel();
            return;
        });

    }
    const [resendOtpLoader,setResendOtpLoader] = useState(false);
    const sendOtpForEditMobileNo = (newMobileNumber,isForResend) =>{
        setSendOtpLoader(true);
        if(validate.isEmpty(isForResend)){
            isForResend = "N";
        }else{
            setResendOtpLoader(true);
        }
        if(validate.isEmpty(newMobileNumber) || validate.isNotEmpty(validate.mobileNumber(newMobileNumber))) {
            setErrorMsg({["newMobileNumber"]:validate.mobileNumber(newMobileNumber)});
            setSendOtpLoader(false);
            setResendOtpLoader(false);
            return;
        }
        setErrorMsg({})
        setOtpError();
        myAccountService.sendOtpForEditMobileNo(newMobileNumber,isForResend).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setEnterOTPSectionOpen(true);
                setSendOtpLoader(false);
                setResendOtpLoader(false);
                if(validate.isNotEmpty(isForResend) && "Y" == isForResend){
                    if(otpOnCall.otpOnCallFlag){
                        setOtpOnCall({
                            otpKey : response.responseData,
                            otpProcess : "Mobile Number Change",
                            mobileNo : newMobileNumber,
                            otpOnCallFlag :false,
                            dispalyOTPOnCall : true
                        })
                    }
                    setAlertInfo({message:"OTP resent succesfully!",type:ALERT_TYPE_SUCCESS}); 
                    setOtpError('');
                }               
            }else{
                if(validate.isNotEmpty(isForResend) && "Y" == isForResend){
                    setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                }
                setSendOtpLoader(false);
                setResendOtpLoader(false);
                setErrorMsg({["newMobileNumber"]:response.message});
            }
        }).catch((error) => {
            closePhoneNumberModel();
            setSendOtpLoader(false);
            setResendOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });

    }

    const sendOtpForMobileNumber = (isForResend) => {
        setSendOtpLoader(true);
        if(validate.isEmpty(isForResend)){
            isForResend = "N";
        }else{
            setResendOtpLoader(true);
        }
        setErrorMsg({})
        setOtpError();
        myAccountService.sendOtpForMobileNumber(isForResend).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setEnterOTPSectionOpen(true);
                setSendOtpLoader(false);
                setResendOtpLoader(false);
                if(validate.isNotEmpty(isForResend) && "Y" == isForResend){
                    setAlertInfo({message:"OTP resent succesfully!",type:ALERT_TYPE_SUCCESS}); 
                    setOtpError('');
                }  
            }else{
                closePhoneNumberModel()
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                setSendOtpLoader(false);
                setResendOtpLoader(false);
            }
        }).catch((error) => {
            closePhoneNumberModel();
            setSendOtpLoader(false);
            setResendOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const verifyOtpForMobileNumber = (otpValue) => {
        setVerifyOtpLoader(true);
        if(!validate.isNumeric(otpValue) || otpValue.length!==5){
            setOtpError("Invalid OTP");
            setVerifyOtpLoader(false);
            return;
        }
        setErrorMsg({});
        setOtpError();
        myAccountService.verifyOtpForMobileNumber(otpValue).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setCurrentMobileNumberVerified(true);
                setEnterOTPSectionOpen(false);
                setVerifyOtpLoader(false);
                setNewMobileNumber('');
                setOtpValue("");
            }else{
                setCurrentMobileNumberVerified(false);
                setOtpValue("");
                setVerifyOtpLoader(false);
                setOtpError(response.message);
                setErrorMsg(response.message);
            }
        }).catch((error) => {
            setVerifyOtpLoader(false);
            closePhoneNumberModel();
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const CloseButton = <button type="button" disabled={sendOtpLoader || verifyOtpLoader} onClick={()=>closePhoneNumberModel()} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>

    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal autoFocus={false} className="my-account-modal change-phone-popup modal-lg modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                <ModalHeader toggle={()=>closePhoneNumberModel()} close={CloseButton}>
                    Change Mobile Number
                </ModalHeader>
                <ModalBody>
                    {(currentMobileNumberVerified && !isEnterOTPSectionOpen) ?
                         <React.Fragment>
                             <div className="row mx-0">
                                <div className="col-6 my-account-popup-bg-icon"></div>
                                <div className="col-6">
                                    <div className="form-group filled-form">
                                        <input type="text" disabled className="form-control disabled" id="currentMobileNumber" name="user Mobile Number" defaultValue={'+91 ' + userContactDetails.shippingContactNumber} autoComplete="new-off" />
                                        <label  className="select-label">Current Mobile Number</label>
                                    </div>
                                    <div className="form-group filled-form mb-0">
                                        <input autoFocus type="text" className={validate.isNotEmpty(errorMsg["newMobileNumber"]) ? "form-control is-invalid" : "form-control"} id="newMobileNumber"  name="New Mobile Number" defaultValue={newMobileNumber} maxLength="10" required autoComplete="new-off" value={newMobileNumber} onFocus={handleValidation} onBlur={validateNewPhoneNumber} onChange={handleOnChange} onKeyPress={(event) => updateNumber(event)} />
                                        <label className="select-label">New Mobile Number <sup className="text-danger">*</sup></label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['newMobileNumber']}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={sendOtpLoader} onClick={()=>closePhoneNumberModel()}>Close</button>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={sendOtpLoader} onClick={() => sendOtpForEditMobileNo(newMobileNumber,"N")}>
                                    {sendOtpLoader ? "" : "Next"}
                                    {sendOtpLoader &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }
                                </button>
                            </div>
                        </React.Fragment>
                        : null
                    }
                    {isEnterOTPSectionOpen ?
                        <React.Fragment>
                            <div className="row mx-0">
                                <div className="col-6 my-account-popup-bg-icon"></div>
                                <div className="col-6">
                                    <p className="mb-0">Please enter the OTP sent to</p>
                                    <h6>+91 {currentMobileNumberVerified ? newMobileNumber : props.currentMobileNumber}</h6>
                                    <div className="form-group has-float-label mb-3">
                                        <input type="text" autoFocus className={otpErrorMessage ? 'form-control is-invalid' :"form-control"} id="OTP" placeholder=" " name="OTP" onFocus={(e)=>handleOTPFocusInput(e)} onBlur ={(e)=>handleOTPOnBlur(e)} onChange={(e)=>handleOTPOnChange(e)}
                                        value = {otpValue} maxLength={5} ref={focus}/>
                                        <label htmlFor="OTP">Enter OTP</label>
                                        {otpErrorMessage && 
                                            <div className="invalid-feedback d-block">
                                                {otpErrorMessage}
                                            </div> 
                                        }
                                    </div>
                                    <button className="btn btn-link text-primary px-0 py-2" title="Resend OTP" onClick={() => currentMobileNumberVerified ? sendOtpForEditMobileNo(newMobileNumber,"Y") : sendOtpForMobileNumber("Y")} >
                                        {resendOtpLoader ? "" : "Resend OTP"}
                                        {resendOtpLoader &&
                                            <React.Fragment>
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </React.Fragment>
                                        }
                                    </button>
                                   {!currentMobileNumberVerified ? <p class="mb-0 small"><strong class="d-flex text-secondary">Note:</strong>Having trouble accessing the Old Mobile number? Get in touch with our <a role="link" class="btn-link text-primary" href="tel:040-67006700" title="Call to customer service for help!">customer service</a>, they will be able to assist you.</p> :''}
                                    {/* {otpOnCall.dispalyOTPOnCall &&
                                        <button className="btn btn-link float-right text-primary px-0 py-2" title="OTP on Call" onClick={()=>sendOtpOnCallForEditNo()}>OTP on Call</button>
                                    } */}
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={verifyOtpLoader} onClick={() =>  {
                                    if(currentMobileNumberVerified){
                                        setEnterOTPSectionOpen(false);
                                        setOtpValue(''); 
                                    } else{
                                        closePhoneNumberModel(); 
                                    }  }}>Back</button>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={verifyOtpLoader} onClick={() => currentMobileNumberVerified ? verifyOtpForEditMobNo(otpValue,newMobileNumber) : verifyOtpForMobileNumber(otpValue)}>
                                    {verifyOtpLoader ? "" : "Submit"}
                                    {verifyOtpLoader &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }
                                </button>
                            </div>
                        </React.Fragment>
                        : null
                    }
                </ModalBody>
            </Modal>    
        </React.Fragment>
    );
}

export default ChangePhoneNumberModal;