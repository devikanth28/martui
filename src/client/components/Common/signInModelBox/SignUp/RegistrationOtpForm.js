import React , {useEffect,useState} from 'react';
import RegistrationService from '../../../../services/RegistrationService';
import WalletService from '../../../../services/WalletService';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO, ALERT_TYPE_ERROR} from '../../Alert'; 
import Validate from '../../../../helpers/Validate';
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import CartAction from '../../../../../redux/action/CartAction';
const RegistrationOtpForm = () =>{

    const registrationService = RegistrationService();
    const [errorMsg, setErrorMsg] = useState({});
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [editMobileNumber, setEditMobileNumber] = useState(false);
    const [otpValue,setOtpValue] = useState();
    const [otpOnCall,setOtpOnCall] = useState({otpOnCallFlag:true,dispalyOTPOnCall:false});
    const [verifyOtpLoader,setVerifyOtpLoader] = useState(false);
    const [newCustomer, setNewCustomer] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [otpCount, setOtpCount]= useState();
    const [otpMaxCount, setOtpMaxCount] = useState()
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction(); 
    
 
    useEffect(()=>{
        getRegistrationOtpDetails();
    },[])
    const getRegistrationOtpDetails = () =>{
        setProcessLoading(true);
        registrationService.getRegistrationOtpDetails().then(response =>{
            setProcessLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)){
                setNewCustomer(response.responseData.newCustomer);
                setMobileNumber(response.responseData.newCustomer ? response.responseData.newCustomer.mobileNumber : '');
                setOtpCount(response.responseData.otpCount);
                setOtpMaxCount(response.responseData.otpMaxCount);
                if(!otpCount > 0){
                    if(validate.isNotEmpty(response.responseData.newCustomer) && validate.isNotEmpty(response.responseData.newCustomer.mobileNumber)){
                        regenerateOtpForRegistration();
                    } else {
                        setAlertInfo({message:"Please try again",type:ALERT_TYPE_ERROR});
                        props.setShowModal({
                            RegistrationForm:true
                        });
                    }
                }
            }
        }).catch(function(error) {
            setProcessLoading(false);
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const validateRegistrationOTP = e =>{
        if(validate.isEmpty(e.target.value)){
            setErrorMsg({["otpValue"]:"Empty OTP"});
        }else if(!validate.isNumeric(e.target.value)){
            setErrorMsg({["otpValue"]:"OTP must be numeric"});
        }else{
            setErrorMsg({});
            setOtpValue(e.target.value);
            if(e.target.value.length == 5){
                setOtpValue(e.target.value);
                verifyRegistrationOTP(e.target.value);
            }
        }
    }

    const verifyRegistrationOTP = (otpValue) =>{
        setVerifyOtpLoader(true);
        if(!validate.isNumeric(otpValue) || otpValue.length!==5){
            setErrorMsg({["otpValue"]:"Invalid OTP"});
            setVerifyOtpLoader(false);
            return;
        }
        setErrorMsg({});
        registrationService.verifyRegistrationOTP(otpValue).then(async response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                await userInfoAction.reloadUserInfo();
                await cartAction.updateShoppingCartInfo();
                setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});
                setVerifyOtpLoader(false); 
                props.setShowModal({});
            }else if (response.message === "Customer Details Not Available to Register"){
                setVerifyOtpLoader(false);
                setOtpValue();
                setAlertInfo({message:response.message,type:ALERT_TYPE_ERROR});
                props.setShowModal({
                    RegistrationForm:true
                });
            }
        }).catch(function(error) {
            setVerifyOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }
    
    const sendOtpOnCallForRegistrationOtp = () =>{
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
            return;
        });
    }

    const regenerateOtpForRegistration = (isForResend) =>{
        setVerifyOtpLoader(true);
        if(validate.isEmpty(mobileNumber) || validate.isNotEmpty(validate.mobileNumber(mobileNumber))) {
            setErrorMsg({["otpValue"]:validate.mobileNumber(mobileNumber)});
            setVerifyOtpLoader(false);
            return;
        }
        if(validate.isEmpty(isForResend)){
            isForResend = "N";
        }
        setErrorMsg({});
        registrationService.regenerateOtpForRegistration(mobileNumber,newCustomer.firstName,newCustomer.lastName).then(response =>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.responseData) && response.statusCode === "SUCCESS") {
                setVerifyOtpLoader(false);
                setOtpCount(response.responseData.count);
                //otpCount=response.responseData.count;
                // if(validate.isNotEmpty(response.responseData.userInfo)){
                //     userInfoAction.setUserInfo(response.responseData.userInfo);
                // }
                // if(validate.isNotEmpty(response.responseData.userContactDetails)){
                //     userInfoAction.setUserContactDetails(response.responseData.userContactDetails);
                // }
                if(validate.isNotEmpty(isForResend) && "Y" == isForResend && otpOnCall.otpOnCallFlag){
                    if(otpOnCall.otpOnCallFlag){
                        setAlertInfo({message:"OTP has been resent succesfully!",type:ALERT_TYPE_SUCCESS});
                        setOtpOnCall({
                            otpKey : response.responseData.otpRedisKey,
                            otpProcess : "Medplus Registration",
                            mobileNo : mobileNumber,
                            otpOnCallFlag :false,
                            dispalyOTPOnCall : true
                        })
                    } 
                }        
            }else{
                if(validate.isNotEmpty(isForResend) && "Y" == isForResend && otpOnCall.otpOnCallFlag){
                    setAlertInfo({message:"Couldn't resend OTP",type:ALERT_TYPE_INFO});
                }
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                setVerifyOtpLoader(false);
                setErrorMsg({["otpValue"]:response.message});
            }
        }).catch(function(error) {
            console.log(error);
            setVerifyOtpLoader(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }
    return(
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <h5>OTP Confirmation</h5>
            <h6>Please type the OTP sent to {mobileNumber}.</h6>
            <div className="w-75-form">
                <div className="form-group has-float-label mb-3">
                    <input type="text" className="form-control"  id="enter-otp"  name="enterOTP" required placeholder=" " minLength="5" maxLength="5" onKeyUp={(e)=>validateRegistrationOTP(e)}/>
                    <label for="enter-otp">Enter OTP</label>
                    <div className="invalid-feedback d-block">
                        {errorMsg['otpValue']}
                    </div>
                </div>
                <div className="btn-container mb-4">
                    <a href="javascript:void(0)" title="Resend OTP" onClick={()=>{regenerateOtpForRegistration("Y")}}>Resend OTP</a>
                    {/* {otpOnCall.dispalyOTPOnCall &&
                        <a href="javascript:void(0)" title="OTP on Call" className="float-right" onClick={()=>sendOtpOnCallForRegistrationOtp()}>OTP on Call</a>
                    } */}
                </div>
                <button className="btn btn-brand btn-block" disabled={false} onClick={()=>{verifyRegistrationOTP(otpValue)}}>Verify Otp</button>
            </div>
        </React.Fragment>
    )
    
}
export default RegistrationOtpForm;