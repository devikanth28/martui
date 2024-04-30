import React,{useState, useEffect, useRef} from 'react';
import Validate from '../../../../helpers/Validate';
import LocalDB from '../../../../DataBase/LocalDB';
import Alert from '../../../../components/Common/Alert';
import SubscriptionService from '../../../Subscription/services/SubscriptionService';
import SubsLoginIcon from "../../../../images/common/Subscriptions-amico.svg";
import { useDispatch } from "react-redux";
import {SET_CORPORATE_EMAIL_ID} from "../../redux/SubscriptionReducer";
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import CartAction from '../../../../../redux/action/CartAction';
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX } from '../../constants/SubscriptionConstants';

const OTP_PATTERN = /^[0-9]{1}$/;
const EXCLUDED_KEY_CODES = [8, 39, 116, 13, 37];

const SubscriptionLoginOtp = (props) =>{
    
    const NO_OF_ELEMENTS = props.isCorporateEmail ? 6 : 5;
    const DEFAULT_FOCUS_ELEMENT = 1;
    const ELEMENT_REFS = [];
    for (let i = 0; i < NO_OF_ELEMENTS; i++) {
        ELEMENT_REFS.push(i + 1);
    }
    const validate= Validate();
    const subscriptionService=SubscriptionService();
    const [mobileNumber,setMobileNumber]=useState(undefined);
    const [isCustomerExist,setIsCustomerExist]=useState(false);
    const [otp,setOtp]=useState({});
    const [disable,setDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [alertMessage,setAlertMessage]=useState(undefined);
    const [customerName,setCustomerName]=useState("");
    const [error,setError]=useState(undefined);
    const [corporateEmailId, setCorporateEmailId] = useState();
    const dispatch = useDispatch();
    const elements = useRef({});
    const nameRef= useRef();
    useEffect(()=>{
        if(props.isCorporateEmail && LocalDB.getValue("corporateCustomerLogin")) {
            let corporateEmailId = JSON.parse(LocalDB.getValue("corporateCustomerLogin")).corporateEmailId;
            setCorporateEmailId(corporateEmailId);
        } else if (LocalDB.getValue("subscriptionCustomer")) {
            let customerObject=JSON.parse(LocalDB.getValue("subscriptionCustomer"));
            setMobileNumber(customerObject.MOBILE_NUMBER);
            setIsCustomerExist(customerObject.IsExistingCustomer);
        } else {
            props.history.replace(`${MEDPLUS_ADVANTAGE_HOME}`);
        }
    },[])
    useEffect(()=>{
        if(otp && Object.keys(otp).length === NO_OF_ELEMENTS){
            verifyOTP();
        }
    },[otp])
    const onInputChange=(e)=>{
        let  tempOtp = {...otp};
        
        if (e.target.value && (e.target.value.length > 1 || !OTP_PATTERN.test(e.target.value) || parseInt(e.target.value) < 0 || parseInt(e.target.value) > 9)) {
            e.preventDefault();
            return;
        }
        if (validate.isNotEmpty(e.target.value)) {
            tempOtp[e.target.name] = e.target.value;
        } else {
            delete tempOtp[e.target.name];
        }
        setOtp({...tempOtp});
        setFocus(e);
    }
    const resendOtp=(e)=>{
        e.preventDefault();
        setResendLoader(true);
        if(props.isCorporateEmail) {
            let object={"emailId":corporateEmailId}
            subscriptionService.resendEmailOtpForCorporatePlan(object).then(data=>{
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                    setAlertMessage({message:"otp sent successfully",type:"Success"})
                } else {
                    setAlertMessage({message:data.message,type:"Error"});
                }
                setOtp({});
                setResendLoader(false);
            }).catch(err=>{
                setAlertMessage({message:"something went wrong",type:"Error"});
                setResendLoader(false);
            })
        } else {
            let object={"MOBILE_NUMBER":mobileNumber}
            subscriptionService.resendOtp(object).then(data=>{
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                    setAlertMessage({message:"otp sent successfully",type:"Success"})
                }else{
                    setAlertMessage({message:data.message,type:"Error"});
                }
                setOtp({});
                setResendLoader(false);
            }).catch(err=>{
                setAlertMessage({message:"something went wrong",type:"Error"});
                setResendLoader(false);
            })
        }
        elements.current[1].focus();
    }
    const verifyOTP=(e)=>{
        let otpVerify = '';
        if(validate.isNotEmpty(e)){
            e.preventDefault();
        }
        const elms = Object.keys(otp);
        for (let i = 0; i < elms.length; i++) {
            otpVerify += otp[elms[i]];
        }
        if(otpVerify && otpVerify.length !== NO_OF_ELEMENTS){
            setAlertMessage({message:"Invalid Otp",type:"Error"})
            return;
        }
        if(!props.isCorporateEmail && !isCustomerExist && (validate.isEmpty(customerName) || customerName == "" || validate.isNotEmpty(error))){
            return;
        }
        setLoading(true);
        verifyOtpForLoginProcess(  otpVerify);
    }
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction(); 
    const handleVerifyOtpResponse = async (data)=>{
        if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS"== data.statusCode){
            await userInfoAction.reloadUserInfo();
            cartAction.updateShoppingCartInfo();
            LocalDB.removeValue("subscriptionCustomer");
            const fromPage = LocalDB.getValue("fromPage");
            LocalDB.removeValue("fromPage");
            if(data.message == 'SELECT_CUSTOMER') {
                setAlertMessage({ message: "Found Multiple accounts with this number, try with alternate number", type: 'Info' }) ;
                setTimeout(() => {
                    props.history.replace("/myProfile");
                }, 5000);
                return;
            } else if(validate.isEmpty(fromPage)){
                props.history.replace(`${MEDPLUS_ADVANTAGE_HOME}`);
            } else {
                props.history.replace("/"+fromPage);
            }
        }else if(validate.isNotEmpty(data.message)){
            setAlertMessage({ message: data.message, type: 'Error' }) ;
            setOtp({});
            if(validate.isNotEmpty(elements.current) && validate.isNotEmpty(elements.current[parseInt(1)])){
                elements.current[parseInt(1)].focus();
            }
        }else{
            setAlertMessage({ message:"Something went wrong", type: 'Error' }) ;
            setOtp({})
        }
        setLoading(false);
    }
    const verifyOtpForLoginProcess=( otpVerify)=>{

        if(props.isCorporateEmail){
            let object = { "emailId": corporateEmailId, "otpValue": otpVerify };
            subscriptionService.validateEmailOtpForCorporatePlan(object).then(data=>{
                if(data && data.statusCode && "SUCCESS" === data.statusCode) {
                    LocalDB.removeValue("corporateCustomerLogin");
                    dispatch({type:SET_CORPORATE_EMAIL_ID,data:corporateEmailId});
                    props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/corporateMemberPlans`);
                } else if(validate.isNotEmpty(data.message)){
                    setAlertMessage({ message: data.message, type: 'Error' }) ;
                    setOtp({});
                    if(validate.isNotEmpty(elements.current) && validate.isNotEmpty(elements.current[parseInt(1)])){
                        elements.current[parseInt(1)].focus();
                    }
                } else{
                    setAlertMessage({ message:"Something went wrong", type: 'Error' }) ;
                    setOtp({})
                }
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
                setAlertMessage({ message: "Something went wrong", type: 'Error' });
                setOtp({});
            })
        } else if (isCustomerExist) {
            let object = { "mobileNumber": mobileNumber, "otp": otpVerify };
            subscriptionService.otpVerifyForOldCustomer(object).then((data) => {
                handleVerifyOtpResponse(data);
            }).catch((err) => {
                setLoading(false);
                setAlertMessage({ message: "Something went wrong", type: 'Error' });
                setOtp({});
            });
        } else {
            if(validate.isEmpty(customerName)){
                setLoading(false);
                setAlertMessage({ message: "please enter customer name", type: 'Error' });
                return;
            }
            let object = { "mobileNumber": mobileNumber, "otp": otpVerify, "customerName": customerName };
            subscriptionService.otpVerifyForNewCustomer(object).then((data) => {
                handleVerifyOtpResponse(data);
            }).catch((err) => {
                setLoading(false);
                setAlertMessage({ message: "Something went wrong", type: 'Error' });
                setOtp({});
            });
        }
    }
    const onKeyUp =(e)=> {
        const keyCode = e.keyCode || e.which;
        const name = parseInt(e.target.name);
        if (validate.isNotEmpty(e.target.value) && !props.isCorporateEmail && !isCustomerExist && name === NO_OF_ELEMENTS && keyCode === 9 ) {
            nameRef.current.focus();
        }else{
            e.preventDefault();
            return; 
        }
    }
        
    const onKeyDown=(e)=> {
        const keyCode = e.keyCode || e.which;
        if (EXCLUDED_KEY_CODES.indexOf(keyCode) === -1 && (keyCode === 38 || keyCode === 40 || keyCode < 48 || (keyCode > 57 && keyCode < 96) || keyCode > 105)) {
            e.preventDefault();
            return;
        }
        if(e.target.name ===`${NO_OF_ELEMENTS}` && keyCode === 13){
            verifyOTP(e);
        }
        setFocus(e);
    }
    const setFocus=(e)=> {
        const name = parseInt(e.target.name);
        if (e.target.value.length >= 1 && name < NO_OF_ELEMENTS) {
            elements.current[name + 1].focus();
        } else if (e.keyCode === 8 && name > 1 && e.target.value.length === 0) {
            elements.current[name - 1].focus();
        }
    } 
    const checkForFocus = (e) => {
        const name = parseInt(e.target.name);
        for(let i=1 ; i < name; i++){
            if(elements.current[i].value === '' || elements.current[i].value === undefined){
                elements.current[i].focus();
                break;
            }
        }
    }
    const handleInput=(e)=>{
        var namePattern = /^[A-Za-z A-Za-z]+$/;
        if(validate.isEmpty(e.target.value)) {
            setError(`Invalid ${e.target.name}`);
            setCustomerName('');
            setDisabled(true);
            return;
        } else if(!namePattern.test(e.target.value)) {
            return;
        } else if(validate.name(e.target.value,"Name")){
            setError(validate.name(e.target.value,"Name"));
        }else{
            setError('');
        }
        setCustomerName(e.target.value);
        if(validate.isEmpty(validate.name(e.target.value,"Name")) && otp && Object.keys(otp).length == NO_OF_ELEMENTS){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    }
    const clearAlerMessage=()=>{
        setAlertMessage(undefined);
    }
    return(
        <React.Fragment>
            {validate.isNotEmpty(alertMessage) && <Alert className="toast-container b-l" alertInfo={alertMessage} duration={5000} onDurationEnd={clearAlerMessage}/>}
             <div className="subs-login-container">
                <section className="subs-login">
                    <div className="content">
                    <p class="mb-0">Please enter OTP sent to</p>
                        <h3>{props.isCorporateEmail ? corporateEmailId : `+91 ${mobileNumber}`}</h3>
                        <div class="text-right mt-4 mb-3">
                           <div className="justify-content-between mb-3 otp-fields-container d-flex">
                              {ELEMENT_REFS.map((each,index)=>{
                                return <input key ={index} type="text" style={{'width': '45px','height': '45px' }} name = {each} ref={(input) => {elements.current[each] = input; }} autoFocus={DEFAULT_FOCUS_ELEMENT == each? 'true': 'false'} onFocus={checkForFocus} value={otp[each] || ''} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onInputChange} class="form-control form-control-lg text-center" placeholder="0"/>
                                })}
                          </div>
                          {!props.isCorporateEmail && !isCustomerExist && 
                                <div class="form-group has-float-label mt-4 mb-3">                                
                                    <input type="text" ref={nameRef} value={customerName} onChange={handleInput} name="Name" class={((error && error != "") ? "is-invalid " : "") + "form-control"} id="Name" placeholder=" " autoComplete="off" />
                                    <label htmlFor="Name" className="select-label">Enter Your Name</label>
                                    {(error && error !== "") && <div class="invalid-feedback"></div>}
                                </div>
                            }
                          <button type = "button" class="btn btn-link font-weight-normal font14 mr-n3" disabled={loading || resendLoader} onClick={(e)=>resendOtp(e)}>
                                {resendLoader ? 
                                    <React.Fragment>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </React.Fragment>
                                : <React.Fragment>Resend OTP</React.Fragment>
                                }
                          </button>
                        </div>
                        <div className="row mb-5 flex-row-reverse">
                            <div className="col pl-1">
                                <button type="button" className="btn btn-brand-gradient btn-block rounded-pill custom-btn-lg" disabled={disable || loading || resendLoader} onClick = {e => verifyOTP(e)}>
                                    {loading ? 
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    : <React.Fragment>Verify OTP</React.Fragment>
                                    }
                                </button>
                            </div>
                            <div className="col pr-1"><button disabled={loading || resendLoader} type="button" className="btn btn-block brand-secondary rounded-pill custom-btn-lg" onClick={()=> props.history.goBack()}>Cancel </button></div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4">
                        <img src={SubsLoginIcon} title="subscription login icon" alt="subscription login icon" />
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default SubscriptionLoginOtp;