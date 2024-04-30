import React, { useEffect, useState } from "react";
import CartAction from "../../../../redux/action/CartAction";
import UserInfoAction from "../../../../redux/action/UserInfoAction";
import CONFIG from "../../../constants/ServerConfig";
import LocalDB from "../../../DataBase/LocalDB";
import DoctorCheckoutService from "../../../DoctorConsultation/services/DoctorCheckoutService";
import DoctorConsultationService from "../../../DoctorConsultation/services/DoctorConsultationService";
import { sendLoginOtp } from "../../../helpers/CommonUtil";
import Validate from "../../../helpers/Validate";
import CommonHeaderService from "../../../services/CommonHeaderService";
import Alert, { ALERT_TYPE_ERROR } from "../../Common/Alert";
import LabCheckOutService from "../../MedplusLabs/Services/LabCheckoutService";
import SubscriptionService from "../services/SubscriptionService";
import CheckoutService from "../../../services/CheckoutService"
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants";
import { DIAGNOSTICS_URL_PREFIX } from "../../MedplusLabs/constants/LabConstants";
import MyAccountService from "../../../services/MyAccountService";

const RetryPaymentIntermediate = (props) =>{
  
    let orderId = props.match.params.orderId;
    const [alertMessage, setAlertMessage] = useState(undefined);
    let subscriptionService = SubscriptionService();
    const validate = Validate();
    const cartAction = CartAction();
    const userInfoAction = UserInfoAction();
    const checkoutService = CheckoutService();
    let id = "";
    useEffect (()=>{
        let type = "";
        if(props && props.match){
            if(props.match.url.indexOf("subscriptionRetryPayment") !== -1){
                type="SUBSCRIPTION"
            }else if(props.match.url.indexOf("labOrderRetryPayment") !== -1){
                type="LAB_ORDER_RETRY_PAYMENT"
                id=props.match.params.orderId;
            }else if(props.match.url.indexOf("initiateconsultation") !== -1){
                type="VIDEO_CONSULTATION";
                id=props.match.params.orderId;
            }else if(props.match.url.indexOf("retryDoctorConsultationPayment") !== -1){
                type="DOCTOR_CONSULTATION_RETRY_PAYMENT";
                id=props.match.params.orderId;
            }else if(props.match.url.indexOf("refillReorder") !== -1){
                type="REFILL";
                id=props.match.params.refillOrderId;
            }else if(props.match.url.indexOf("cfpReorder") !== -1){
                type="CFP";
                id=props.match.params.cfpId;
            }else if(props.match.url.indexOf("retryPayment") !== -1 || props.match.url.indexOf("payOnline") !== -1){
                type = "MART_ORDER";
                id = props.match.params.orderId;
            }
        }

        if(type === 'SUBSCRIPTION'){
            subscriptionService.getRetryPaymentOrderSummary({"orderId":orderId}).then((data)=>{
                if("SUCCESS" == data.statusCode){
                    props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/${orderId}`);
                }else{
                    if("INVALID_CUSTOMERID" === data.message){
                        LocalDB.setValue("fromPage",`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/${orderId}`);
                        redirectToSubscriptionLogin(data.dataObject.mobileNumber);
                    }else if(data.message === "INVALID_ORDER"){
                        setAlertMessage({message: "We apologize, but we couldn't find any order that matchs your search criteria.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "TRANSACTION_AWAITING"){
                        setAlertMessage({message: "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "TRANSACTION_COMPLETED"){
                        setAlertMessage({message: "We have already confirmed your order and are processing it.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else{
                        setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                        setTimeout(() => {
                            redirectToHome();
                        }, 5000);
                    }
                }
            })
        }else if(type === 'LAB_ORDER_RETRY_PAYMENT'){
            LabCheckOutService().getRetryPaymentLabOrderSummary({orderId:id, needToChangeLocality:true, retryPayment:true}).then(data=>{
                if("SUCCESS" == data.statusCode){
                    props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-payment/${id}`);
                }else{
                    if("INVALID_CUSTOMERID" == data.message){
                        redirectToLogin(data.responseData.mobileNumber, type);
                    }else if(data.message === "INVALID_ORDER"){
                        setAlertMessage({message: "We apologize, but we couldn't find any order that matchs your search criteria.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "TRANSACTION_AWAITING"){
                        setAlertMessage({message: "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "TRANSACTION_COMPLETED"){
                        setAlertMessage({message: "We have already confirmed your order and are processing it.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else{
                        setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                        setTimeout(() => {
                            redirectToHome();
                        }, 5000);
                    }
                }
            })   
        }else if(type === "VIDEO_CONSULTATION"){
            handleVideoConsultationRedirection(id,type);
        }else if(type == "DOCTOR_CONSULTATION_RETRY_PAYMENT"){
            handleDoctorConsultationRetryPayment(id,type);
        }else if(type == "REFILL" || type == 'CFP'){
            checkoutService.setReOrderItems({type, id}).then((data)=>{
                if(data.statusCode === "SUCCESS"){
                    let dataObject = data.dataObject;
                    if(dataObject.loginRequired && !dataObject.mobileNumber){
                        return false;
                    }
                    if(type === "REFILL"){
                        LocalDB.setValue("refillCheckoutId", id);
                    }
                    if(!dataObject.loginRequired){
                        props.history.replace(`/shoppingCart`);
                    } else {
                        redirectToLogin(dataObject.mobileNumber, type, id);
                    }
                } else {
                    if(type === "REFILL"){
                        setAlertMessage({message: "Either Order For This Refill is already generated Or Refill is Expired", type: 'danger'});
                    }else{
                        setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                    }
                    setTimeout(() => {redirectToHome();}, 5000);
                }
            }).catch(err=>{
                console.log(err);
                setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                setTimeout(() => {redirectToHome();}, 5000);
            })
        }else if(type = "MART_ORDER"){
            checkoutService.redirectToRetryOrderPayment({"orderId" : orderId}).then((data)=>{
                if("SUCCESS" == data.statusCode){
                    if(data.dataObject.loginRequired){
                        redirectToLogin(data.dataObject.mobileNumber, type, data.dataObject.cartId);
                    }else{
                        props.history.replace(`/payment/${data.dataObject.cartId}`,{showEditOrderModal : true});
                    }
                }else{
                    if(data.message === "NO PENDING ORDERS"){
                        setAlertMessage({message: "There are no pending orders at the moment.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "ALREADY IN AWAITING STATUS"){
                        setAlertMessage({message: "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "TRANSACTION ALREADY HAPPENED"){
                        setAlertMessage({message: "We have already processed your transaction. You can check your order in Purchase History.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }else if(data.message === "INSUFFICIENT ORDER TOTAL"){
                        let dataObject = data.dataObject;
                        if(!dataObject.loginRequired){
                            props.history.replace("/shoppingCart");
                        } else {
                            redirectToLogin(data.dataObject.mobileNumber, type, data.dataObject.cartId);
                        }
                    }else{
                        setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                        setTimeout(() => {
                            redirectToHome();
                        }, 5000);
                    }
                }
            }).catch(err=>{
                console.log(err);
                setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                setTimeout(() => {redirectToHome();}, 5000);
            })

        }
    },[]);

    const handlecfpId = (cfpId, type) => {
        let obj ={"random":new Date(),"cfpId": cfpId}
        checkoutService.getCfp(obj).then(data=>{
            if(data && "SUCCESS" === data.statusCode){
                window.location.href = `/cfpOrderSuccessResponse/${cfpId}`;
            }else{
                if("Invalid customer" == data.message){
                    redirectToLogin(data.responseData, type);
                }else if("CFP Details not found" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }else if("Customer Details not found" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }else if("No mobile number" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }else if("CFP ID is null or empty" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }
                else if("CFP Details not found" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }
            }
        }).catch(err=>{
            setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
            setTimeout(() => {
                redirectToHome();
            }, 5000);
        })
    }
    const handleRefillReOrder = (refillId, type) => {
        let obj ={"random":new Date(),"refillId": refillId}
        checkoutService.getRefillReOrderDetails(obj).then(data=>{
            if(data && "SUCCESS" === data.statusCode){
                window.location.href = `/refillReorderSuccessResponse/${refillId}`;
            }else{
                if("Invalid customer" == data.message){
                    redirectToLogin(data.responseData, type);
                }else if("Refill not found" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }else if("Refill link expired" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }else if("No mobile number" == data.message){
                    setAlertMessage({message: data.message, type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }
            }
        }).catch(err=>{
            setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
            setTimeout(() => {
                redirectToHome();
            }, 5000);
        })
    }

    const handleDoctorConsultationRetryPayment = (orderId, type) => {
        let obj ={"random":new Date(),"orderId": orderId}
        DoctorCheckoutService().getDoctorConsultationForRetry(obj).then(data=>{
            if(data && "SUCCESS" === data.statusCode){
                props.history.replace(`/doctorconsultation/payments/${orderId}`);
            }else{
                if("INVALID_CUSTOMERID" == data.message || "INVALID_TOKEN" == data.message){
                    redirectToLogin(data.dataObject.mobileNumber, type);
                }else if(data.message === "NO DOCTOR CONSULTATION FOUND"){
                    setAlertMessage({message: "We could not find any doctor consultation.", type: 'danger'});
                    setTimeout(() => {redirectToHome();}, 5000);
                }else if(data.message === "TRANSACTION_AWAITING"){
                    setAlertMessage({message: "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.", type: 'danger'});
                    setTimeout(() => {redirectToHome();}, 5000);
                }else if(data.message === "TRANSACTION_COMPLETED"){
                    setAlertMessage({message: "We have already confirmed your order and are processing it.", type: 'danger'});
                    setTimeout(() => {redirectToHome();}, 5000);
                }else{
                    setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                    setTimeout(() => {
                        redirectToHome();
                    }, 5000);
                }

            }
        }).catch(err=>{
            setAlertMessage({message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
            setTimeout(() => {
                redirectToHome();
            }, 5000);
        })
    }

    const handleVideoConsultationRedirection=(orderId,type)=>{
        DoctorConsultationService().validateConsultation({"orderId":orderId}).then(data=>{
            if(data && "SUCCESS" === data.statusCode){
                props.history.replace(`/consultationrequest/${orderId}`);
            }else{
                if("INVALID_CUSTOMERID" == data.message){
                    redirectToLogin(data.dataObject.mobileNumber, type);
                }
            }
        }).catch(err=>{
            setAlertMessage({message:"We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
            setTimeout(() => {
                redirectToHome();
            }, 5000);
        })
    }
    
    const redirectToSubscriptionLogin = (mobileNo)=>{
        let userInfo = userInfoAction.getUserInfo();
        CommonHeaderService().removeSession({"loginThrough":userInfo.loginThrough}).then(data=>{
            if(data.statusCode === "SUCCESS") {
                MyAccountService().generateToken().then(data => {
                    if(data.statusCode === "SUCCESS" && data.dataObject.tokenId) {
                        LocalDB.setValue("SESSIONID", data.dataObject.tokenId);
                    } else {
                        setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }
                }).then(() => {
                    let object={"MOBILE_NUMBER":mobileNo}
                    subscriptionService.customerGetOtp(object).then(data=>{
                        if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                            let dbObject={"MOBILE_NUMBER":mobileNo,"IsExistingCustomer":data.responseData};
                            LocalDB.setValue("subscriptionCustomer",JSON.stringify(dbObject));
                            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginOtp`);
                        }
                })
                }).catch(err=>{
                    console.log('error:',err);
                    props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`);
                })
            }else{
                setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`);
            }
        }).catch(err=>{
            console.log('error:',err);
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`);
        })
    }
    
    const redirectToLogin =  (mobileNo,type, cartId)=>{
        let userInfo = userInfoAction.getUserInfo();
        CommonHeaderService().removeSession({"loginThrough":userInfo.loginThrough}).then(async data=>{
            if(data.statusCode === "SUCCESS") {
                MyAccountService().generateToken().then(data => {
                    if(data.statusCode === "SUCCESS" && data.dataObject.tokenId) {
                        LocalDB.setValue("SESSIONID", data.dataObject.tokenId);
                    } else {
                        setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                        setTimeout(() => {redirectToHome();}, 5000);
                    }
                }).then(async () => {
                    let mobileNumber_loginOtp = await sendLoginOtp(mobileNo).catch(err=>{
                        setAlertMessage({ message: err, type: ALERT_TYPE_ERROR });
                        setTimeout(() => {redirectToHome();}, 5000);
                    });
                    if(mobileNumber_loginOtp){
                        LocalDB.setValue("MOBILE_NUMBER",mobileNumber_loginOtp);
                        LocalDB.setValue("fromPage",getFromPage(type, cartId));
                        LocalDB.setValue("toPage",-2);
                        props.history.replace("/signin-otp-verify");
                    }
                })
            }else{
                setAlertMessage({message: "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                setTimeout(() => {redirectToHome();}, 5000);
            }
        }).catch(err=>{
            console.log('error:',err);
            setTimeout(() => {redirectToHome();}, 5000);
        })
    }

    const getFromPage =(type, cartId)=>{
        switch(type){
            case "LAB_ORDER_RETRY_PAYMENT":
                return `${validate.isNotEmpty(DIAGNOSTICS_URL_PREFIX) ? DIAGNOSTICS_URL_PREFIX.split("/")[1] + "/" : ''}labOrderRetryPayment/${id}`;
            case "VIDEO_CONSULTATION":
                return `consultationrequest/${id}`;
            case "DOCTOR_CONSULTATION_RETRY_PAYMENT":
                return `/doctorconsultation/payments/${id}`
            case "REFILL":
                    return `/refillReorder/${id}`
            case "CFP":
                return `/cfpReorder/${id}`
            case "MART_ORDER":
                return `/payment/${cartId}`
            default:
                return ``;
            
        }
      
    }
    
    const redirectToHome = () =>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    return (
        <React.Fragment>
            {alertMessage && alertMessage.message && <Alert alertInfo={alertMessage} duration='5000' onDurationEnd={setAlertMessage}/>}
        </React.Fragment>
    )
}
export default RetryPaymentIntermediate;