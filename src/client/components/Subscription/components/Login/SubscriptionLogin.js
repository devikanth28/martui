import React, {useEffect, useState} from 'react';
import Validate from "../../../../helpers/Validate";
import Alert from '../../../Common/Alert';
import SubscriptionService from "../../services/SubscriptionService";
import LocalDB from '../../../../DataBase/LocalDB';
import { useSelector, useDispatch } from "react-redux";
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SubsLoginIcon from "../../../../images/common/Subscriptions-amico.svg";
import { SET_CORPORATE_EMAIL_ID } from '../../redux/SubscriptionReducer';
import Authentication from '../../../Authentication/Authentication';
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX } from '../../constants/SubscriptionConstants';

 
const SubscriptionLogin = (props) =>{
    const validate=Validate();
    const dispatch = useDispatch();
    const subscriptionService= SubscriptionService();
    const [mobileNumber,setMobileNumber]= useState('');
    const [error,setError]=useState(undefined);
    const [alertMessage,setAlertMessage]=useState(undefined);
    const [disable,setDisabled]=useState(true);
    const [backDropLoader,setBackDropLoader]=useState(false);
    const [corporateEmailId, setCorporateEmailId] = useState();
    const [domains, setDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    
    const emailDomains = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.companyDetails)){
            return state.subscription.companyDetails.emailDomains;
        }
    })

    useEffect(()=>{
        if (!props.isCorporateEmail && Authentication.isAuthenticated(userInfo)) {
            props.history.replace(`${MEDPLUS_ADVANTAGE_HOME}`);
        } else if(props.isCorporateEmail) {
            if(validate.isNotEmpty(emailDomains)) {
                setDomains(emailDomains);
                setSelectedDomain(emailDomains ? emailDomains[0]:"domain");
            }   
        }
    },[userInfo]);

    const handleChange=(e)=>{
        if(validate.isNotEmpty(e.target.value) && !validate.isNumeric(e.target.value)){
            return;
        }
        let errorMsg= validate.mobileNumber(e.target.value);
        if(validate.isNotEmpty(errorMsg)) {
            setError({...error,[e.target.id]:errorMsg});
            setDisabled(true);
        } else {
            setError({...error,[e.target.id]:""});
            setDisabled(false);
        }
        setMobileNumber(e.target.value);
    }
    
    const handleEmailInput = (e)=> {
        var emailPattern = /^[A-Za-z0-9-_.]+$/;
        if(validate.isEmpty(e.target.value) || !emailPattern.test(e.target.value)) {
            setError({...error,[e.target.id]:"Enter a valid emailId"});
            setDisabled(true);
        } else {
            setError({...error,[e.target.id]:""});
            setDisabled(false);
            setCorporateEmailId(e.target.value);
        }
        if(validate.isEmpty(e.target.value)) {
            setCorporateEmailId('');
        }
    }
    const clearAlerMessage=()=>{
        setAlertMessage(undefined);
    }
    const handleEnter=(e)=> {
        if (e.keyCode == 13) {
            e.target.blur();
           getOtp();
        } 
    }

    const getOtp=()=>{
        setBackDropLoader(true);
        if(props.isCorporateEmail) {
            const emailDomain = validate.isNotEmpty(selectedDomain) ? selectedDomain : domains[0];
            let object = {"emailId":corporateEmailId+"@"+emailDomain,"userId":""}
            subscriptionService.sendEmailOtpForCorporatePlan(object).then(data=>{
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" === data.statusCode){
                    let dbObject={"corporateEmailId":corporateEmailId+"@"+emailDomain};
                    LocalDB.setValue("corporateCustomerLogin",JSON.stringify(dbObject));
                    props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/emailOtpVerify`);
                } else if (data && data.dataObject && data.dataObject[0] === "OTP Verification Completed Recently") {
                    setAlertMessage({message:"OTP Verification Completed Recently",type:"Info"});
                    setTimeout(() => {
                        LocalDB.removeValue("corporateCustomerLogin");
                        dispatch({type:SET_CORPORATE_EMAIL_ID,data:corporateEmailId+"@"+emailDomain});
                        props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/corporateMemberPlans`);
                    }, 3000);
                } else {
                    setAlertMessage({message:data.message,type:"Error"});
                }
                setBackDropLoader(false);
            }).catch(err=>{
                setAlertMessage({message:"something went wrong",type:"Error"});
                setBackDropLoader(false);
            })
        } else {
            let object={"MOBILE_NUMBER":mobileNumber}
            subscriptionService.customerGetOtp(object).then(data=>{
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                    let dbObject={"MOBILE_NUMBER":mobileNumber,"IsExistingCustomer":data.responseData};
                    LocalDB.setValue("subscriptionCustomer",JSON.stringify(dbObject));
                    props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginOtp`);
                } else{
                    setAlertMessage({message:data.message,type:"Error"});
                }
                setBackDropLoader(false);
            }).catch(err=>{
                setAlertMessage({message:"something went wrong",type:"Error"});
                setBackDropLoader(false);
            })
        }
    }

    return(
        <React.Fragment>
            {validate.isNotEmpty(alertMessage) && <Alert className="toast-container b-m" alertInfo={alertMessage} duration={5000} onDurationEnd={clearAlerMessage}/>}
            <div className="subs-login-container">
                <section className="subs-login">
                    <div className="content">
                        {props.isCorporateEmail &&
                            <p class="mb-0">Verify Corporate Email ID</p>
                        }
                        {!props.isCorporateEmail &&
                            <p class="mb-0">Register or Login</p>
                        }
                        <h3>for Subscription</h3>
                        {!props.isCorporateEmail && 
                            <div className="form-group has-float-label  my-4">
                                <input type="tel" pattern="[1-9]{1}[0-9]{9}" className={"form-control"} type="tel" id="mobileNumber" name="mobileNumber" value={mobileNumber} autoFocus onKeyDown={handleEnter} onChange={handleChange} maxlength="10" autoComplete="off" placeholder=" "/>
                                <label htmlFor="mobileNumber" className="select-label">Enter your mobile number</label>
                                {validate.isNotEmpty(error) && validate.isNotEmpty(error['mobileNumber']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['mobileNumber']} </small>}
                            </div>
                        }
                        {props.isCorporateEmail && 
                            <React.Fragment>
                                <div className="form-group has-float-label  my-4">
                                    <input type="text" readOnly value={userInfo.firstName + " " + ((validate.isNotEmpty(userInfo.lastName) && (userInfo.firstName!==userInfo.lastName))? userInfo.lastName : "")} className="form-control" id="firstName" name="firstName" autoComplete="off" placeholder=" "/>
                                    <label htmlFor="firstName" className="select-label">Name</label>
                                </div>
                                <div className="p-0" style={{ "minHeight": "unset" }} >
                                    <div class="input-group mb-4 flex-nowrap">
                                        <div className="form-group has-float-label w-100 mb-0">
                                            <input name="corporateEmail" autoFocus id="corporateEmail" placeholder=" " onKeyDown={handleEnter} maxLength="30" onChange={handleEmailInput} type="text" autoComplete="off" className={(validate.isNotEmpty(error) && validate.isNotEmpty(error['corporateEmail']) ? "is-invalid " : "") + "form-control"} style={{ "border-radius": "0.2rem 0 0 0.2rem" }}/>
                                            <label htmlFor="corporateEmail" className="select-label text-capitalize">User Name</label>
                                            {(validate.isNotEmpty(error) && validate.isNotEmpty(error['corporateEmail'])) && <small className="help-block text-left errmsg margin-none text-danger"> {error['userName']} </small>}
                                        </div>
                                        <div class="input-group-append">
                                            <div className="mb-0">
                                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className ="subs-domain-dropdown">
                                                    <DropdownToggle caret color="white" className="border-left-0 h-100">
                                                        @{selectedDomain}
                                                    </DropdownToggle>
                                                    <DropdownMenu className ="w-100 dropdown-menu-right">
                                                        {validate.isNotEmpty(domains) && domains.map(eachDomain=>{
                                                            return(
                                                                <DropdownItem className={(selectedDomain == eachDomain) ? "active":"" } onClick={() => setSelectedDomain(eachDomain)}>{eachDomain}</DropdownItem>
                                                            )
                                                        })}
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        <div class="row mb-5 flex-row-reverse">
                            <div class="col pl-1">
                                <button type="button" disabled={disable || backDropLoader} class="btn btn-brand-gradient btn-block rounded-pill custom-btn-lg" onClick={()=> getOtp()}>
                                    {backDropLoader ? 
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                        : <React.Fragment>Get OTP</React.Fragment>
                                    }
                                </button>
                            </div>
                            <div class="col pl-1"><button disabled={backDropLoader} type="button" class="btn btn-light brand-secondary rounded-pill custom-btn-lg" onClick={()=>{props.history.goBack()}}>Cancel</button></div>
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
export default SubscriptionLogin;