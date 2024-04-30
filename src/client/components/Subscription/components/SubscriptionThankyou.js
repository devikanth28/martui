import React, { useEffect, useState } from "react";
import Alert from '../../Common/Alert';
import CONFIG from '../../../constants/ServerConfig';
import Validate from "../../../helpers/Validate";
import SubscriptionService from "../services/SubscriptionService";
import {useSelector, useDispatch} from "react-redux";
import {DELETE_ORDER_ID} from "../redux/SubscriptionReducer";
import { MEDPLUS_ADVANTAGE_HOME } from "../constants/SubscriptionConstants";
import { isUserLoggedIn } from "../../../helpers/PaymentHelper";
import { SubscriptionPaymentDetails } from "./Payment";

const SubscriptionThankyou = (props) => {
	const dispatch= useDispatch();
	const [isThankYouLoading, setThankYouLoading] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [subscription, setSubscription] = useState('');
    const [orderDetails, setOrderDetails] = useState(''); 
    const [cartSummary, setCartSummary] = useState(undefined); 
    const [paymentDetails, setPaymentDetails] = useState('');
    const [isUpgradeOrder, setIsUpgradeOrder] = useState(false);
    const [comboPlan, setComboPlan] = useState({});
    const [selectedTrigger , setSelectedTrigger] = useState();
    const validate  = Validate();
    const subscriptionService = SubscriptionService();
    const isUserAvailable = isUserLoggedIn();
    const orderIds =  useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.orderId)){
            return state.subscription.orderId;
        }
    });

    useEffect(() => {
        if (validate.isEmpty(orderIds)){
             props.history.replace(`${MEDPLUS_ADVANTAGE_HOME}`);
             return;
        }
        
        subscriptionService.getSubscriptionOrder({ orderIds: JSON.stringify(orderIds) }).then(data => {
            setThankYouLoading(false);
            dispatch({type:DELETE_ORDER_ID});
            if (data.statusCode === "SUCCESS") {
                if (validate.isNotEmpty(data) && validate.isNotEmpty(data.dataObject)) {
                    let orderDetails = {};
                    let subscriptionDetails = {};
                    let paymentDetails = {};
                    Object.keys(data.dataObject).map((eachSubsId) => {
                        if (validate.isNotEmpty(data.dataObject[eachSubsId].orderDetails)) {
                            orderDetails[eachSubsId] = data.dataObject[eachSubsId].orderDetails;
                        }
                        if (validate.isNotEmpty(data.dataObject[eachSubsId].subscriptionDetails)) {
                            subscriptionDetails[eachSubsId] = data.dataObject[eachSubsId].subscriptionDetails;
                        }
                    });
                    if(validate.isNotEmpty(data.dataObject.cartSummary)){
                        setCartSummary(data.dataObject.cartSummary);
                    }
                    setIsUpgradeOrder(data.dataObject.isUpgradeOrder);
                    setOrderDetails(orderDetails);
                    setComboPlan(data.dataObject.comboPlan);
                    setSubscription(subscriptionDetails);
                    setPaymentDetails(data.dataObject.paymentDetails);
                } else {
                    setAlertData({ message: "No data available" , type: 'danger' })
                    setTimeout(() => {
                        props.history.push(`/`);
                    }, 2000);
                }
            }else {
                setAlertInfo({ message:validate.isEmpty(data.message) ? "Something went wrong, Plese Try again.": data.message , type: 'danger' })
                setTimeout(() => {
                    props.history.push(`/`);
                }, 2000);
            }
        }).catch((error)=>{
            setAlertInfo({ message:"Something went wrong, Plese Try again.", type: 'danger' });
            setThankYouLoading(false);
        })
    },[])

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }
    const getGhostImage = () => {
        return (<React.Fragment>
            <div className="subs-thankyou-container">
                <div className="thankyou-content w-100">
                    <div className="thankyou-bg bg-white">
                        <div className="w-100">
                            <div className="p-0 ph-item m-0" style= {{'background-color':'unset'}}>
                                <div className="ph-col-12 p-0 m-0">
                                    <div className="ph-row p-0 m-0 mb-4">
                                        <div className="ph-picture mx-auto" style= {{'height':'52px','width':'52px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-10 mx-auto mb-3" style= {{'height':'28px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-12 mb-3" style= {{'height':'28px'}}></div>
                                        <div className="ph-col-2 empty mx-0 mb-4" style= {{'height':'16px'}}></div>
                                        <div className="ph-col-8 mx-0 mb-5" style= {{'height':'16px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-4 mb-3 mx-auto" style= {{'height':'16px'}}></div>
                                        <div className="ph-col-10 mx-auto mb-0" style= {{'height':'28px'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="subs-description pb-0">
                        <div className="p-0 ph-item m-0">
                            <div className="ph-col-12 p-0 m-0 mb-2">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <hr className="solid mx-n3"/>
                                <div className ="ph-row p-0 m-0">
                                <div className ="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className ="ph-row mb-0">
                                <div className ="ph-col-12 m-0 mb-0 p-0" style= {{'height':'24px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 py-3">
                        <div className="p-0 ph-item m-0" style={{'background-color': 'unset'}}>
                            <div className="ph-col-12 p-0 m-0">
                                <div className="ph-row justify-content-center p-0 jum-0">
                                    <div className="ph-col-4 mb-0 mr-3 p-0" style={{'height': '35px'}}></div>
                                    <div className="ph-col-4  m-0 p-0" style={{'height': '35px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }

    if(isThankYouLoading){
        return getGhostImage();
    }

    const getSubscriptionDisplayName = () => {
        let displayName = '';
        
        if (validate.isNotEmpty(comboPlan)) {
            displayName = comboPlan.name;
            displayName += " (";
            displayName += getSubscriptionNames();
            displayName += ")";
        }
        else {
            displayName += getSubscriptionNames();
        }
        return displayName;
    }

    const getSubscriptionNames = () => {
        let subscriptionNames = "";
        Object.keys(subscription).map((eachSubsId, index) => {
            subscriptionNames += (validate.isNotEmpty(subscription[eachSubsId].plan) && validate.isNotEmpty(subscription[eachSubsId].plan.displayName)) ? subscription[eachSubsId].plan.displayName : 'NA'
            if (index != Object.keys(subscription).length - 1) {
                subscriptionNames += " + "
            }
        })
        return subscriptionNames;
    }

    const getSubscriptionCode = () => {
        let subsCode = "";
        Object.keys(subscription).map((eachSubsId, index) => {
            subsCode += (validate.isNotEmpty(subscription[eachSubsId].subscriptionCode)) ? subscription[eachSubsId].subscriptionCode : 'NA'
            if (index != Object.keys(subscription).length - 1) {
                subsCode += " / "
            }
        })
        return subsCode;
    }

    const getMemberShipId = () => {
        let memCode = "";
        Object.keys(orderDetails).map((eachSubsId, index) => {
            memCode += (validate.isNotEmpty(orderDetails[eachSubsId].order) && validate.isNotEmpty(orderDetails[eachSubsId].order.subscriptionCode)) ? orderDetails[eachSubsId].order.subscriptionCode : 'NA'
            if (index != Object.keys(orderDetails).length - 1) {
                memCode += ", "
            }
        })
        return memCode;
    }

    const OpenpopoverModel = (targets) => {
        if(cartSummary.totalDisc || cartSummary.additionalRenewalDisc){
            setSelectedTrigger(targets)
        }
    }

    return(
        <React.Fragment>
            {validate.isNotEmpty(selectedTrigger) && <SubscriptionPaymentDetails cartSummary = {cartSummary}  target={selectedTrigger} setSelectedTrigger={setSelectedTrigger} /> }
    {subscription &&  orderDetails &&
            <div className={`subs-thankyou-container  discounted-model ${isUserAvailable?"":" checkout "}`}>
                <div className="thankyou-content thank-you-section">
                {paymentDetails.gatewayStatus === "S" && <div className="thankyou-bg position-relative status-container success my-0" style={{'padding-top': '5.75rem'}}>
                        <span className="icon-circle" style={{'background':'unset','top':'1.5rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.257" height="21.759" viewBox="0 0 33.257 21.759">
                                <path fill="none" stroke="#08ce73" stroke-linecap="round" stroke-linejoin="round" stroke-width="3px" d="M3461.25,769.73l8.881,10.548,20.145-18.141" transform="translate(-3459.137 -760.019)"/>
                            </svg>
                        </span>
                        <h2 className="mb-3 text-center">Thank You!</h2>
                        {validate.isNotEmpty(subscription) && Object.keys(subscription).length > 0 &&
                            <React.Fragment>
                                {!isUpgradeOrder && <p className="mb-3 text-center">You are subscribed to</p>}
                                {isUpgradeOrder && <p className="mb-3 text-center">You are upgraded to</p>}
                                {!isUpgradeOrder && comboPlan && comboPlan.name && <h4 className="font-weight-bolder"> {comboPlan.name}</h4> }
                                <p className="mb-3 h5">{getSubscriptionNames()}</p>
                                <p className="text-center mb-0">Subscription Code</p>
                                    <h4 className="h6">{getSubscriptionCode()}</h4>
                            </React.Fragment>
                            }
                            {validate.isNotEmpty(cartSummary) && validate.isEmpty(cartSummary.primaryFee) && cartSummary.plans.length < 2 && <p className="mb-4 text-center h6">New members has been added to your {validate.isNotEmpty(comboPlan) ? comboPlan.name : cartSummary.plans[0].displayName ? cartSummary.plans[0].displayName : 'NA'} subscription </p>}
                    </div>}
                    {paymentDetails.gatewayStatus === "I" && <React.Fragment>
                        <div className={`thankyou-bg position-relative status-container awaited my-0`} style={{'padding-top': '5.75rem'}}>
                            <span style={{'top':'1.5rem'}}></span>
                            <h2 className="mb-3 text-center">Awaiting Payment</h2>
                                {validate.isNotEmpty(subscription) && Object.keys(subscription).length > 0 && 
                             <React.Fragment>
                                <p className="mb-3 text-center">Your subscription will be confirmed once payment is successful</p>
                                {!isUpgradeOrder && comboPlan && comboPlan.name && <h4 className="font-weight-bolder"> {comboPlan.name}</h4>}
                                <p className="mb-3 h5">{getSubscriptionNames()}</p>
                                <p className="text-center mb-0">Subscription Code</p>
                                <h4 className="h6 mb-0">{getSubscriptionCode()}</h4>
                             </React.Fragment>}
                               {/*  {validate.isNotEmpty(cartSummary)  && validate.isEmpty(cartSummary.primaryFee) && <p className="mb-4 text-center text-white">Adding members to your subscription will be confirmed once payment is successful</p>} */}
                           
                        </div>
                    </React.Fragment>}
                    {validate.isNotEmpty(cartSummary) && !isUpgradeOrder &&
                    <div className="subs-description pb-0 d-flex flex-column justify-content-between">
                        <div className="subscription-plan-price-details">
                            <p className="d-flex justify-content-between">
                                <span>No.of Members</span>
                                <span className="font-weight-bold">{(validate.isNotEmpty(cartSummary) && validate.isNotEmpty(cartSummary.totalMembers)) ? cartSummary.totalMembers : 'NA'}</span>
                            </p>
                            {!comboPlan && validate.isNotEmpty(cartSummary.primaryFee) && parseFloat(cartSummary.primaryFee).toFixed(2) > 0 &&
                            <p className="d-flex justify-content-between">
                                <span>Base Plan Charges <br />
                                <small className="text-secondary">(Primary Member)</small></span>
                                <span className="font-weight-bold">&#x20B9;{parseFloat(cartSummary.primaryFee).toFixed(2) }</span>
                                        </p>}
                                    
                            {comboPlan && validate.isNotEmpty(cartSummary.plans)&& cartSummary.plans.length > 1 && <p className="font-14 mb-2 mt-3 text-secondary">
                                Base Plan Charges (Primary Member)
                            </p> }
                            
                            {comboPlan && validate.isNotEmpty(comboPlan.associatedPlans) && cartSummary.plans.length > 1  && validate.isNotEmpty(cartSummary.plans) &&
                            Object.values(comboPlan.associatedPlans).map((eachPlan) => {
                                return(
                                validate.isNotEmpty(eachPlan.amount) && parseFloat(eachPlan.amount).toFixed(2) > 0 &&
                                <p className="d-flex justify-content-between planpriceinfo">  
                                    <span>{eachPlan.displayName}</span>
                                    <span>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(eachPlan.amount).toFixed(2)}
                                    </span>
                                </p>)
                            }) }
                            {validate.isNotEmpty(cartSummary.addOnFees) && 
                            <p className="font-14 mb-2 mt-3 text-secondary">
                                Additional Member Charges
                            </p>
                            }
                            { validate.isNotEmpty(cartSummary.addOnFees) &&
                             cartSummary.addOnFees.map((eachAddOnFeesDetails)=>{
                                 return (<React.Fragment>
                                    <p className="d-flex justify-content-between planpriceinfo">
                                        <span>Age Group {`${eachAddOnFeesDetails.displayName} (${eachAddOnFeesDetails.noOfMembers})`} </span>
                                        <span className="font-weight-bold"><strong className="rupee">&#x20B9;</strong>{parseFloat(eachAddOnFeesDetails.totalAddOnfee).toFixed(2)}</span>
                                    </p>
                                 </React.Fragment>)})
                            }
                            {validate.isNotEmpty(paymentDetails.paymentMode) && 
                            <p className="d-flex justify-content-between mt-3 mb-0">
                                <span>Payment Type</span>
                                <span className="font-weight-bold">{paymentDetails.paymentMode === 'OFFLINE' ? "Offline" : "Online"}</span>
                            </p>}
                        </div>
                        <div>
                        <hr className="solid mx-n3 border-bottom-0" />
                        { (validate.isNotEmpty(cartSummary.totalMrp)) &&
                            <p className="d-flex justify-content-between mb-2">
                                <span>Total Amount</span>
                                <span className="font-weight-bold">&#x20B9;{parseFloat(cartSummary.totalMrp).toFixed(2)}</span>
                            </p>}        
                            {(validate.isNotEmpty(cartSummary.totalDisc) )  &&
                            <p className="d-flex justify-content-between mb-2 text-success">
                                <span className={validate.isNotEmpty(cartSummary.totalDisc) ? "dashed-dark":""} id="DiscountDetails" onClick={()=> {OpenpopoverModel("DiscountDetails")}}>Base Plan {cartSummary.addOnFees && cartSummary.addOnFees.length != 0 && "& Member(s)"} Discount</span>
                                <span className="font-weight-bold"> - &#x20B9;{parseFloat(cartSummary.totalDisc).toFixed(2)}</span>
                            </p>}
                            {(validate.isNotEmpty(cartSummary.additionalRenewalDisc) && parseFloat(cartSummary.additionalRenewalDisc).toFixed(2) > 0)  &&
                            <p className="d-flex justify-content-between mb-2 text-success">
                                <span className={validate.isNotEmpty(cartSummary.additionalRenewalDisc) ? "dashed-dark":""} id="RenewalDiscount" onClick={()=>{OpenpopoverModel('RenewalDiscount')}}>Renewal Discount Applied</span>
                                <span className="font-weight-bold"> - &#x20B9;{parseFloat(cartSummary.additionalRenewalDisc).toFixed(2)}</span>
                            </p>}
                            {validate.isNotEmpty(cartSummary.totalPrice) &&
                            <p className="d-flex justify-content-between mb-2">
                                <span>{paymentDetails.gatewayStatus === "S"?"Amount paid":"Amount to be paid"}</span>
                                <span className="font-weight-bold">&#x20B9;{parseFloat(cartSummary.totalPrice).toFixed(2) }</span> 
                                        </p>}
                            {(validate.isNotEmpty(cartSummary.totalSavings)) &&
                                <p className="d-flex justify-content-between saving-text font-weight-bold">
                                    <span>Total Savings</span>
                                    <span> &#x20B9;{parseFloat(cartSummary.totalSavings).toFixed(2)}</span>
                                </p>}
                        </div>
                    </div>}
                    {validate.isNotEmpty(cartSummary) && isUpgradeOrder &&
                    <div className="subs-description pb-0 d-flex flex-column justify-content-between">
                        <div className="subscription-plan-price-details">
                            {validate.isNotEmpty(cartSummary) && validate.isNotEmpty(cartSummary.totalMembers) && 
                            <p className="d-flex justify-content-between">
                                <span>No.of Members</span>
                                <span className="font-weight-bold">{cartSummary.totalMembers}</span>
                            </p>}
                            {validate.isNotEmpty(paymentDetails.paymentMode) && 
                            <p className="d-flex justify-content-between mt-3 mb-0">
                                <span>Payment Type</span>
                                <span className="font-weight-bold">{paymentDetails.paymentMode === 'OFFLINE' ? "Offline" : "Online"}</span>
                            </p>}
                        </div>
                        <div>
                        <hr className="solid mx-n3 border-bottom-0" />
                            {validate.isNotEmpty(cartSummary.totalPrice) &&
                            <p className="d-flex justify-content-between mb-2">
                                <span>{paymentDetails.gatewayStatus === "S"?"Amount paid":"Amount to be paid"}</span>
                                <span className="font-weight-bold">&#x20B9;{parseFloat(cartSummary.totalPrice).toFixed(2) }</span> 
                                        </p>}
                        </div>
                    </div>}
                    <div className="d-flex justify-content-center bg-white py-3 w-100 rounded-bottom">
                        {isUserAvailable && <button className="btn px-5 brand-secondary mr-3 rounded-pill custom-btn-lg"  onClick={()=>props.history.push("/myBookings")}>Subscriptions</button>}
                        <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={goToHome}>Continue Shopping</button>
                    </div>
                </div>
            </div>}
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration = {5000} />}
        </React.Fragment>
    );
}
export default SubscriptionThankyou;