import React,{useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import CartAction from "../../../../redux/action/CartAction";
import UserInfoAction from "../../../../redux/action/UserInfoAction";
import { ResendOTPLogin , ChangeNumber, VerifyotpLogin } from "../../../Analytics/Analytics";
import CONFIG from "../../../constants/ServerConfig";
import LocalDB from "../../../DataBase/LocalDB";
import Validate from "../../../helpers/Validate";
import MartCatalogService from "../../../MedplusMart/services/MartCatalogService";
import SubscriptionService from "../../Subscription/services/SubscriptionService";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from "../Alert";
import { useInputField } from "../CustomHooks/useInputField";
import { useTimer } from "../CustomHooks/useTimer";
import { SIGNIN_OTP_VERIFY } from "../RoutingConstants";

const VerifyOtp = (props) =>{

    let mobileNumber = LocalDB.getValue("MOBILE_NUMBER");
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [disabled, setDisabled] = useState(true);
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    const subscriptionService = SubscriptionService();
    const validate = Validate();
    const [otpValue,otpErrorMessage,setOtpValue,setOtpError,handleOnChange,handleFocusInput,handleOnBlur] = useInputField("NUMBER",5);
    const [timerDiff,setTimerDiff,setTimer,clearTimer] = useTimer();
    const [resendOtpTimer,setResendOtpTime] = useState('');
    const [removeResend, setRemoveResend] = useState(false);
    const focus = useRef(null);
    const customerCartFromRedux = useSelector(state => validate.isNotEmpty(state?.cart?.shoppingCartItem) ? state.cart.shoppingCartItem : []);

    useEffect(() => {
        focus.current.focus();
    },[]);

    useEffect(()=>{
        if(validate.isEmpty(mobileNumber)) {
            props.history.replace('/signInPopUp');
            return;
        }
        handleTimer();
    },[]);

    useEffect(()=>{
        if(timerDiff <= 0){
            setResendOtpTime('');
        } else {
            let diff = timerDiff/1000;
            let diffInMinutes =parseInt(diff / 60);
            let diffInSeconds = parseInt(Math.floor(diff) % 60);
            if(diffInMinutes < 10){
                diffInMinutes =`0${diffInMinutes}`;
            }
            if(diffInSeconds < 10){
                diffInSeconds =`0${diffInSeconds}`;
            }
            setResendOtpTime(`${diffInMinutes}:${diffInSeconds}`);
        }

    },[timerDiff])

    const resendOtp=(e)=>{
        e.preventDefault();
        setResendLoader(true);
        subscriptionService.resendOtp({"MOBILE_NUMBER":mobileNumber}).then(data=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                ResendOTPLogin('Success')
                setAlertInfo({message:"OTP resent successfully",type:ALERT_TYPE_SUCCESS})
            }else if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "FAILURE" == data.statusCode && data.message =="Maximum otp request exceeded.Please try again after 120 minutes"){
                setAlertInfo({message:data.message,type:ALERT_TYPE_ERROR});
                setRemoveResend(true);
            } else{
                ResendOTPLogin('Failure')
                setAlertInfo({message:data.message,type:ALERT_TYPE_ERROR});
            }
            setOtpValue();
            setResendLoader(false);
            setOtpError('');
            clearTimer();
            handleTimer();
        }).catch(err=>{
            ResendOTPLogin('Failure')
            setAlertInfo({message:"Something went wrong",type:ALERT_TYPE_ERROR});
            setResendLoader(false);
        })
    }

    const handleTimer = () => {
        let currentDate  = new Date();
        currentDate.setSeconds(currentDate.getSeconds()+30);
        setTimer(currentDate.getTime());
    }

    const verifyOtp = (otpVerify) => {
        setIsLoading(true);
        setDisabled(true);
        subscriptionService.otpVerifyForOldCustomer({ "mobileNumber": mobileNumber, "otp": otpVerify }).then(async (data) => {
            VerifyotpLogin('Success')
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                if(validate.isNotEmpty(customerCartFromRedux)) {
                    const products = {};
                    customerCartFromRedux.map((eachProduct) => {
                        if(validate.isNotEmpty(eachProduct)) {
                            products[eachProduct.productId] = eachProduct.quantity;
                        }
                    });
                    await MartCatalogService().mergeCustomerCart({"CART_INFO": JSON.stringify(products)});
                }
                if(props.addToDiagnosticCart){
                    await props.addToDiagnosticCart();
                }
                LocalDB.removeValue("fireBaseToken");
                if(validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.customer) && data.dataObject.isNewCustomer){
                    props.setCloseModal(true);
                    props.setShowModal({
                        RegistrationForm: true
                    });
                }else{
                    await userInfoAction.reloadUserInfo();
                    await cartAction.updateShoppingCartInfo();
                    let url = LocalDB.getValue("fromPage");
                    LocalDB.removeValue("fromPage");
                    window.location.href = validate.isNotEmpty(url) ? url : CONFIG.REDIRECT_HOME_URL+"myProfile" ;
                }
            }else if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "FAILURE" == data.statusCode && data.message === "System experiencing some problem, Please try after some time"){
                setAlertInfo({message:data.message,type:ALERT_TYPE_ERROR});
                setOtpValue("");
                setIsLoading(false);
                setDisabled(false);
                props.history.push("/");
            }else {
                setAlertInfo({message:data.message,type:ALERT_TYPE_INFO});
                setOtpValue("");
                setIsLoading(false);
                setDisabled(false);
            }
        }).catch((err) => {
            VerifyotpLogin('Failure')
            console.log(err);
            setAlertInfo({ message: "Something went wrong", type: ALERT_TYPE_ERROR });
            setOtpValue("");
        });
    }

    useEffect(()=>{
        if(otpValue && otpValue.length == 5){
            verifyOtp(otpValue);
        }else{
            setDisabled(true);
        }
    },[otpValue])

    const getMaskedstring =(mobilenumber) => {
        if(validate.isNumeric(mobileNumber)) {
            mobilenumber = mobileNumber.toString();
        }
        return mobilenumber.slice(0,2) + mobilenumber.slice(2).replace(/\d(?=\d{4})/g, "X")
    }
    
    return(
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="w-75-form">
                <h6 className="title">
                    Please enter OTP sent to 
                    {mobileNumber && <strong>{getMaskedstring(mobileNumber)}.</strong>}
                </h6>
                <div className="form-group has-float-label mb-3">
                    <input type="text" className={otpErrorMessage ? 'form-control is-invalid' :"form-control"} id="OTP" placeholder=" " name="OTP" onFocus={(e)=>handleFocusInput(e)} onChange={(e)=>handleOnChange(e)}
                    value = {otpValue} maxLength={5} ref={focus}/>
                    <label htmlFor="OTP">Enter OTP</label>
                    {otpErrorMessage && 
                        <div className="invalid-feedback d-block">
                            {otpErrorMessage}
                        </div> 
                    }
                </div>

                <div class="d-flex justify-content-between mx-n2 mb-3 align-items-center">
                    {validate.isEmpty(resendOtpTimer) &&  !removeResend && <a type="button" title="Resend OTP" aria-label="Resend OTP" class="btn btn-link text-primary font14 btn-sm font-weight-normal" href="javascript:void(0)" disabled={isLoading || resendLoader} onClick={(e)=>resendOtp(e)}>
                        {resendLoader ? 
                            <React.Fragment>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </React.Fragment>
                        : <React.Fragment>Resend OTP</React.Fragment>
                        }
                    </a>}
                    {validate.isNotEmpty(resendOtpTimer) && !removeResend && <p title={"Resend OTP in " + resendOtpTimer} className="mb-0 text-secondary pl-2">{`Resend in ${resendOtpTimer}`}</p>}
                    {props.routePath != SIGNIN_OTP_VERIFY && <a href= "javascript:void(0)" type="button" className="btn btn-link text-primary font 14 btn-sm font-weight-normal"  onClick={() => {props.setShowModal({LoginWithOtp: true});ChangeNumber('SignIn')}}>
                        Change Number
                    </a>}
                    {/* <a href="javascript:void(0)" title="OTP on Call" aria-label="OTP on Call" className='btn btn-link text-primary font14 btn-sm font-weight-normal'>OTP on Call</a> */}
                </div>
                <div className="row no-gutters">
                        <button className="btn btn-brand-gradient rounded-pill btn-block col custom-btn-lg" onClick={()=>verifyOtp(otpValue)} disabled={( otpValue && otpValue.length!=5) ||isLoading} >
                            {isLoading && 
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            }
                            {!isLoading && "Verify OTP" }
                        </button>

                </div>                
            </div>
        </React.Fragment>
    )
}

export default VerifyOtp;