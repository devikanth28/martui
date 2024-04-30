import React, {useEffect, useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from 'react-date-picker';
import Validate from '../../../helpers/Validate';
import OtpImg from '../../../images/common/otp-bg.png';
import Otp2xImg from '../../../images/common/otp-bg2x.png';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import WalletService from '../../../services/WalletService';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import NoDataToShow from '../../StaticPages/NoDataToShow';
import { useInputField } from '../../Common/CustomHooks/useInputField';
import EmailImg from '../../../images/common/email.svg'
import { Link } from 'react-router-dom';

const WalletKYCForm = (props) => {
    if(props.kycStatus=="PENDING" || props.kycStatus=="HOLD" || props.kycStatus=="KYC_NOT_ENABLED" ){
        return (
            <NoDataToShow message= {props.kycMessage} image={EmailImg}></NoDataToShow>
        )
    }
    let userContactDetails = UserInfoAction().getUserContactDetails();
    let userInfo = UserInfoAction().getUserInfo();
    let locality = getSelectedLocality();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const walletService = WalletService();
    const [resendOtpLoader, setResendOtpLoader] = useState(false);
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [error, setError] = useState({});
    const validate = Validate();
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [submitOTPLoader, setSubmitOTPLoader] = useState(false);
    const [otpOnCall,setOtpOnCall] = useState({otpOnCallFlag:true,dispalyOTPOnCall:false});
    const [otpValue,otpErrorMessage,setOtpValue,setOtpError,handleOTPOnChange,handleOTPFocusInput,handleOTPOnBlur] = useInputField("NUMBER",5);
    const [customerKycDetails, setCustomerKycDetails] = useState({
        customerID : userInfo.medplusId,
        mobileNo : userContactDetails.shippingContactNumber,
        emailId : userContactDetails.emailAddress,
        address : "",
        locality : "",
        localityId : validate.isNotEmpty(userContactDetails.localityId) ? userContactDetails.localityId : "99999",
        dob : "",
        gender : "",
        city : validate.isNotEmpty(userContactDetails.city)?userContactDetails.city:locality.city,
        state : validate.isNotEmpty(userContactDetails.state)?userContactDetails.state:locality.state,
        pincode : validate.isNotEmpty(userContactDetails.pincode)?userContactDetails.pincode:locality.pincode,
        kycOtp : "",
        firstName : userInfo.firstName,
        lastName : userInfo.lastName
    });

    const handleOnChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        setCustomerKycDetails({...customerKycDetails, [feildName]: feildValue});
    }

    const handleValidation = (e) =>{
        setError({...error,[e.target.id]: ''})
    }

    const handleInputChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        let errMsg = validateCustomerKycDetails(event);
        if (errMsg)  {
            setError({[feildName]:errMsg});
        } else {
            setError({});
        }
        setCustomerKycDetails({...customerKycDetails, [feildName]: feildValue});
    }

    const validateCustomerKycDetails = (e) =>{
        if (e.target.id.indexOf('address') > -1) {
            return validate.address(e.target.value,true,"Address", 200);
        }else if (e.target.id.indexOf('locality') > -1) {
            return validate.address(e.target.value,true,"Address 2", 45);
        }else if(e.target.id.indexOf('emailId') > -1){
            return validate.email(e.target.value,50);
        }
    }

    const updateCustomerKycDetails = (event) => {
        if("Enter" === event.key){
            submitKYCForm(customerKycDetails);
        }
    }

    const bindDOB = (date)=>{
        let errMsg = validate.isEmpty(date)?"Please enter date of birth":date>new Date()?"Date of birth can not be future date.":"";
        if (validate.isNotEmpty(errMsg))  {
            setError({['dob']:errMsg});
        } else {
            setError({});
        }
        setCustomerKycDetails({
            ...customerKycDetails,
            dob : date
        })
    }

    const submitKYCForm = (isForResend) =>{
        if('Y' == isForResend){
            setResendOtpLoader(true);
        }
        setProcessLoading(true);
        if(validate.isEmpty(customerKycDetails.address) || validate.isNotEmpty(validate.address(customerKycDetails.address,true, "Address", 200))){
            setError({["address"]:validate.address(customerKycDetails.address,true, "Address", 200)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(customerKycDetails.locality) || validate.isNotEmpty(validate.address(customerKycDetails.locality,true, "Address 2", 45))) {
            setError({["locality"]:validate.address(customerKycDetails.locality,true, "Address 2", 45)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(customerKycDetails.dob)){
            setError({["dob"]:"Please select date of birth"});
            setProcessLoading(false);
            return;
        } else if(validate.isNotEmpty(customerKycDetails.dob) && customerKycDetails.dob > new Date()){
            setError({["dob"]:"Date of birth can not be future date"});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(customerKycDetails.gender)){
            setError({["gender"]:"Please select gender"});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(customerKycDetails.emailId) || validate.isNotEmpty(validate.email(customerKycDetails.emailId, 50))) {
            setError({["emailId"]:validate.email(customerKycDetails.emailId, 50)});
            setProcessLoading(false);
            return;
        }
        walletService.submitKYCForm(customerKycDetails).then(response =>{
            setProcessLoading(false);
            setResendOtpLoader(false);
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setShowOtpSection(true);
                if("Y" == isForResend) {
                    setAlertInfo({message:"OTP resent sucessfully",type:ALERT_TYPE_SUCCESS});
                    if(otpOnCall.otpOnCallFlag){
                        setOtpOnCall({
                            otpKey : response.dataObject.otpRedisKey,
                            otpProcess : "KYC Process",
                            mobileNo : customerKycDetails.mobileNo,
                            otpOnCallFlag :false,
                            dispalyOTPOnCall : true
                        })
                    }
                 }               
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
        }).catch(function(error) {
            console.log(error);
            setProcessLoading(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const validateOTPForCustomerKyc = otp =>{
        if(validate.isEmpty(otp)){
            setError({["otpValue"]:"Empty OTP"});
        }else if(!validate.isNumeric(otp)){
            setError({["otpValue"]:"OTP must be numeric"});
        }else{
            setError({});
            setCustomerKycDetails({...customerKycDetails,kycOtp : otp});
            if(otp.length == 5){
                setCustomerKycDetails({...customerKycDetails,kycOtp : otp});
            }
        }
    }
    useEffect(()=>{
        if(otpValue.length == 5){
            verifyCustomerKycOtp();
        }
    },[otpValue])

    const verifyCustomerKycOtp = () =>{
        setSubmitOTPLoader(true);
        if(!validate.isNumeric(otpValue) || otpValue.length!==5){
            setOtpError("Invalid OTP");
            setSubmitOTPLoader(false);
            return;
        }
        let tempCustomerKycDetails = {...customerKycDetails,"kycOtp" : otpValue}
        setCustomerKycDetails({...customerKycDetails,kycOtp : otpValue});
        walletService.verifyCustomerKycOtp(tempCustomerKycDetails).then(response =>{
            setSubmitOTPLoader(false);
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                window.location.href = "/myWallet";               
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                setOtpValue("");
            }
        }).catch(function(error) {
            setSubmitOTPLoader(false);
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const sendOtpOnCallForCustomerKyc = () =>{
        WalletService().getOtpOnCall(otpOnCall).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setOtpOnCall({dispalyOTPOnCall : false});
                setAlertInfo({message:"You will soon get OTP on call",type:ALERT_TYPE_SUCCESS});       
            }else{
                setErrorMsg({["otpValue"]:response.message});
            }
        }).catch(function(error) {
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            closePhoneNumberModel();
            return;
        });

    }

    

    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            {validate.isNotEmpty(customerKycDetails) && !showOtpSection &&
                <div className="wallet-kyc-container">
                    <h6 class="title"><strong>MedPlus</strong><span>Wallet Customer KYC</span></h6>
                    <div className="wallet-kyc">
                        <div className="name-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                            <g transform="translate(-180.163 -142.663)">
                                <rect fill="none" width="26" height="26" transform="translate(180.163 142.663)"/>
                                <g transform="translate(182.43 145.183)">
                                    <g transform="translate(0 0)">
                                        <path fill="#FFF" d="M2.486,21.228A2.489,2.489,0,0,1,0,18.742a8.3,8.3,0,0,1,1.846-5.218,6.007,6.007,0,0,1,4.7-2.2,6.665,6.665,0,0,1,2.09.34,6.5,6.5,0,0,0,3.929,0h0a6.192,6.192,0,0,1,6.79,1.837,8.309,8.309,0,0,1,1.871,5.243,2.489,2.489,0,0,1-2.486,2.486Zm.365-6.917a7.017,7.017,0,0,0-1.57,4.43,1.22,1.22,0,0,0,1.2,1.2H18.742a1.208,1.208,0,0,0,1.2-1.179,7.013,7.013,0,0,0-1.571-4.43,4.913,4.913,0,0,0-5.4-1.456,7.753,7.753,0,0,1-4.717,0A4.824,4.824,0,0,0,6.575,12.6,4.707,4.707,0,0,0,2.851,14.311ZM4.986,5.628a5.628,5.628,0,1,1,5.628,5.628A5.634,5.634,0,0,1,4.986,5.628Zm1.282,0a4.345,4.345,0,1,0,4.345-4.346A4.35,4.35,0,0,0,6.268,5.628Z"/>
                                    </g>
                                </g>
                            </g>
                            </svg>
                            <h6>
                                MedPlus Id:{customerKycDetails.customerID}
                                <strong></strong>
                            </h6>
                        </div>
                        <div className="row mx-0">
                            <div className="col-4 pl-0">
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control "  id="fullName"  name="fullName"  maxlength="30" required="" autocomplete="new-off" value={customerKycDetails.firstName != customerKycDetails.lastName ? `${customerKycDetails.firstName} ${customerKycDetails.lastName}` : customerKycDetails.firstName} placeholder=" " disabled/>
                                    <label for="fullName"  className="select-label">Full name</label>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className={"form-control " + (error['emailId'] ? "is-invalid" : "")}  id="emailId"  name="emailId"  maxLength="50" autocomplete="new-off" value={customerKycDetails.emailId} placeholder=" " onBlur={handleInputChange} onFocus={handleValidation} onChange={handleOnChange} onKeyPress={(event) => updateCustomerKycDetails(event)} />
                                    <label for="emailId" className="select-label">Email Address</label>
                                    <Error data={error['emailId']}></Error>
                                </div>
                                <div className="form-group has-float-label">
                                    <input autoFocus type="text" className={"form-control " + (error['address'] ? "is-invalid" : "")}  id="address"  name="address" maxLength="200" required="" autocomplete="new-off" value={customerKycDetails.address} onBlur={handleInputChange} onFocus={handleValidation} onChange={handleOnChange} onKeyPress={(event) => updateCustomerKycDetails(event)} placeholder=" "/>
                                    <label for="address"  className="select-label">Enter your Adderss 1</label>
                                    <Error data={error['address']}></Error>
                                </div>
                                <div className="form-group has-float-label">
                                <DatePicker className={"form-control " + (error['dob'] ? "is-invalid" : "")} id='dob' value={customerKycDetails.dob} onChange={date => bindDOB(date)} maxDate={new Date()} dayPlaceholder='DD' monthPlaceholder='MM' yearPlaceholder='YYYY' showLeadingZeros={true}/>
                                    <label for="dob"  className="select-label">Enter your DOB</label>
                                    <Error data={error['dob']}></Error>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control "  id="state-feild" name="state-feild" value={customerKycDetails.state} maxlength="40" required="" autocomplete="off" placeholder=" " disabled/>
                                    <label for="state-feild"  className="select-label">State</label>
                                </div>
                            </div>
                            <div className="col-4 pr-0">
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control "  id="phone"  name="phone" maxlength="40" required="" autocomplete="new-off" value={`+91 ${customerKycDetails.mobileNo}`} placeholder=" " disabled/>
                                    <label for="phone" className="select-label">Mobile No.</label>
                                </div>
                                <div className="form-group has-float-label">
                                    {/* <select className={`custom-select select-gender-dropdown ${error['gender'] ? ` is-invalid` : ``}`} required>
                                        <option selected disabled value="">Please Select Gender</option>
                                        <option value="M" onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "M"})} selected={customerKycDetails.gender==="M"}>Male</option>
                                        <option value="F" onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "F"})} selected={customerKycDetails.gender==="F"}>Female</option>
                                        <option value="O" onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "O"})} selected={customerKycDetails.gender==="O"}>Other</option>
                                    </select> */}
                                    <UncontrolledDropdown className={`select-gender-dropdown ${error['gender'] ? ` is-invalid` : ``}`} style={{marginBottom : "0"}}>
                                        <DropdownToggle caret  color="white" className='btn-block'>
                                            {validate.isEmpty(customerKycDetails.gender)? "Please Select Gender" : ("M" == customerKycDetails.gender) ? "Male" : ("F" == customerKycDetails.gender) ? "Female" : "Others"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem title={"Male"} onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "M"})}>
                                                Male
                                            </DropdownItem >
                                            <DropdownItem title={"Female"} onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "F"})}>
                                                Female
                                            </DropdownItem>
                                            <DropdownItem title={"Others"} onClick={() => setCustomerKycDetails({...customerKycDetails,gender : "O"})}>
                                                Others
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <Error data={error['gender']}></Error>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className={"form-control " + (error['locality'] ? "is-invalid" : "")} value={customerKycDetails.locality} id="locality"  name="locality" maxlength="200" required="" autocomplete="new-off" onBlur={handleInputChange} onFocus={handleValidation} onChange={handleOnChange} onKeyPress={(event) => updateCustomerKycDetails(event)} placeholder=" "/>
                                    <label for = "locality" className="select-label">Enter your Adderss 2</label>
                                    <Error data={error['locality']}></Error>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control"  id="city" name="city" value={customerKycDetails.city} maxlength="40" required="" autocomplete="off" placeholder=" " disabled/>
                                    <label for="city" className="select-label">City</label>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control "  id="pincode-feild" name="pincode-feild" value={customerKycDetails.pincode} maxlength="40" required="" autocomplete="off" placeholder=" " disabled/>
                                    <label for="pincode-feild" className="select-label">Pincode</label>
                                </div>
                            </div>
                        </div>
                        <p className="small">
                            <strong>
                                By clicking "Submit" you agree to the <Link to="/walletTermsandConditions" className="text-primary">Terms & Conditions</Link> of MedPlus wallet
                            </strong>
                        </p>
                        <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() =>setCustomerKycDetails({...customerKycDetails,locality : "" ,address : "" ,dob : "" ,gender : ""})}>Reset</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5 custom-btn-lg" disabled={isProcessLoading} onClick={()=>submitKYCForm()}>
                            {!isProcessLoading ? "Submit" : ""}
                            {isProcessLoading &&
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            }
                        </button>
                    </div>
                </div>
            }
            {showOtpSection &&
                <React.Fragment>
                    <main role="main" className="container">
                        <div className="row">
                            <div className="col p-0">
                                <section className="shadow-none">
                                    <div className="resend-otp-container">
                                        <img srcSet={`${OtpImg} 1x, ${Otp2xImg} 2x`} alt="OTP background" title="OTP background"/>
                                        <div>
                                            <h5>OTP Confirmation</h5>
                                            <h6>Please type the OTP sent to {customerKycDetails.mobileNo}.</h6>
                                            <div className="filled-form position-relative form-group">      
{/*                                                 <input type="text" className = {validate.isNotEmpty(error["otpValue"]) ? "form-control is-invalid" : "form-control"} id="otp-field" minLength="5" maxLength="5" autoComplete="new-off" onKeyUp={validateOTPForCustomerKyc}/>
                                                    
 */}                                            <div className="filled-form position-relative form-group">
                                                    <input autoFocus type="text" className={otpErrorMessage ? 'form-control is-invalid' :"form-control"} id="OTP" placeholder=" " name="OTP" onFocus={(e)=>handleOTPFocusInput(e)} onBlur ={(e)=>handleOTPOnBlur(e)} onChange={(e)=>handleOTPOnChange(e)}
                                                    value = {otpValue} maxLength={5} ref={focus}/>
                                                   {/*  <label htmlFor="OTP">Enter OTP</label> */}
                                                </div>    

                                                {/* <label htmlFor="otp-field" className="select-label">Enter OTP</label> */}
                                                <Error data={otpErrorMessage}></Error>
                                            </div>
                                            <div className="btn-container d-flex justify-content-between">
                                                <a className="pointer" title="Resend OTP" onClick={()=>{submitKYCForm("Y")}} >
                                                    {resendOtpLoader ? "" : "ReSend OTP"}
                                                    {resendOtpLoader &&
                                                        <React.Fragment>
                                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                            <span className="sr-only"></span>
                                                        </React.Fragment>
                                                    }
                                                </a>
                                                {/* {otpOnCall.dispalyOTPOnCall &&
                                                    <a className="pointer" title="Otp on Call" onClick={()=>sendOtpOnCallForCustomerKyc()}>OTP on Call</a>
                                                } */}
                                            </div>
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 mt-3 custom-btn-lg" onClick={()=>verifyCustomerKycOtp()}>
                                                {!submitOTPLoader ? "Verify Otp" : ""}
                                                {submitOTPLoader &&
                                                    <React.Fragment>
                                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                        <span className="sr-only"></span>
                                                    </React.Fragment>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    
                                </section>
                            </div>
                            
                        </div>
                    </main>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

const Error = (props) => {
    return <small  class="form-text invalid-feedback d-block">{props.data}</small>
}

export default WalletKYCForm;
