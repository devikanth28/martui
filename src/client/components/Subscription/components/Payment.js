import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validate from "../../../helpers/Validate";
import HiddenForm from "../../Checkout/Payments/HiddenForm";
import OnlinePaymentMode from "../../Checkout/Payments/OnlinePaymentMode";
import PaymentGhostImage from "../../Checkout/Payments/PaymentGhostImage";
import Alert from "../../Common/Alert";
import SubscriptionService from "../services/SubscriptionService";
import { SAVE_ORDER_ID } from "../redux/SubscriptionReducer";
import {subscriptionPayNowEvent} from '../../../Analytics/Analytics'
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants";
import LocalDB from "../../../DataBase/LocalDB";
import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

const Payment =(props)=>{
    let retryOrderId = props.match.params.orderId;
    const [isRetryProcess, setIsRetryProcess] = useState(() => Validate().isNotEmpty(retryOrderId));
    const subscriptionService = SubscriptionService();
    const [cartSummary,setCartSummary]=useState(undefined);
    const [paymentOptions, setPaymentOptions] = useState(undefined);
    const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
    const validate = Validate();
    const [showGhostImage, setShowGhostImage] = useState(false);
    const [planDetailsLoader, setPlanDetailsLoader] = useState(false);
    const [formData, setFormData] = useState(null);
    const [selectedTrigger , setSelectedTrigger] = useState();
    const [planInfo, setPlanInfo] = useState({});
    const dispatch= useDispatch();
    const [loaderForPayment, setLoaderForPayment] = useState(undefined);
    const [isAddOnProcess, setIsAddOnProcess] = useState(false);
    const [isUpgradeOrder,setIsUpgradeOrder] = useState(false);

    const customer=useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.userInfo)){
            return state.userInfo;
        }
    })

    const locality = useSelector((state)=>state.locality.selectedLocality);

    useEffect(()=>{
        window.scrollTo(0,0);
        if(props.location.errorData && props.location.errorData.gatewayResponse) {
            setAlertMessage({ message: props.location.errorData.gatewayResponse, type: "danger"});
        }
        if(retryOrderId){
           getRetryCartSummary();
        }else{
            getCartSummary();
        }
    },[]);

    const getCartSummary= ()=>{
        setShowGhostImage(true);
        subscriptionService.getCartSummary({"requestFrom":"WEB"}).then(data => {
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                setPaymentOptions(data.dataObject.paymentModes);
                setCartSummary(data.dataObject.cartSummary);
                setPlanInfo(data.dataObject.planInfo);
                if (validate.isNotEmpty(data.dataObject.cartSummary) && (validate.isEmpty(data.dataObject.cartSummary.primaryFee) || parseFloat(data.dataObject.cartSummary.primaryFee) == 0) )
                    setIsAddOnProcess(true)
            }else{
                if("EMPTY_SUBSCRIPTION_OBJECT" == data.message){
                    setAlertMessage({message:"Session expired",type:"danger"});
                    setTimeout(()=>{
                        props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`);
                    },1000);
                }else{
                    setAlertMessage({ message: "unable to get Cart Summary", type: "danger" });
                }
                
            }
            setShowGhostImage(false);
        }).catch((err)=>{
            console.error(err);
            setShowGhostImage(false);
        });
    }

    const getRetryCartSummary=()=>{
        setShowGhostImage(true);
        subscriptionService.getRetryPaymentOrderSummary({orderId:retryOrderId,"requestFrom":"WEB"}).then(data=>{
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                setPaymentOptions(data.dataObject.paymentModes);
                setIsUpgradeOrder(data.dataObject.isUpgradeOrder);
                setCartSummary(data.dataObject.cartSummary);
                setPlanInfo(data.dataObject.planInfo);
                if (validate.isNotEmpty(data.dataObject.cartSummary) && (validate.isEmpty(data.dataObject.cartSummary.primaryFee) || parseFloat(data.dataObject.cartSummary.primaryFee) == 0))
                    setIsAddOnProcess(true)
            }else{
                    if(data.message === "INVALID_ORDER"){
                        setAlertMessage({message:"We apologize, but we couldn't find any order that matchs your search criteria.",type:"danger"});
                    }else if(data.message === "TRANSACTION_AWAITING"){
                        setAlertMessage({message:"Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.",type:"danger"});
                    }else if(data.message === "TRANSACTION_COMPLETED"){
                        setAlertMessage({message:"We have already confirmed your order and are processing it.",type:"danger"});
                    }else if(data.message === "INVALID_CUSTOMERID"){
                        setAlertMessage({message:"It appears that this order does not belong to you, Please Verify.",type:"danger"});
                    }else{
                        setAlertMessage({ message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                    }
                    setTimeout(() => {
                        props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`);
                    }, 5000);
            }
            setShowGhostImage(false);
        }).catch((err)=>{
            console.error(err);
            setShowGhostImage(false);
        });
    }

    const handlePaymentModeClick = (selectedPaymentMode, paymentType)=>{
        if(selectedPaymentMode && paymentType){
            subscriptionPayNowEvent(selectedPaymentMode)
            setLoaderForPayment(selectedPaymentMode);
            if(retryOrderId){
                createRetryOrder(selectedPaymentMode);
            }else{
                createNormalOrder(selectedPaymentMode);
            }
        }
    }

    const createNormalOrder = (paymentMode)=>{
        let object ={};
        object['paymentMode']=paymentMode;
        subscriptionService.createSubscriptionOrder(object).then((data)=>{
            if ("SUCCESS" == data.statusCode && data.dataObject) {
                let orderIds = data.dataObject.orders.map((each) => {
                   return each.order.orderId;
                })
                dispatch({ type: SAVE_ORDER_ID, data: orderIds });
                handlePaymentSubmitData(data.dataObject.orders[0], paymentMode);
            }else{
                if("EMPTY_SUBSCRIPTION_OBJECT" == data.message){
                    setAlertMessage({message:"Session expired",type:"danger"});
                    setTimeout(()=>{
                        props.history.push("/")
                    },1000);
                }else if("FAILURE" == data.statusCode && "ORDER_CREATION_EXCEPTION" === data.message && validate.isNotEmpty(data.dataObject)){
                    setAlertMessage({ message: data.dataObject[0], type: "danger" });
                    setLoaderForPayment(false);
                }else{
                    setAlertMessage({ message: "unable to create order", type: "danger" });
                    setLoaderForPayment(false);
                }
                
            }
        });
    }

    const createRetryOrder =(paymentMode)=>{
        let object ={};
        object['paymentMode']=paymentMode;
        object['orderId']=retryOrderId;
        subscriptionService.createRetryOrder(object).then((data)=>{
            if ("SUCCESS" == data.statusCode) {
                let orderIds = data.dataObject.orders.map((each) => {
                    return each.order.orderId;
                })
                dispatch({type:SAVE_ORDER_ID,data: orderIds});
                handlePaymentSubmitData(data.dataObject.orders[0], paymentMode);
            }else{
                setAlertMessage({ message: "unable to create order", type: "danger" });
                setLoaderForPayment(false);
            }
        });
        
    }

    const handlePaymentSubmitData=(data, paymentMode)=>{
        var formData = {};
        var inputArray = [];
        var formValues = {
            "formId": "paymentForm",
            "formAction": process.env.API_URL+`subscriptionPaymentRequest`,
            "formMethod": "post",
            "formStyle": { display: 'none' }
        };
        inputArray.push({"name":"tokenId","value":LocalDB.getValue("SESSIONID")});
        inputArray.push({"name":"customerId", value : LocalDB.getValue("customerId")});
        inputArray.push({"name":"instrument","value":paymentMode});
        inputArray.push({"name":"referenceId","value":data.transactionReferenceId});
        inputArray.push({"name":"amount","value":parseFloat(cartSummary.totalPrice).toFixed(2)});
        inputArray.push({"name":"company","value":"optival"});
        inputArray.push({"name":"userId","value":customer.userInfo.medplusId});
        inputArray.push({"name":"mobileNo","value":customer.userContactDetails.shippingContactNumber});
        inputArray.push({"name":"customerId","value":customer.userInfo.medplusId});
        inputArray.push({"name":"customerName","value":customer.userInfo.firstName});
        inputArray.push({"name":"pincode","value":Validate().isNotEmpty(customer.userContactDetails.pincode)?customer.userContactDetails.pincode:locality.pincode});
        inputArray.push({"name":"state","value":Validate().isNotEmpty(customer.userContactDetails.state)?customer.userContactDetails.state:locality.state});
        inputArray.push({"name":"city","value":Validate().isNotEmpty(customer.userContactDetails.city)?customer.userContactDetails.city:locality.city});
        inputArray.push({"name":"country","value":"IND"});
        inputArray.push({"name":"address","value":Validate().isNotEmpty(customer.userContactDetails.addressLine)?customer.userContactDetails.addressLine:"IND"});
        inputArray.push({"name":"channelFrom","value":"WEB"});
        formData = { ...formValues, inputArray: inputArray };
        setFormData(formData)
    }


    const OpenpopoverModel = (targets) => {
        if(cartSummary.totalDisc || cartSummary.additionalRenewalDisc){
            setSelectedTrigger(targets)
        }
    }
    
    const CartSummary =()=>{
        return (
            <React.Fragment>
                {validate.isNotEmpty(cartSummary) && validate.isNotEmpty(planInfo) &&
                    <section className="cart-summary discounted-model">
                        <div className="header">
                            <p>Cart Summary</p>
                        </div>
                        {!isUpgradeOrder && <div>
                        <div className="body">
                            <p>
                                <span>No. Of Members</span>
                                <span>{cartSummary.totalMembers}</span>
                            </p>
                            {planInfo.type.type === "INDIVIDUAL" && validate.isNotEmpty(cartSummary.primaryFee) && parseFloat(cartSummary.primaryFee) > 0 &&
                                <p>
                                    <span>Base Plan Charges <span className='small text-secondary'>(Primary Member)</span></span>
                                    <span>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.primaryFee).toFixed(2)}
                                    </span>
                                </p>}

                                {planInfo.type.type === "INDIVIDUAL_COMBO" && validate.isNotEmpty(cartSummary.plans) && cartSummary.plans.length > 1 &&
                                    <div>
                                        <p className="mt-3">
                                            <span className="text-secondary">Base Plan Charges <span className='small text-secondary'>(Primary Member)</span></span>
                                        </p>
                                        <div>
                                            {cartSummary.plans.map((plan) => {
                                                return (
                                                    validate.isNotEmpty(plan.amount) && parseFloat(plan.amount) > 0 &&
                                                    <p>  <span>{plan.displayName}</span>
                                                        <span>
                                                            <strong className="rupee">&#x20B9;</strong>{parseFloat(plan.amount).toFixed(2)}
                                                        </span>
                                                    </p>)
                                            })}
                                        </div>
                                    </div>
                                }

                            {validate.isNotEmpty(cartSummary.addOnFees) &&
                                <p className="mt-3">
                                    <span className="text-secondary">Additional Member Charges</span>
                                </p>
                            }
                            {validate.isNotEmpty(cartSummary.addOnFees) &&
                                cartSummary.addOnFees.map((eachAddOnFeesDetails) => {
                                    return (<React.Fragment>
                                        <p>
                                            <span>Age Group {`${eachAddOnFeesDetails.displayName} (${eachAddOnFeesDetails.noOfMembers})`} </span>
                                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(eachAddOnFeesDetails.totalAddOnfee).toFixed(2)}</span>
                                        </p>
                                    </React.Fragment>)
                                }
                                )
                            }
                            <hr className="border-bottom-0 mb-2"/>
                            {
                                validate.isNotEmpty(cartSummary.totalMrp) && parseFloat(cartSummary.totalMrp) > 0 &&
                                <p>
                                    <span>Total Amount</span>
                                    <span>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalMrp).toFixed(2)}
                                    </span>
                                </p>}
                            {
                                validate.isNotEmpty(cartSummary.totalDisc) && parseFloat(cartSummary.totalDisc) > 0 &&
                                <p className="text-success">
                                        <span className={validate.isNotEmpty(cartSummary.totalDisc) ? "dashed-dark":""} id="DiscountDetails" onClick={()=> {OpenpopoverModel("DiscountDetails")}}>Base Plan {cartSummary.addOnFees && cartSummary.addOnFees.length != 0 && "& Member(s)"} Discount</span>
                                    <span>
                                        -<strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalDisc).toFixed(2)}
                                    </span>
                                </p>}
                            {cartSummary.additionalRenewalDisc > 0 &&
                                <p className="text-success">
                                    <span className={validate.isNotEmpty(cartSummary.additionalRenewalDisc) ? "dashed-dark":""} id="RenewalDiscount" onClick={()=>{OpenpopoverModel('RenewalDiscount')}}>Renewal Discount Applied</span>
                                    <span>
                                        -<strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.additionalRenewalDisc).toFixed(2)}
                                    </span>
                                </p>}
                        </div>
                        <div className="footer border-top font-lg mb-0 mt-n2">
                            <span>Total Amount to be Paid</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalPrice).toFixed(2)}
                            </span>
                        </div>
                        {cartSummary.totalSavings && <div className="bg-success footer border-top font-lg mb-0">
                            <span>Total Savings</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalSavings).toFixed(2)}
                            </span>
                        </div>}
                    </div>}
                    {isUpgradeOrder && 
                    <div>
                        <div className="body">
                            <p>
                                <span>No. Of Members</span>
                                <span>{cartSummary.totalMembers}</span>
                            </p>
                        </div>
                        <div className="footer border-top font-lg mb-0 mt-n2">
                            <span>Total Amount to be Paid</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalPrice).toFixed(2)}
                            </span>
                        </div>
                       
                    </div>}   
                        
                    </section>
                }
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
        {validate.isNotEmpty(selectedTrigger) &&  <SubscriptionPaymentDetails target={selectedTrigger} setSelectedTrigger={setSelectedTrigger} cartSummary={cartSummary}/> }
        <main role="main" className="container">
            <div className="row">
            {(showGhostImage || planDetailsLoader) && 
                <PaymentGhostImage paymentLoader={showGhostImage} orderReviewLoader={showGhostImage} planDetailsLoader={planDetailsLoader}/>}
            {/* payments left panel */}
            {validate.isNotEmpty(paymentOptions) && validate.isNotEmpty(planInfo) &&
                <div className="col-8 pl-0 pr-2">

                    {planInfo.type.type === "INDIVIDUAL" && validate.isNotEmpty(cartSummary) && 
                    <section>
                        <div className="header">
                            <h6 className="mb-0 py-2">Plan Details</h6>
                        </div>
                        <ul className="product-listview list-group list-group-flush test-items">
                                        <li className="list-group-item">
                                <div className="each-test">
                                        <h6 className="font-14 font-weight-normal mb-0 py-2">{planInfo.displayName}</h6>
                                                {!isAddOnProcess &&<>
                                                    {/* <p class="mb-0 mt-3"><small>Primary Member Amount</small></p> */}
                                                    {/* {cartSummary && cartSummary.plans && cartSummary.plans.map((each) => {
                                                        return (
                                                    <p class="mb-0">
                                            <small>Price</small>&nbsp;
                                                    { parseFloat(each.amount) > 0 &&
                                                <>
                                                    <React.Fragment>
                                                        <small><strong className="rupee">₹</strong></small>
                                                        <del className="text-secondary small mr-2">{parseFloat(each.amount).toFixed(2)}</del>
                                                    </React.Fragment>
                                                </>
                                            }
                                            {parseFloat(each.price) > 0 &&
                                                <span>
                                                    <span className="rupee">₹</span>
                                                                <span className="font-weight-bold">{parseFloat(each.price).toFixed(2)}</span><small> / {each.tenureDisplay  ?each.tenureDisplay:"Year"}</small>
                                                </span>
                                            }
                                        </p>
                                                            
                                                        )
                                                    })} */} 
                                        {!isRetryProcess && <button className="action btn btn-outline-danger rounded-pill test-action" type="button" role="button" onClick={() => { props.history.replace({ pathname: `${MEDPLUS_ADVANTAGE_URL_PREFIX}` }); }}>
                                            <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                                <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                                    <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                                    <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                        <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                        <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                        <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                        <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                            Remove
                                        </button>}</>}
                                </div>
                            </li>
                        </ul>
                    </section>}
                    {planInfo.type.type === "INDIVIDUAL_COMBO" &&  validate.isNotEmpty(cartSummary) && 
                        <section>
                        <div className="header combo-plan-name">
                            <h6 className="mb-0">{planInfo.displayName}</h6>
                            { !isAddOnProcess && <div>
                                {!isRetryProcess && <button className="btn btn-outline-danger rounded-pill combo-plan-remove" type="button" role="button" onClick={() => { props.history.replace({ pathname: `${MEDPLUS_ADVANTAGE_URL_PREFIX}` }); }}>
                                    <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                        <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                            <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                            <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Remove
                                </button>}
                            </div> }
                                    </div>
                                    <ul className="product-listview list-group list-group-flush test-items">
                            {/* <p class="px-3 py-2 mb-2 small text-secondary">Primary Member Amount(s)</p> */}
                            {validate.isNotEmpty(cartSummary.plans) && cartSummary.plans.map((plan)=>{
                                return(
                                    <React.Fragment>
                                        <li className="list-group-item">
                                            <div className="each-test">
                                                <h6 className="font-14 font-weight-normal mb-0">{plan.displayName}</h6>
                                                {/* <p class="mb-0">
                                                    <small>Price</small>&nbsp;
                                                    {parseFloat(plan.amount) > 0 && <React.Fragment>
                                                        <small><strong className="rupee">₹</strong></small>
                                                        <del className="text-secondary small mr-2">{parseFloat(plan.amount).toFixed(2)}</del>
                                                    </React.Fragment>
                                                    }
                                                    {parseFloat(plan.price) > 0 && <span>
                                                        <span className="rupee">₹</span>
                                                        <span className="font-weight-bold">{parseFloat(plan.price).toFixed(2)}</span><small> / {plan.tenureDisplay}</small>
                                                    </span>}
                                                </p> */}
                                            </div>
                                        </li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </section>}




                    <section>
                        <div className="header">
                            <p>Payment Options</p>
                        </div>
                        <div className="payment-options pt-2">
                            
                       {/*  <p className="px-3">By placing the order you are agreeing to show the doctor's prescription at the time of delivery</p> */}
                        <ul>
                        {Object.keys(paymentOptions).map((key)=>{
                            return(
                            <OnlinePaymentMode mode={paymentOptions[key]} onPaymentSelect={handlePaymentModeClick} createOrderLoader={loaderForPayment}/>
                            )
                            })}
                        </ul>
                        </div>
                    </section>
                </div>
            }
            {/* payments left panel over */}
            <div className="col-4 pl-2 pr-0">
                {cartSummary && CartSummary()}
            </div>
            </div>
            {/* <CheckoutInfoNote/> */}
         </main>
         {formData && <HiddenForm formData={formData} />}
         { alertMessage && alertMessage.message && <Alert alertInfo={alertMessage} duration='5000' onDurationEnd={setAlertMessage}/>}
     </React.Fragment>
    )
}

export default Payment;

export const SubscriptionPaymentDetails =(props) =>{
    const validate = Validate()
    const rest = props.rest
    const [isOpen , setIsOpen] = useState(true)
    const cartSummary = props.cartSummary
    return (
        <React.Fragment>
            {validate.isNotEmpty(props.target) && <div key={props.target}>
                <UncontrolledPopover
                    placement="top"
                    isOpen={isOpen}
                    target={props.target}
                    trigger="click"
                    toggle={(e) => {setIsOpen(!isOpen)} }
                    popperClassName="coupon-popover shadow">
                    <PopoverHeader>
                        {props.target =='RenewalDiscount' ? <span>Offers Applied for Renewal</span> : <span>Offers Applied</span> }
                    </PopoverHeader>
                    {props.target != 'RenewalDiscount' && <PopoverBody>
                        
                        {validate.isNotEmpty(cartSummary.plans) && cartSummary.plans.length > 1  ? <React.Fragment>
                            {(validate.isNotEmpty(cartSummary.pharmaPrimaryMemFeeDto) || validate.isNotEmpty(cartSummary.healthCarePrimaryMemFeeDto)) && <div>
                                <p className='mb-1 font10 text-secondary'>Base Plan Details</p>
                                {validate.isNotEmpty(cartSummary.pharmaPrimaryMemFeeDto) && <div className="popover-discount-element">
                                    <p className="mb-0">{cartSummary.pharmaPrimaryMemFeeDto.displayName}</p>
                                    <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{cartSummary.pharmaPrimaryMemFeeDto.totalDisc}</p>
                                </div>}

                                {validate.isNotEmpty(cartSummary.healthCarePrimaryMemFeeDto) && <div className='popover-discount-element'>
                                    <p className='mb-0'>{cartSummary.healthCarePrimaryMemFeeDto.displayName}</p>
                                    <p className='mb-0 text-success ml-2'>- <small>&#x20B9;</small>{cartSummary.healthCarePrimaryMemFeeDto.totalDisc}</p>
                                </div>}

                            </div>
                            }

                        </React.Fragment> : <React.Fragment>

                        {validate.isNotEmpty(cartSummary.pharmaPrimaryMemFeeDto) && <div className="popover-discount-element">
                                    <p className="mb-0">Base Plan Discount</p>
                                    <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{cartSummary.pharmaPrimaryMemFeeDto.totalDisc}</p>
                        </div>}

                        {validate.isNotEmpty(cartSummary.healthCarePrimaryMemFeeDto) && <div className="popover-discount-element">
                                    <p className="mb-0">Base Plan Discount</p>
                                    <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{cartSummary.healthCarePrimaryMemFeeDto.totalDisc}</p>
                        </div>}



                        </React.Fragment> }

                        
                        {validate.isNotEmpty(cartSummary.addOnFees) && <div className={cartSummary.addOnFees.length > 1  ?'mt-3' : 'mt-1'}>                           
                            {cartSummary.addOnFees.length > 1 && <p className='mb-1 font10 text-secondary'>Additional Member Details</p>}
                            <React.Fragment>
                                {cartSummary.addOnFees.map((value) =>{return (<div className="popover-discount-element">
                                    <p className="mb-0">Age Group {value.displayName} ({value.noOfMembers})</p>
                                    <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{value.totalDisc}</p>
                                </div>)})}
                            </React.Fragment>
                            </div>
                        }
                        
                    </PopoverBody>}
                    {props.target == 'RenewalDiscount' && <PopoverBody>
                        {validate.isNotEmpty(cartSummary.plans) && cartSummary.plans.length > 1 ? <React.Fragment>

                            {validate.isNotEmpty(cartSummary.pharmaPrimaryMemFeeDto) && <div className="popover-discount-element">
                                <p className="mb-0">{cartSummary.pharmaPrimaryMemFeeDto.displayName}</p>
                                <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{cartSummary.pharmaPrimaryMemFeeDto.totalRenewalDisc}</p>
                            </div>}

                            {validate.isNotEmpty(cartSummary.healthCarePrimaryMemFeeDto) && <div className='popover-discount-element'>
                                <p className='mb-0'>{cartSummary.healthCarePrimaryMemFeeDto.displayName}</p>
                                <p className='mb-0 text-success ml-2'>- <small>&#x20B9;</small>{cartSummary.healthCarePrimaryMemFeeDto.totalRenewalDisc}</p>
                            </div>}



                        </React.Fragment> : <React.Fragment>

                            {validate.isNotEmpty(cartSummary.pharmaPrimaryMemFeeDto) && <div className="popover-discount-element">
                                <p className="mb-0">Base Plan Discount</p>
                                <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{cartSummary.pharmaPrimaryMemFeeDto.totalRenewalDisc}</p>
                            </div>}

                            {validate.isNotEmpty(cartSummary.healthCarePrimaryMemFeeDto) && <div className='popover-discount-element'>
                                <p className='mb-0'>Base Plan Discount</p>
                                <p className='mb-0 text-success ml-2'> - <small>&#x20B9;</small>{cartSummary.healthCarePrimaryMemFeeDto.totalRenewalDisc}</p>

                            </div>}

                        </React.Fragment>}
                        
                        {validate.isNotEmpty(cartSummary.addOnFees) &&
                            <div className={cartSummary.addOnFees.length > 1 ? 'mt-3' : "mt-1"}>
                                {cartSummary.addOnFees.length > 1 && <p className='mb-1 font10 text-secondary'>Additional Member Details</p>}
                            <React.Fragment>
                               {cartSummary.addOnFees.map((value) => {return (
                                <div className="popover-discount-element">
                                <p className="mb-0">Age Group {value.displayName} ({value.noOfMembers})</p>
                                <p className="mb-0 text-success ml-2"> - <small>&#x20B9;</small>{value.totalRenewalDisc}</p>
                            </div>
                               ) })}
                            </React.Fragment></div>}

                    </PopoverBody>}
                </UncontrolledPopover>

            </div>}
        </React.Fragment>
    )
}