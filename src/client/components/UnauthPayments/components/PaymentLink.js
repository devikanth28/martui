import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CartAction from "../../../../redux/action/CartAction";
import CheckoutAction from "../../../../redux/action/CheckoutAction";
import LabOrderAction from "../../../../redux/action/LabOrderAction";
import { getSelectedLocality } from "../../../../redux/action/LocalityAction";
import UserInfoAction from "../../../../redux/action/UserInfoAction";
import LocalDB from "../../../DataBase/LocalDB";
import DoctorsCartSummary from '../../../DoctorConsultation/components/common/DoctorsCartSummary';
import DoctorReview from "../../../DoctorConsultation/components/moduleComponents/Checkout/DoctorReview";
import { prepareCartSummaryObjFromDoctorConsultation } from "../../../DoctorConsultation/helper/DoctorConsulationHelper";
import { LAST_DOCTOR_ORDER_ID } from "../../../DoctorConsultation/redux/DoctorConsultationReducer";
import DoctorCheckoutService from "../../../DoctorConsultation/services/DoctorCheckoutService";
import CONFIG from '../../../constants/ServerConfig';
import { preparePaymentFormData } from '../../../helpers/PaymentHelper';
import Validate from "../../../helpers/Validate";
import NoDataFound from "../../../images/common/No-data-pana.svg";
import CheckoutService from "../../../services/CheckoutService";
import PaymentService from "../../../services/PaymentService";
import DeliveryAddressDetail from "../../Checkout/OrderReview/DeliveryAddressDetail";
import ReviewCartSummary from '../../Checkout/OrderReview/ReviewCartSummary';
import HiddenForm from '../../Checkout/Payments/HiddenForm';
import Alert from "../../Common/Alert";
import LabCheckOutService from "../../MedplusLabs/Services/LabCheckoutService";
import LabCartSummary from '../../MedplusLabs/components/Common/LabCartSummary';
import { CollectionDetails } from '../../MedplusLabs/components/labCheckoutNew/LabPayment';
import { DIAGNOSTICS_URL_PREFIX } from "../../MedplusLabs/constants/LabConstants";
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../../Subscription/constants/SubscriptionConstants";
import { SAVE_ORDER_ID } from "../../Subscription/redux/SubscriptionReducer";
import SubscriptionService from "../../Subscription/services/SubscriptionService";
import CommonPaymentModes from "./CommonPaymentModes";
import PaymentPlaceholders from "./PaymentPlaceholders";
import SubscriptionCartSummary from './SubscriptionCartSummary';
import UaPaymentFailed from "./UaPaymentFailed";

const PaymentLink = (props) => {
    const [loading, setLoading] = useState(true);
    const validate = Validate();
    const referenceId = props.match.params?.referenceId;
    const [retryOrderId, setRetryOrderId] = useState(undefined);
    const [orderDetails, setOrderDetails] = useState(undefined);
    const [cartSummary, setCartSummary] = useState(undefined);
    const [orderType, setOrderType] = useState(undefined);
    const [paymentModes, setPaymentModes] = useState(undefined);
    const unauthService = PaymentService();
    const [orderSummary, setOrderSummary] = useState(undefined);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [formData, setFormData] = useState(undefined);
    const dispatch= useDispatch();
    const [modeId,setModeId] = useState(undefined);
    const [toastInfo,setToastInfo] = useState({ message: "", type: "", timeout:"3500"});
    const selectedLocality = getSelectedLocality();
    const [displayMessage,setDisplayMessage] = useState(undefined);
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    const checkoutAction = CheckoutAction();
    const labOrderAction = LabOrderAction();

    useEffect(() => {
        getOrderDetails();
    }, [])

    const getToastMessage = (message) => {
        switch (message) {
            case "INVALID_ORDER":
                return "We apologize, but we couldn't find any order that matchs your search criteria."
            case "TRANSACTION_AWAITING":
                return "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.";
            case "TRANSACTION_COMPLETED":
                return "We have already confirmed your order and are processing it.";
            case "INVALID_CUSTOMERID":
                return "It appears that this order does not belong to you, Please Verify.";
            case "UNABLE_TO_GET_RETRY_PAYMENT_DETAILS":
                return "We apologize, we're currently unable to fetch the details for the payment retry."
            case "Slot Expired":
                return "We apologize to inform you that the time slot you have selected has expired."
            case "NO DOCTOR CONSULTATION FOUND":
                return "We could not find any doctor consultation."
            case "ALREADY IN AWAITING STATUS": 
                return "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes."
            case "TRANSACTION ALREADY HAPPENED":
                return "We have already processed your transaction. You can check your order in Purchase History."
            case "NO PENDING ORDERS":
                return "There are no pending orders at this moment."
            case "INSUFFICIENT ORDER TOTAL":
                return "The order total is insufficient. Please review and adjust accordingly."
            case "Something Went Wrong, Please try again.":
                return "We apologize, but something has gone wrong. Please try again."
            case "No data found":
                return "We could not find any data that matches your search criteria."
            case "No order found":
                return "We apologize, but we couldn't find any order that matchs your search criteria."
            case "SOMETHING_WENT_WRONG":
                return "We apologize, but something has gone wrong. Please try again."
            default:
                return message ? message : "We apologize, but we are currently unable to process your request. Please try again later.";
        }
    }

    const removeUserSession = () => {
        Cookies.remove("customerId", { path: '/' });
        Cookies.remove("tokenId", { path: '/' });
        userInfoAction.resetUserInfo();
        cartAction.clearComplimentaryCartItem();
        cartAction.clearShoppingCart();
        checkoutAction.resetCheckoutDetails();
        labOrderAction.clearLabOrders();
        Cookies.remove("getNotifyLocationConfirmed");
        Cookies.remove("b_token");
        Cookies.remove("s_token");
        if (typeof window !== 'undefined') {
            LocalDB.removeValue("SESSIONID");
            LocalDB.removeValue("b_token");
            LocalDB.removeValue("s_token");
            LocalDB.removeValue("MOBILE_NUMBER");
            LocalDB.removeValue("customerId");
            LocalDB.removeValue("subscriptionCustomer");
            LocalDB.removeValue("corporateCustomerLogin");
            LocalDB.removeValue("RECENTLY_VIEWED_PRODUCT");
            LocalDB.removeValue("recentlyViewedProductIds");
            LocalDB.removeValue("fireBaseToken");
        }

    }


    const getOrderDetails = () => {
        if(validate.isEmpty(referenceId)) {
            return;
        }
        unauthService.getPaymentOrderDetails({ referenceId }).then(orderDetailsResponse => {
            if (validate.isNotEmpty(orderDetailsResponse) && validate.isNotEmpty(orderDetailsResponse.dataObject) && "SUCCESS" == orderDetailsResponse.statusCode) {
                let dataObject = {};
                let type = orderDetailsResponse.dataObject?.orderType;
                if (orderDetailsResponse.dataObject['response']) {
                    dataObject = JSON.parse(orderDetailsResponse.dataObject['response']);
                }
                if (orderDetailsResponse.dataObject?.tokenId) {
                    removeUserSession();
                    LocalDB.setValue("SESSIONID", orderDetailsResponse.dataObject?.tokenId);
                }
                setOrderDetails(dataObject);
                setOrderType(orderDetailsResponse.dataObject?.orderType);
                setRetryOrderId(orderDetailsResponse.dataObject?.orderId);
                prepareDataByType(dataObject, type, orderDetailsResponse.dataObject);
            }else if (validate.isNotEmpty(orderDetailsResponse) && validate.isNotEmpty(orderDetailsResponse.message) && "FAILURE" == orderDetailsResponse.statusCode){
                if(validate.isNotEmpty(orderDetailsResponse.dataObject)){
                    setOrderType(orderDetailsResponse.dataObject?.orderType);
                }
                setDisplayMessage(getToastMessage(orderDetailsResponse.message));
            } else if ("WARNING" === orderDetailsResponse?.statusCode && validate.isNotEmpty(orderDetailsResponse?.dataObject)) {
                sendToRetryLink(orderDetailsResponse.dataObject.orderId, orderDetailsResponse.dataObject.orderType);
                return;
            }
            setLoading(false);
        }).catch(error=>{
            setLoading(false);
            console.log(error)
        })
    }

    const sendToRetryLink = (orderId, orderType) => {
        let url = "";
        switch(orderType) {
            case "M":
                url = '/retryPayment';
                break;
            case "L":
                url = `${DIAGNOSTICS_URL_PREFIX}/labOrderRetryPayment`;
                break;
            case "D":
                url = "/retryDoctorConsultationPayment";
                break;
            case "MA":
                url = `${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionRetryPayment`;
                break;
        }
        if(validate.isNotEmpty(url)) {
            window.location.replace(`${url}/${orderId}`);
        }
    }

    const preparePaymentModesMap = (paymentModesList) => {
        const payment = {}
        paymentModesList.map(eachMode => {
            let modeId = eachMode['modeId'];
            return payment[modeId] = eachMode;
        })
        return payment;
    }

    const prepareDataByType = (dataObject, orderType, response) => {
        switch (orderType) {
            case "M":
                setCartSummary(dataObject?.cartSummary);
                setPaymentModes(dataObject?.paymentModes);
                setRetryOrderId(dataObject?.orderList[0]?.cartId);
                break;
            case "L":
                setOrderSummary(dataObject?.orderSummary);
                setCartSummary(dataObject?.orderSummary?.cartSummary);
                setPaymentModes(preparePaymentModesMap(dataObject?.paymentDetails?.onlineModes));
                break;
            case "D":
                setCartSummary(prepareCartSummaryObjFromDoctorConsultation(dataObject.DOCTOR_CONSULTATION));
                setRetryOrderId(dataObject.DOCTOR_CONSULTATION?.cartId);
                setPaymentModes(preparePaymentModesMap(JSON.parse(response?.paymentModes)));
                break;
            case "MA":
                setCartSummary(dataObject?.cartSummary);
                setPaymentModes(dataObject?.paymentModes);
                break;
            default:
                return
        }
    }

    const getOrderBasedCartSummary = () => {
        switch (orderType) {
            case "M":
                return <React.Fragment>
                    <ReviewCartSummary orderReviewDetails = {{orderList : orderDetails.orderList,pickStoreDetails : orderDetails.pickStoreDetails, cartSummary : orderDetails.cartSummary}}/>
                    {orderDetails && orderDetails.orderList &&
                            <DeliveryAddressDetail orderDetails={orderDetails.orderList[0]} pickStoreDetails={orderDetails.pickStoreDetails} freeShippingAmount={orderDetails.freeShippingAmount}></DeliveryAddressDetail>
                    }
                </React.Fragment>
            case "L":
                return <React.Fragment>
                    <LabCartSummary couponCode={orderSummary?.couponApplied} {...cartSummary} />
                    {validate.isNotEmpty(orderSummary) &&
                        <CollectionDetails
                            patientAddress={orderSummary.homeAddress}
                            storeAddress={orderSummary.labAddress}
                            reportDeliveryType={orderSummary.reportDeliveryData.deliveryType}
                            reportDeliveryAddress={orderSummary.reportDeliveryData.address}
                            timeSlot={orderSummary.walkInLabOrderItems && orderSummary.walkInLabOrderItems[0].labOrderItemSlot ? orderSummary.walkInLabOrderItems[0].labOrderItemSlot : orderSummary.homeLabOrderItems[0].labOrderItemSlot} />}
                </React.Fragment>
            case "D":
                return <React.Fragment>
                    <DoctorsCartSummary cartSummaryObj={cartSummary} />
                </React.Fragment>
            case "MA":
                return <SubscriptionCartSummary cartSummary={cartSummary} planType={orderDetails?.planInfo?.type['type']} isUpgradeOrder={orderDetails?.isUpgradeOrder} />
            default:
                return
        }
    }


    const getPaymentRedirectionUrl = (orderType) => {
        switch (orderType) {
            case "M":
                return CONFIG.API.CHECKOUT.REQUEST_PAYMENT.PATH;
            case "L":
                return CONFIG.API.LAB_CHECKOUT.REQUEST_PAYMENT.PATH
            case "D":
                return process.env.API_URL + `doctorconsultationRequestPayment`
            case "MA":
                return process.env.API_URL + `subscriptionPaymentRequest`
            default:
                return
        }
    }

    const handlePaymentRequest=(modeId,paymentType)=>{
        setPaymentLoading(true);
        switch (orderType) {
            case "M":
                CheckoutService().omsOrderCreationProcess({MODE:modeId},retryOrderId).then((response)=>{
                    if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                        prepareAndRedirectToPayment(response.dataObject);
                    }else{
                        setDisplayMessage(response?.message?response.message:"Something Went Wrong!");
                    }
                },(err)=>{
                    console.log(err);
                    setPaymentLoading(false);
                    setToastInfo({message:"Something Went Wrong!", type: "", duration:"10000"});
                });
                break;
            case "L":
                LabCheckOutService().submitLabRetryOrder({paymentType:paymentType}).then((response)=>{
                    if(validate.isNotEmpty(response) && validate.isNotEmpty(response.responseData) && "SUCCESS"==response.statusCode){
                        prepareAndRedirectToPayment({paymentMode:modeId, finalAmount:response.responseData?.amount, cartId:response.responseData?.referenceId},response.responseData?.userDetails);
                    }else{
                        setDisplayMessage(response?.message?response.message:"Something Went Wrong!");
                    }
                }).catch(err=>{
                    console.log(err);
                    setPaymentLoading(false);
                    setToastInfo({message:"Something Went Wrong!", type: "", duration:"10000"});
                })
                break;
            case "D":
                if(orderDetails?.DOCTOR_CONSULTATION?.gateWayStatus=="C"){
                    DoctorCheckoutService().createBookingForConsultation({paymentType: paymentType, initiatePayment: true}).then(data => {
                        if ("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                            dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
                            dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
                            prepareAndRedirectToPayment({paymentMode: modeId,finalAmount: data.dataObject?.grandTotal, cartId: data.dataObject?.cartId},{fullName:data.dataObject?.patientInfo?.patientName, mobileNumber: data.dataObject?.patientInfo?.mobile, customerID: data.dataObject?.customerId});
                        }else{
                            setDisplayMessage(data?.message?data.message:"Something Went Wrong!");
                        }
                    }).catch(err=>{
                        console.log(err);
                        setPaymentLoading(false);
                        setToastInfo({ message: "Something Went Wrong!", type: "" , duration:"10000"});
                    });
                }else if(orderDetails?.DOCTOR_CONSULTATION?.gateWayStatus=="F"){
                    DoctorCheckoutService().retryPaymentForConsultation({paymentType: paymentType, "cartId" : retryOrderId}).then(data => {
                        if ("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                            dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
                            dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
                            prepareAndRedirectToPayment({paymentMode: modeId,finalAmount: data.dataObject?.grandTotal, cartId: data.dataObject?.cartId},{fullName:data.dataObject?.patientInfo?.patientName, mobileNumber: data.dataObject?.patientInfo?.mobile, customerID: data.dataObject?.customerId});
                        }else{
                            setDisplayMessage(data?.message?data.message:"Something Went Wrong!");
                        }
                    }).catch(err=>{
                        console.log(err);
                        setPaymentLoading(false);
                        setToastInfo({ message: "Something Went Wrong!", type: "" , duration:"10000"});
                    });
                }
                break;
            case "MA":
                let object = {};
                object['paymentMode'] = modeId;
                object['orderId'] = retryOrderId;
                SubscriptionService().createRetryOrder(object).then((data) => {
                    if ("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                        let orderIds = data.dataObject.orders.map((each) => {
                            return each.order.orderId;
                        })
                        dispatch({type:SAVE_ORDER_ID,data: orderIds});
                        prepareAndRedirectToPayment({paymentMode: modeId,finalAmount: data.dataObject?.cartSummary?.totalPrice, cartId: data.dataObject.orders[0].transactionReferenceId},{fullName:"Rohith mudiraj", mobileNumber: data.dataObject?.orders[0]?.order.mobileNo, customerID: data.dataObject?.orders[0]?.order.customerId});
                    } else {
                        setDisplayMessage(data?.message?data.message:"Something Went Wrong!");
                    }
                }).catch(error=>{
                    console.log(error);
                    setPaymentLoading(false);
                    setToastInfo({ message: "Something Went Wrong!", type: "" , duration:"10000"});
                });
                break;
            default:
                return
        }
    }


    const prepareAndRedirectToPayment = (response,userDetails) => {
        const data = {};
        data['totalAmount'] = response.finalAmount;
        data['retryOrderId'] = response.cartId;
        data['paymentMode'] = response.paymentMode;
        data['state'] = selectedLocality?.state;
        data['city'] = selectedLocality?.city;
        data['pincode'] = selectedLocality?.pincode;
        data['combination'] = selectedLocality?.combination;
        if(validate.isNotEmpty(userDetails)){
            data['name'] = validate.isNotEmpty(userDetails.fullName)?userDetails.fullName:`${userDetails.firstName} ${userDetails.lastName}`
            data['mobileNo'] = userDetails.mobileNumber
            data['customerId'] = userDetails.customerID
        }
        setFormData(preparePaymentFormData(data, getPaymentRedirectionUrl(orderType)))
    }

    if (formData) {
        return <div>{formData && <HiddenForm formData={formData} />}</div>
    }

    if(validate.isEmpty(referenceId)) {
        return <React.Fragment />
    }

    return (
        <div>
            {loading && <div className="row"> <PaymentPlaceholders paymentLoader={loading} orderReviewLoader={loading} /></div>}
            {!loading && (validate.isNotEmpty(displayMessage) ? <UaPaymentFailed message={displayMessage} orderType={orderType} location={props.location} history={props.history} /> : <div>
                <Alert className="toast-container b-m" alertInfo={toastInfo} onDurationEnd={setToastInfo} duration={toastInfo.timeout}/>
                {validate.isEmpty(orderDetails) ? <section className={"body-height d-flex align-items-center justify-content-center"}>
                    <div className="text-center m-3">
                        <img src={NoDataFound} alt="No Data Found" className="mb-2" height="150" />
                        <p className="mb-0 font-14 text-secondary">{"No Order Details Found...!"}</p>
                    </div>
                </section> :
                    <div className='container-lg container-fluid'>
                        <div className='row px-sm-3'>
                            <div className='col-lg-8 col-12 pr-lg-0'>
                                {validate.isNotEmpty(cartSummary) &&  validate.isNotEmpty(orderDetails.planInfo) && orderType == "MA" && <section>
                                   {orderDetails.planInfo?.type?.type !== "INDIVIDUAL_COMBO" && <div className="header mb-0">
                                        <h6 className="mb-0 py-2">Plan Details</h6>
                                    </div>}
                                    <div className={`${orderDetails.planInfo?.type?.type == "INDIVIDUAL_COMBO"?' header ':'p-3'} combo-plan-name`}>
                                        <h6 className="mb-0 font-14">{orderDetails.planInfo?.displayName}</h6>
                                    </div>
                                    {orderDetails.planInfo?.type?.type === "INDIVIDUAL_COMBO" && <ul className="product-listview list-group list-group-flush test-items">{cartSummary?.plans?.map((eachPlan, index) => {
                                        return <li className={`list-group-item`}>
                                            <div className="each-test">
                                                <h6 className="font-14 font-weight-normal mb-0 py-2">{eachPlan.displayName}</h6>
                                            </div>
                                        </li>
                                    })}
                                    </ul>}
                                </section>}
                                {orderType=="D" && <DoctorReview patientDetails={orderDetails.DOCTOR_CONSULTATION?.patientInfo} doctorDetails={orderDetails.DOCTOR_CONSULTATION?.doctorServiceInfo} consultationDetails={orderDetails.DOCTOR_CONSULTATION?.consultationInfo}  walkIn = {orderDetails.DOCTOR_CONSULTATION.consultationInfo.consultationType=="WALKIN"} {...props} />}
                                <CommonPaymentModes paymentLoading={paymentLoading} paymentModes={paymentModes} handleClickOnPay={(modeId, paymentType) => { handlePaymentRequest(modeId, paymentType) }} selectedModeId = {modeId} setModeId = {setModeId}  />
                            </div>
                            <div className='col-lg-4 col-12'>
                                {validate.isNotEmpty(cartSummary) && getOrderBasedCartSummary()}
                            </div>
                        </div>
                    </div>}
            </div>)}
            {!loading && validate.isNotEmpty(orderDetails) && <div className="payment-footer"><footer className="footer fixed-bottom mt-auto py-2 d-flex justify-content-end">
                <div className="row align-items-center no-gutters">
                    <div className="col-12">
                        <button style={{width: 184}} role="button" className="btn btn-brand-gradient rounded-pill px-5 mr-3 custom-btn-lg" onClick={() => handlePaymentRequest(modeId, "O")} disabled={validate.isEmpty(modeId)}>{paymentLoading?<span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>:'Continue To Pay'}</button>
                    </div>
                </div>
            </footer></div>}

        </div>
    )
}
export default PaymentLink;