import React, { useState ,useEffect, useRef }from 'react';
import {Modal, ModalBody, ModalFooter } from 'reactstrap';
import CommonHeaderService from "../../services/CommonHeaderService";
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO,ALERT_TYPE_ERROR} from './Alert';
import Venkateshpic from '../../images/common/venkatesh.png';
import MedplusHeader from '../../images/common/MedplusDiagnosticsHeader.svg';
import Validate from '../../helpers/Validate';
import Diagnosticsicon from '../../images/common/daignostics-icn.svg';
import mriicon from '../../images/common/mri-icn.svg';
import ctscanicn from '../../images/common/ct-scan-icn.svg';
import ecgicn from '../../images/common/ecg-icn.svg';
import Authentication from '../Authentication/Authentication';
import { useSelector } from 'react-redux';
import {SendCallMe, FormDetailsBack, KnowMoreEvent, FormDetailsSubmit,ChangeNumber,ResendOTP,Verifyotp} from '../../Analytics/Analytics'
import { useInputField } from './CustomHooks/useInputField';

function CampaignModal(props) {
    const INFO_MODULE = "informationModule";
    const PHONE_NUMBER_MODULE ="phoneNumberModule";
    const OTP_MODULE ="otpModule";
    const THANKYOU_MODULE ="thankYouModule";
    const CAMPAIGN_VERTICAL = "W";

    const userInfo  = useSelector(state => validate.isNotEmpty(state.userInfo.userInfo) ?  state.userInfo.userInfo : null);
    const [errorMsg, setErrorMsg] = useState({});
    const [disabled,setDisabled] = useState(true);
    const [step, setStep] = useState( props.isSubscriptionCampaign ? INFO_MODULE : PHONE_NUMBER_MODULE);
    const [informationDetails,setInformationDetails] = useState({
        "campaignCtaFlag" : Authentication.isCookieAuthenticated(userInfo) || !props.isSubscriptionCampaign  ? 0 : null,
        "campaignVertical" : CAMPAIGN_VERTICAL,
        "campaignSource" : props.utmObject.campaignSource,
        "campaignName" : props.utmObject.campaignName,
        "campaignUserRequestPage" : props.utmObject.campaignUserRequestPage
    });
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const validate = Validate();
    const [ sendOtpLoader, setSendOtpLoader ] = useState(false);
    const [ verifyOtpLoader, setVerifyOtpLoader ] = useState(false);
    const commonHeaderService = CommonHeaderService();
    const userContactDetails  = useSelector(state => validate.isNotEmpty(state.userInfo.userContactDetails) ?  state.userInfo.userContactDetails : null);
    const [otpValue,otpErrorMessage,setOtpValue,setOtpError,handleOnChange,handleFocusInput,handleOnBlur] = useInputField("NUMBER",5);

    useEffect(() => {
        if(validate.isNotEmpty(window) && props.enableCampaignModal){
            window.scrollTo(0, 0);
        }
        if(!Authentication.cookieBasedAuth(userInfo)){
            if(validate.isNotEmpty(informationDetails.campaignPhoneNumber) && validate.isNotEmpty(informationDetails.campaignUserName)){
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    },[[informationDetails.campaignPhoneNumber, informationDetails.campaignUserName, props.utmObject]]);

    useEffect (()=>{
        if(Authentication.cookieBasedAuth(userInfo)){
            insertCampaignUserInfo({
                ...informationDetails,
                "campaignUserName": userInfo.displaybleName,
                "campaignPhoneNumber" : userContactDetails.shippingContactNumber,
                "customerId" : userInfo.medplusId,
            });
            props.setEnableCampaignModal(false);
        }
    }, [])

    useEffect(()=>{
        if(otpValue && otpValue.length == 5){
            verifyOtp(otpValue);
        }else{
            setDisabled(true);
        }
    },[otpValue])

    const toggleCampaignModal = () => {
        props.setShowCampaignModal(!props.showCampaignModal);
    }

    const handleMobileChange = (e)=>{
        let feildName = e.target.id;
        let feildValue = e.target.value;
        if(validate.isEmpty(e.target.value)){
            setInformationDetails({...informationDetails, [feildName]: ''});
            return;
        } else if(!validate.isNumeric(e.target.value)){
            if(validate.isEmpty(informationDetails[feildName])) {
                setInformationDetails({...informationDetails, [feildName]: ''});
            }
            return;
        }
        setInformationDetails({...informationDetails, [feildName]: feildValue});
    }

    const validateInformationObject = (e) =>{
        if (e.target.id.indexOf('campaignUserName') > -1) {
            return validate.name(e.target.value,"Full Name", 45);
        } else if(e.target.id.indexOf('campaignPhoneNumber') > -1){
            return validate.mobileNumber(e.target.value);
        }
    }

    const handleInputChange = (event) => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        let errMsg = validateInformationObject(event);
        if (errMsg){
            setErrorMsg({...errorMsg, [feildName]:errMsg});
        } else {
            setErrorMsg({...errorMsg, [feildName]:""});
        }
        setInformationDetails({...informationDetails, [feildName]: feildValue});
    }

    const clearInputError=(event) => {
        let feildName = event.target.id;
        setErrorMsg({...errorMsg, [feildName]:""});
    }
    
    const handleEnterKeyBinding = (event) => {
        if(step == PHONE_NUMBER_MODULE && "Enter" === event.key){
            sendOtp();
        }
    }

    const handleValueChange = (event) => {
        setInformationDetails({ ...informationDetails , [event.target.id]: event.target.value});
    }

    const insertCampaignUserInfo = (informationDetails) =>{
        commonHeaderService.insertCampaignUserInfo(informationDetails).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setStep(THANKYOU_MODULE);
                return;
            } else {
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
        }).catch(function(error) {
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const sendOtp = () =>{
        setDisabled(true);
        setSendOtpLoader(true);
        let errorsFlagMsgs = {}
        let errorFlag = false;
        if(validate.isEmpty(informationDetails.campaignUserName) || validate.isNotEmpty(validate.name(informationDetails.campaignUserName, "Full Name", 45))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["campaignUserName"]:validate.name(informationDetails.campaignUserName, "Full Name", 45)};
            setDisabled(false);
            errorFlag = true;
        } 
        if(validate.isEmpty(informationDetails.campaignPhoneNumber) || validate.isNotEmpty(validate.mobileNumber(informationDetails.campaignPhoneNumber))) {
            errorsFlagMsgs = {...errorsFlagMsgs, ["campaignPhoneNumber"]:validate.mobileNumber(informationDetails.campaignPhoneNumber)};
            setDisabled(false);
            errorFlag = true;
        }
        if (errorFlag) {
            setDisabled(false);
            setSendOtpLoader(false);
            setErrorMsg(errorsFlagMsgs);
            return;
        }
        commonHeaderService.generateOtpForCampaignUser(informationDetails).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                FormDetailsSubmit()
                setAlertInfo({message:"Please Verify OTP",type:ALERT_TYPE_SUCCESS});
                setStep(OTP_MODULE);
            } else {
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
            setDisabled(false);
            setSendOtpLoader(false);
        }).catch(function(error) {
            console.log(error);
            setDisabled(false);
            setSendOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const resendOtp = () =>{
        setDisabled(true);
        if(validate.isEmpty(informationDetails) ||validate.isEmpty(informationDetails.campaignPhoneNumber) || validate.isNotEmpty(validate.mobileNumber(informationDetails.campaignPhoneNumber))) {
            setDisabled(false);
            return;
        }
        commonHeaderService.resendOtpForCampaignUser({"campaignVertical" : informationDetails.campaignVertical, "campaignPhoneNumber" : informationDetails.campaignPhoneNumber}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setAlertInfo({message:"OTP has been resent succesfully!",type:ALERT_TYPE_SUCCESS});     
            } else {
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
            setDisabled(false);
            setOtpValue();
            setOtpError('');
        }).catch(function(error) {
            console.log(error);
            setDisabled(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_ERROR});
            return;
        });
    }
    
    const verifyOtp = (otpVerify) =>{
        setDisabled(true);
        setVerifyOtpLoader(true);
        commonHeaderService.verifyOtpForCampaignUser({...informationDetails, "campaignUserOtp" : otpVerify}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                Verifyotp(response.statusCode)
                setStep(THANKYOU_MODULE);
                setTimeout(() => {
                    props.setShowCampaignModal(false);
                    props.setEnableCampaignModal(false);
                }, 2000);
            } else {
                Verifyotp(response.statusCode)
                setOtp("");
                setOtpValue("");
                setAlertInfo({message:response.message,type:ALERT_TYPE_ERROR});
            }
            setDisabled(false);
            setVerifyOtpLoader(false);
        }).catch(function(error) {
            console.log('err', error);
            setDisabled(false);
            setVerifyOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });    
    }

    const goToRegistrationPage = (campaignCtaFlag) =>{
        setInformationDetails({...informationDetails, ["campaignCtaFlag"] : campaignCtaFlag, ["campaignPhoneNumber"] : null, ["campaignUserName"] : null });
        setStep(PHONE_NUMBER_MODULE);
        setErrorMsg({});
        setSendOtpLoader(false);
    }
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            { <Modal backdrop="static" keyboard={false} isOpen={props.showCampaignModal} toggle={toggleCampaignModal} centered={true} className='adverstiment modal-lg' autoFocus={false} tabIndex={-1}>
                <ModalBody className='px-3'>
                    <div className='mb-5 pb-3 pl-2'>
                        <img src={MedplusHeader} alt="MedPlus Diagnostics" title='MedPlus Diagnostics'/>
                    </div>
                    <img src={Venkateshpic} alt="Venkatesh" className='image'/>
                    <div className='align-items-center d-flex w-100 information pl-2'>
                        {step ==INFO_MODULE && <div>
                            <ul className='medplusAdvantage'>
                                <li className='mb-2 pl-2'><span className='font-weight-bold'>FLAT 75% OFF</span> on ALL Diagnostic Tests</li>
                                <li className='mb-2 pl-2'><span className='font-weight-bold'>Free</span> Diagnostic Tests Worth your Membership Fee </li>
                                <li className='mb-2 pl-2'><span className='font-weight-bold'>50% OFF</span> on Doctor Consultations</li>
                            </ul>
                            <p className='pl-5'>with <h4 className='d-inline-block text-brand'>MedPlus Advantage</h4> Membership</p>
                            <div className='d-flex justify-content-between pl-5'>
                                <img src ={Diagnosticsicon} alt="Diagnostics" title="Diagnostics" />
                                <img src ={mriicon} alt="mriicon" title="MRI"/>
                                <img src ={ctscanicn} alt="ctscanicn" title="CtScan"/>
                                <img src ={ecgicn} alt="ecgicn" title="ECG"/>
                            </div>
                        </div>}
                        {step == PHONE_NUMBER_MODULE && <div className='w-100'>
                            <p>We are happy to connect, <br /> Please provide your details.</p>
                            <div className="form-group has-float-label  my-4 w-50">
                                <input type="text" className={ validate.isNotEmpty(errorMsg['campaignPhoneNumber']) ? "form-control is-invalid" : "form-control"} id="campaignPhoneNumber" value={validate.isNotEmpty(informationDetails["campaignPhoneNumber"]) ? informationDetails["campaignPhoneNumber"] : ""} name="campaignPhoneNumber" maxLength="10" autoComplete="off" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onChange={(e)=>handleMobileChange(e)} onKeyPress={(event) => handleEnterKeyBinding(event)} autoFocus={true} />
                                    <label htmlFor="campaignPhoneNumber" className="select-label">Mobile number</label>
                                    {validate.isNotEmpty(errorMsg['campaignPhoneNumber']) &&
                                        <small className="help-block text-left errmsg margin-none text-danger">
                                            {errorMsg['campaignPhoneNumber']}
                                        </small>
                                    }
                            </div>
                            <div className="form-group has-float-label  my-4 w-50">
                                <input type="text" className={ validate.isNotEmpty(errorMsg['campaignUserName']) ? "form-control is-invalid" : "form-control"} id="campaignUserName" value={validate.isNotEmpty(informationDetails["campaignUserName"]) ? informationDetails["campaignUserName"] : ""} name="campaignUserName" maxLength="45" autoComplete="off" required placeholder=" " onBlur={handleInputChange} onFocus={clearInputError} onChange={(e)=>handleValueChange(e)} onKeyPress={(event) => handleEnterKeyBinding(event)} />
                                <label htmlFor="campaignUserName" className="select-label">Full name</label>
                                {validate.isNotEmpty(errorMsg['campaignUserName']) &&
                                    <small className="help-block text-left errmsg margin-none text-danger">
                                        {errorMsg['campaignUserName']}
                                    </small>
                                }
                            </div>
                        </div>}
                        {step ==OTP_MODULE && <div>
                            <p className="mb-0">Please enter OTP sent to</p>
                            { validate.isNotEmpty(informationDetails['campaignPhoneNumber']) && <h3> +91 {informationDetails['campaignPhoneNumber']}</h3> }
                            <div className="text-right mt-4 mb-3">
                                <div className="justify-content-between otp-fields-container d-flex">
                                    
                                    <div className="form-group has-float-label">
                                        <input type="text" className={otpErrorMessage ? 'form-control is-invalid' : "form-control"} id="OTP" placeholder=" " name="OTP" onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleOnBlur(e)} onChange={(e) => handleOnChange(e)}
                                            value={otpValue} maxLength={5}/>
                                        <label htmlFor="OTP">Enter OTP</label>
                                        {otpErrorMessage &&
                                            <div className="invalid-feedback d-block">
                                                {otpErrorMessage}
                                            </div>
                                        }
                                    </div>


                                    

                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <a href ="javascript:void(0)" onClick={()=>{setStep(PHONE_NUMBER_MODULE); setInformationDetails({...informationDetails, ['campaignPhoneNumber'] : "", ['campaignUserName'] : ""}); setErrorMsg({}); ChangeNumber("Campaign Modal")}} className="font-14 text-info">Change Number </a>
                                </div>
                                <div>
                                    <a href="javascript:void(0)" className='font-14 text-info' onClick={()=> {resendOtp() ;ResendOTP() }}>Resend OTP</a>
                                </div>
                            </div>
                        </div>}
                        {step ==THANKYOU_MODULE &&  <div className='w-100'>
                            <h2 className='display-1 mt-5 pt-5 text-success'>Thank You!</h2>
                        </div>}
                    </div>
                </ModalBody>
                {step != THANKYOU_MODULE && <ModalFooter className='justify-content-center footerbuttons'>
                    {step == INFO_MODULE &&
                        <React.Fragment>
                            <button onClick={()=>{ goToRegistrationPage(1); SendCallMe() }} className="btn btn-brand px-5 py-2 rounded-pill footerbackground banner-hover-btn">Call Me</button>
                            <button onClick={()=>{ goToRegistrationPage(2); KnowMoreEvent() }} className="brand-secondary btn rounded-pill px-5 py-2">Know More</button>
                        </React.Fragment>
                    }

                    {step == PHONE_NUMBER_MODULE &&
                        <React.Fragment>
                            { props.isSubscriptionCampaign && <button onClick={()=>{setStep(INFO_MODULE);FormDetailsBack()}} className="brand-secondary btn rounded-pill px-5 py-2" >Back</button> }
                            <button disabled={disabled} onClick={()=> {sendOtp()}} className="btn btn-brand px-5 py-2 rounded-pill footerbackground">
                                {sendOtpLoader ? <React.Fragment>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </React.Fragment>  : "Submit"
                                }
                            </button>
                        </React.Fragment> 
                    }

                    {step == OTP_MODULE &&
                        <React.Fragment>
                            <button onClick={()=>setStep(PHONE_NUMBER_MODULE)} className="brand-secondary btn rounded-pill px-5 py-2" >Back</button>
                            <button onClick={()=>verifyOtp(otpValue)} className="btn btn-brand px-5 py-2 rounded-pill footerbackground" disabled={disabled || verifyOtpLoader}>
                                {verifyOtpLoader ? <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                    </React.Fragment>  : "Verify OTP"
                                }
                            </button>
                        </React.Fragment>
                    }
                </ModalFooter>}
            </Modal> }
        </React.Fragment>
    );
}

export default CampaignModal;