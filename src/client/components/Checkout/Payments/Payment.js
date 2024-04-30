import React, { useState, useEffect } from 'react';
import OnlinePaymentMode from './OnlinePaymentMode';
import MwalletMode from './MwalletMode';
import CODMode from './CODMode';
import AppliedPaymentOffer from './AppliedPaymentOffer';
import CheckoutService from '../../../services/CheckoutService';
import PaymentGhostImage from './PaymentGhostImage';
import CONFIG from '../../../constants/ServerConfig';
import HiddenForm from './HiddenForm';
import { useDispatch } from 'react-redux';
import ReviewCartSummary from '../OrderReview/ReviewCartSummary'
import DeliveryAddressDetail from '../OrderReview/DeliveryAddressDetail';
import Alert from '../../Common/Alert';
import { Modal, ModalBody} from 'reactstrap';
import { checkoutStepsToAnalytics, PaybackPaymentBackEvent, sendRetryPaymentEvent } from '../../../Analytics/Analytics';
import NetBankingMode from './NetBankingMode';
import { IS_PAYBACK_ORDER, SET_CART_ID, UPDATE_MWALLET_ORDER_DETAILS } from '../../../../redux/reducer/CheckoutReducer';
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import { PaybackPaymentAddMoreEvent , PaybackSelectedPaymentEvent } from '../../../Analytics/Analytics';
import Cookies from "js-cookie";
import LocalDB from '../../../DataBase/LocalDB';

const retryPaymentStatusMessages = {
    "PAYMENT_RECEIVED_ALREADY": "We have already confirmed your order and are processing it.",
    "PAYMENT_CONFIRMATION_AWAITING": "Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes. "
}

const Payment = (props)=>{

    const checkoutService = CheckoutService();
    const dispatch = useDispatch();

    const [paymentLoader, setPaymentLoader] = useState(false);
    const [orderReviewLoader, setOrderReviewLoader] = useState(false);
    // const [tncAccepted, setTncAccepted] = useState(false);
    const [formData, setFormData] = useState(null);
    const [paymentConfigData, setPaymentConfigData] = useState(null);
    const [captchaData, setCaptchaData] = useState(null);
    const [orderReviewDetails, setOrderReviewDetails] = useState(null);
    const [captchaCode, setCaptchaCode] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [loaderForCodOrder, setLoaderForCodOrder] = useState(false);
    const [loaderForOnlineOrder, setLoaderForOnlineOrder] = useState(false);
    const [loaderForWalletOrder, setLoaderForWalletOrder] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isEditOrderLoader, setEditOrderLoader] = useState(false);
    const [promotionBanners, setPromotionBanners] = useState(null);
    const [showNetBanking, setShowNetBanking] = useState(false);
    const [totalPayble, setTotalPayble] = useState(0);
    const [isPayback, setIsPayback] = useState(props.isPayback);
    const validate = Validate();
    const showCancelModal = props?.location?.state?.showEditOrderModal ? props.location.state.showEditOrderModal : false;
    const retryOrderId = props.match.params.retryOrderId;
    const isPaybackNormalOrder = (isPayback && !retryOrderId);
   
    // var proceedEditOrder = false;
    useEffect(() => {
        if(retryOrderId){
            if(props.location.errorMsg){
                setAlertInfo({message: props.location.errorMsg, type: ""});
            }
            getPaymentPageSummary(retryOrderId);
        }else{
            if(isPayback){
                getPaybackPaymentConfig();
            } else {
                getPaymentPageSummary();
            }
        }
    },[])
  
    const getPaymentPageSummary = async(cartId) => {
        setPaymentLoader(true);
        try{
        const response =  cartId ? await checkoutService.getRetryPaymentPageSummary({"cartId":cartId}) : await checkoutService.getPaymentPageSummary();
            if(response && response.statusCode && response.statusCode === "SUCCESS"){
                convertPaymentModesToOldResponse(response.dataObject)
                setPromotionBanners(response.dataObject.promotionBannerDetails);
                setTotalPayble(response?.dataObject?.cartSummary?.totalAmount?.toFixed(2));
                if(response?.dataObject?.orderList){
                    setOrderReviewDetails({orderList : response.dataObject.orderList,pickStoreDetails : response.dataObject.pickStoreDetails, cartSummary : response.dataObject.cartSummary});
                }
                if(response?.dataObject?.orderList[0]?.orderType == 'PB_ORDER'){
                    setIsPayback(true);
                }
                if(response?.dataObject && response?.dataObject?.isCODAllowed && response?.dataObject?.base64Image){
                    setCaptchaCode("");
                    setCaptchaData(response.dataObject);
                }
            }
            setPaymentLoader(false);

        }catch(err){
            console.log(err);
            setPaymentLoader(false);
        }
    }

    const getMWalletAmount = () => {
        checkoutService.getMWalletAmount({orderType:isPayback ? 'PAYBACK_ORDER' : 'MART_ORDER',retryCartId:retryOrderId}).then(response=>{
            if(response && response.statusCode && response.statusCode === 'SUCCESS'){
                if(response.dataObject && response.dataObject.mWalletAmount){
                    setPaymentConfigData((previous)=>{
                        return({...previous,walletSummary:{mwalletAmount:response.dataObject.mWalletAmount}});
                    });
                }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const convertPaymentModesToOldResponse = (dataObject)=> {
        const oldResponse = {};
        const paymentModes = dataObject?.paymentModes || {};
        const oldModes = [];
        oldResponse.mWalletMode={};
        Object.entries(paymentModes).map(([key,value])=>{
            oldModes.push({modeId:key,allowedFor:'ALL',...value});
        });
        oldResponse.onlineModes = oldModes;
        oldResponse.isNetBankingDiversionEnabled=dataObject.isNetBankingDiversionEnabled ? 'Y' : 'N';
        oldResponse.COD_PAYMENT_ALLOWED=dataObject.isCODAllowed;
        oldResponse.ONLINE_PAYMENT_ALLOWED=dataObject.isOnlinePaymentAllowed;
        oldResponse.showTermsAndCondition=dataObject.showTermsNConditions;
        oldResponse.netBankingData=dataObject.netBankingData;
        oldResponse.mWalletMode.isAllowed = dataObject.isWalletAllowed;
        oldResponse.cartTotal=dataObject.cartSummary.totalAmount;  
        if(props.match.params.retryOrderId){
            oldResponse.retryOrderId = props.match.params.retryOrderId;
        }
        setPaymentConfigData(oldResponse);
        getMWalletAmount();
    }

    const getPaybackPaymentConfig = () =>{
        setPaymentLoader(true);
        checkoutService.getPaybackPaymentConfig().then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                //checkoutStepsToAnalytics([], 4);
                setPaymentConfigData(response.dataObject);
                setOrderReviewDetails({
                    orderList : response.dataObject.omsOrders,
                    pickStoreDetails : response.dataObject.pickStoreDetails,
                })
                calculateTotalPayble({orderList:response.dataObject.omsOrders});
            } else {
                window.location.href = "/paybackspecialsale"
            }
            setPaymentLoader(false);
        })
    }

    const calculateTotalPayble = (orderDetails) => {
        let total=0;
        let totalPbValue = 0;
        orderDetails.orderList && orderDetails.orderList.map((eachOrder)=>{
            total+=eachOrder.orderAmount;
            if(eachOrder.orderType === "PB_ORDER"){
                totalPbValue+=eachOrder.totalPBPointsValue;
            }
        })
        setTotalPayble(orderDetails.orderList[0].orderType === "PB_ORDER" ?parseFloat(total-totalPbValue).toFixed(2) :parseFloat(total).toFixed(2));
    }
    
    const getCaptchaImage = () => {
        checkoutService.getCaptchaCode().then((response)=> {
            if(response?.statusCode == 'SUCCESS'){
                setCaptchaCode("");
                setCaptchaData(response.dataObject);
            } else if(response?.statusCode == 'FAILURE' && response?.message){
                setAlertInfo({message:response.message, type: ""});
            }
            else {
                setAlertInfo({message:"System experiencing some problem, Please try after some time", type: ""});
            }
        }).catch(err=>{
            console.log(err);
            setAlertInfo({message:"System experiencing some problem, Please try after some time", type: ""});
        })
    }

    const handlePaymentModeClick = (selectedPaymentMode, paymentType)=>{
        if(isPayback) {
            PaybackSelectedPaymentEvent(selectedPaymentMode)
        }
        if(selectedPaymentMode=='NB' && (paymentConfigData.isNetBankingDiversionEnabled=='Y' || (paymentConfigData.isNetBankingDiversionEnabled=='A' && paymentConfigData.IS_ADMIN_USER))){
            setShowNetBanking(true);
            return;
        }
        if(selectedPaymentMode && paymentType){
            setLoaderForOnlineOrder(selectedPaymentMode);
            createOrder(selectedPaymentMode, paymentType);
        }
    }

    const handleNBModeClick = (selectedBankId)=>{
        let selectedPaymentMode = 'NB';
        let paymentType = 'O';
        if(selectedBankId){
            setLoaderForOnlineOrder(selectedPaymentMode);
            createOrder(selectedPaymentMode, paymentType, selectedBankId);
        }else{
            setAlertInfo({message:"Please Select a Bank", type: ""});
        }
    }

    const handleCODModeClick = (paymentType)=>{
        if(captchaCode && paymentType){
            setLoaderForCodOrder(true);
            checkoutService.validateCaptchaCode({'captchaCode':captchaCode}).then((response)=>{
                if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                    try{
                        if(props.match.params.retryOrderId){
                            sendRetryPaymentEvent(true);
                        }
                    }catch(err){
                        console.log(err);
                    }
                    createOrder("COD",paymentType);
                }
                if(response?.statusCode === "FAILURE" && response?.message){
                    setAlertInfo({message:response.message, type: ""});
                    setLoaderForCodOrder(false);
                    getCaptchaImage();
                }
            })
        }else{
            setAlertInfo({message:"Please Enter the captcha.", type: ""});
        }
    }

    const handleOmsOrderCreation = (paymentObj,retryOrderId,isPayback) =>{
        checkoutService.omsOrderCreationProcess(paymentObj,retryOrderId,isPayback).then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                if((paymentObj.paymentType=='C' && isPayback) || (paymentObj.MODE=='COD' && !isPaybackNormalOrder)){
                    setLoaderForCodOrder(false);
                    props.history.push("/thankyou");
				} else if((paymentObj?.instrument == 'MW' && isPayback) || (paymentObj?.MODE=='MW' && !isPaybackNormalOrder)){
                    setLoaderForWalletOrder(false);  
                    let obj = {...response?.dataObject,isPayback : isPayback,retryOrderId : retryOrderId};   
                    if(isPayback){
                        obj.cartId=response.dataObject?.orderList[0]?.cartId;
                    }
                    dispatch({type: UPDATE_MWALLET_ORDER_DETAILS, data:obj});
                    dispatch({type: SET_CART_ID, data: !isPaybackNormalOrder ? response.dataObject.cartId : response.dataObject.orderList[0].cartId});
                    props.history.push(retryOrderId ? '/walletPayment/'+retryOrderId : '/walletPayment');
                } else{
                    setLoaderForOnlineOrder(undefined);
                    dispatch({type: SET_CART_ID, data: !isPaybackNormalOrder ? response.dataObject.cartId : response.dataObject.orderList[0].cartId});
                    handlePaymentSubmit({...response.dataObject,...paymentObj});
                }
            }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
                if(response.message=="MIN_AMOUNT_ERROR"){
                    setAlertInfo({message:"Order Failed", type: ""});
                }
                else if(response.message=="INVALID_PROMOTION_TYPE"){
                    props.history.push({
                        pathname:'/shoppingCart',
                        errorData: { errorMsg: "Invalid promotion type, Please select valid promotion."}
                    });
                }
                else if (retryPaymentStatusMessages[response.message]) {
                    setAlertInfo({ message: retryPaymentStatusMessages[response.message], type: "" });
                    setTimeout(() => {
                        props.history.push("/");
                    }, 3000);
                }
                else if(!response.message || response.message.indexOf("_")>-1){
                    setAlertInfo({message:"Something Went Wrong!", type: ""});
                }else{
                    setAlertInfo({message:response.message, type: ""});
                }
                setLoaderForCodOrder(false);
                setLoaderForWalletOrder(false);
                setLoaderForOnlineOrder(undefined);
            }else{
                setAlertInfo({message:"Something Went Wrong!", type: ""});
                setLoaderForCodOrder(false);
                setLoaderForWalletOrder(false);
                setLoaderForOnlineOrder(undefined);
            }
        },(err)=>{
            console.log(err);
            setAlertInfo({message:"Something Went Wrong!", type: ""});
            setLoaderForCodOrder(false);
            setLoaderForWalletOrder(false);
            setLoaderForOnlineOrder(undefined);
        })
    }

    const handleWalletModeClick = (selectedPaymentMode)=>{
        if(isPayback) {
            PaybackSelectedPaymentEvent(selectedPaymentMode);
        }
        if(paymentConfigData?.walletSummary?.mwalletAmount >= paymentConfigData?.cartTotal){
            setLoaderForWalletOrder(true);
            var paymentObj = {
                paymentType:"O",
                instrument:"MW",
                PAYMENT_MODE:"MW"
            }
            handleOmsOrderCreation(isPaybackNormalOrder ? paymentObj : {MODE:selectedPaymentMode},paymentConfigData.retryOrderId,isPayback);
        }else{
            if(isPayback){
                checkoutService.validatePayBackPoints(retryOrderId).then(response=>{
                    if (response && response.statusCode  && response.statusCode === "SUCCESS"){
                        dispatch({type: UPDATE_MWALLET_ORDER_DETAILS, data:{isPayback : isPayback,retryOrderId : retryOrderId}});
                        props.history.push(retryOrderId ? '/walletPayment/'+retryOrderId : '/walletPayment');
                    } else if (response && response.message) {
                        setAlertInfo({message:response.message, type: ""});
                    } else {
                        setAlertInfo({message:"Something Went Wrong!", type: ""});
                    }
                }).catch(err=>{
                    console.log(err);
                    setAlertInfo({message:"Something Went Wrong!", type: ""});
                })
            } else {
                dispatch({type: UPDATE_MWALLET_ORDER_DETAILS, data:{isPayback : isPayback,retryOrderId : retryOrderId}});
                props.history.push(retryOrderId ? '/walletPayment/'+retryOrderId : '/walletPayment');
            }
            
        }
    }

    const redirectToOrderReview = ()=>{
        if(isPayback){
            PaybackPaymentBackEvent()
            props.history.push('/payback/review');
        } else {
            props.history.push({ pathname : '/orderReview', state:{ isFromPaymentPage: true } });
        }
    }
    
    const createOrder = (selectedPayMode, paymentType, netBankingId=null) => {
        if (selectedPayMode === undefined || selectedPayMode === '') {
            setAlertInfo({message:"Please select any payment mode.", type: ""});
            return;
        }
        var obj = {
            paymentType:paymentType,
            instrument:selectedPayMode
        }
        var martObject = {
            MODE:selectedPayMode,
            REFILL_ID:LocalDB.getValue("refillCheckoutId")
        }
        if(netBankingId){
            obj['netBankingCode'] = netBankingId;
            martObject['netBankingCode'] = netBankingId;
        }
        handleOmsOrderCreation(isPaybackNormalOrder ? obj : martObject,paymentConfigData.retryOrderId,isPayback);
    }

    const handlePaymentSubmit = (dataObj) => {
        var formData = {};
        var ajaxData = {};
        var inputArray = [];
        inputArray.push({"name" :"tokenId" , value : LocalDB.getValue("SESSIONID")});
        inputArray.push({"name" :"customerId", value : LocalDB.getValue("customerId")});
        var formValues = {
            "formId": "paymentForm",
            "formAction": CONFIG.API.CHECKOUT.REQUEST_PAYMENT.PATH,
            "formMethod": "post",
            "formStyle": { display: 'none' }
        };

        var instrument = { "name": "MODE", "value": isPaybackNormalOrder ? dataObj.instrument : dataObj.paymentMode };
        inputArray.push(instrument);

        if(dataObj.netBankingCode){
            var netBankingCode = { "name": "NETBANKING_CODE", "value": dataObj.netBankingCode };
            inputArray.push(netBankingCode);
        }

        var referenceId = { "name": "orderID", "value": isPaybackNormalOrder ? dataObj.orderList[0].cartId :  dataObj.cartId };
        inputArray.push(referenceId);

        var amount = { "name": "amount", "value":  isPaybackNormalOrder ? dataObj.FINAL_AMOUNT : dataObj.finalAmount };
        inputArray.push(amount);

        var company = { "name": "COMPANY", "value": dataObj.COMPANY };
        inputArray.push(company);
        
        formData = { ...formValues, inputArray: inputArray };
        setFormData(formData);
    }

    const editOrder = async()=>{
        if(isPayback){
            await MyAccountService().clearFlexiCart(true);
            window.location.href = CONFIG.REDIRECT_HOME_URL+'orderDetails/'+orderReviewDetails?.orderList[0]?.orderId;
        } else if(retryOrderId){
            if(showCancelModal){
                setOpenModal(true);
            }else{
                handleEditRetryOrder();
            }
        } else{
            redirectToHome();
        }
    }
    const handleEditRetryOrder = ()=>{
        setEditOrderLoader(true);
        checkoutService.forceCancelOrder({"cartId":retryOrderId}).then((response)=>{
            setEditOrderLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                redirectToShoppingCart();
            }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
                if(response.message && response.message!="ERROR"){
                    setAlertInfo({message:"System experiencing some problem, Please try after some time", type: ""});
                }
            }
        }).catch((err)=>{
            console.log(err);
            setAlertInfo({message:"System experiencing some problem, Please try after some time", type: ""});
            setEditOrderLoader(false);
        })
    }
    const redirectToShoppingCart = ()=>{
        props.history.push(isPayback ? "/payback/cart" :"/shoppingCart");
    }

    const redirectToHome = ()=>{
        if(isPayback) {
            PaybackPaymentAddMoreEvent()
        }
        window.location.href = isPayback ? CONFIG.REDIRECT_HOME_URL + 'paybackspecialsale': CONFIG.REDIRECT_HOME_URL;
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    if(formData){
        return (
            <HiddenForm formData = {formData} />
        )
    }
    return (
        <React.Fragment>
            <main role="main" className="container-fluid container-lg">
                {!showNetBanking &&
                <div className="row no-gutters">
                {(paymentLoader || orderReviewLoader) && 
                    <PaymentGhostImage paymentLoader={paymentLoader} orderReviewLoader={orderReviewLoader}/>}
                {/* payments left panel */}
                {paymentConfigData &&
                    <div className="col-8 pl-0 pr-2">
                        <section>
                            <div className="header">
                                <p>Payment Options</p>
                            </div>
                            <div className="payment-options">
                                {!isPayback && paymentConfigData.showTermsAndCondition &&
                                <p className="px-3">By placing the order you are agreeing to show the doctor's prescription at the time of delivery</p>
                                }	
                                <ul>
                                    {paymentConfigData.onlineModes && paymentConfigData.onlineModes.map(eachMode => {
                                        if(eachMode && eachMode.allowedFor && (eachMode.allowedFor=='ALL' ||     (eachMode.allowedFor=='ADMIN' && paymentConfigData.IS_ADMIN_USER))){
                                            if(eachMode.modeId && eachMode.modeId=='COD'){
                                                return(
                                                    validate.isNotEmpty(captchaData) &&
                                                        <CODMode onPaymentSelect={handleCODModeClick} captchaData={captchaData} 
                                                        refreshCaptcha={()=>getCaptchaImage()} selectedDiscount={paymentConfigData.selectedDisount}
                                                        handleOnChangeCaptcha={(captchaTxt)=>setCaptchaCode(captchaTxt)} 
                                                        captchaText={captchaCode} createOrderLoader={loaderForCodOrder} mode={eachMode}
                                                        vertical={"mart"}/>
                                                )
                                            }else if(eachMode.modeId && eachMode.modeId=='MW'){
                                                return(
                                                    paymentConfigData.mWalletMode && paymentConfigData.mWalletMode.isAllowed && paymentConfigData.walletSummary &&
                                                        <MwalletMode walletSummary={paymentConfigData.walletSummary} 
                                                        cartTotal ={paymentConfigData.cartTotal}
                                                        mode={paymentConfigData.mWalletMode} 
                                                        onPaymentSelect={handleWalletModeClick}
                                                        createOrderLoader={loaderForWalletOrder}
                                                        selectedDiscount={paymentConfigData.selectedDisount} isPayback={isPayback}/>
                                                )
                                            }else if(paymentConfigData.ONLINE_PAYMENT_ALLOWED){
                                                return(
                                                    <OnlinePaymentMode mode={eachMode} onPaymentSelect={handlePaymentModeClick}
                                                    selectedDiscount={paymentConfigData.selectedDisount} createOrderLoader={loaderForOnlineOrder}/>
                                                )
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                        </section>
                    </div>}
                    {/* payments left panel over */}
                    <div className="col-4 pl-2 pr-0">
                        {!isPayback && promotionBanners &&
                            <AppliedPaymentOffer  handleOfferChange={()=>redirectToOrderReview()} 
                                 promotionBanners={promotionBanners} header="Selected Offer"/>
                        }
                        {(orderReviewDetails) && <ReviewCartSummary isPayback = {isPayback} orderReviewDetails={orderReviewDetails}></ReviewCartSummary> }
                        {orderReviewDetails && orderReviewDetails.orderList && 
                            <DeliveryAddressDetail orderDetails={orderReviewDetails.orderList[0]} pickStoreDetails={orderReviewDetails.pickStoreDetails} freeShippingAmount={orderReviewDetails.freeShippingAmount}></DeliveryAddressDetail>
                         }
                    </div>
                </div>}
                {paymentConfigData && orderReviewDetails && showNetBanking &&
                    <div className="row no-gutters">
                        <div className="col-12">
                            <NetBankingMode bankList={paymentConfigData.netBankingData}
                            handleBackClick={()=>setShowNetBanking(false)}
                            totalPayble={totalPayble}
                            onPaymentSelect={handleNBModeClick}
                            createOrderLoader={loaderForOnlineOrder}/>
                        </div>
                    </div>
                }
            </main>
            {!showNetBanking &&
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid px-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            {paymentConfigData && !retryOrderId &&
                            <React.Fragment>
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={redirectToOrderReview}>Back</button>
                                <button type="submit" className="btn btn-outline-brand px-5 ml-3 rounded-pill custom-btn-lg" data-toggle="modal" data-target=".refill-interval-popup" onClick={redirectToHome}>
                                    Add More Products
                                </button>
                            </React.Fragment>}
                            {paymentConfigData  && retryOrderId &&
                            <React.Fragment>
                            {isEditOrderLoader &&
                                <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill">
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </button>
                            }
                            {!isEditOrderLoader && 
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" data-toggle="modal" data-target=".refill-interval-popup" onClick={editOrder}>
                                {isPayback ? `Back` : (retryOrderId ? `Edit Order`:`Back`)}
                            </button>}
                            </React.Fragment>}
                        </div>
                    </div>
                </div>
            </footer>}
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>}
            <EditOrderConfirmationModal openModal = {openModal} toggleModel={()=>{setOpenModal(!openModal)}} 
            handleConfirmation={(flag)=>{
                setOpenModal(false);
                if(flag=='true'){
                    handleEditRetryOrder();
                }else{
                    return false;
                }
            }}/>
        </React.Fragment>
    )
}

const  EditOrderConfirmationModal  = (props) => { 
    return (
        <React.Fragment>
            <Modal className="modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={props.openModal} toggle={props.toggleModel} style={{paddingRight: "15px"}}>
                <ModalBody className="modal-body">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85.86" height="92.336" viewBox="0 0 85.86 92.336">
                        <g id="noun_Purchase_2629448" transform="translate(-24 -6.5)">
                            <path id="Path_1110" data-name="Path 1110" d="M324.078,214.427a10.083,10.083,0,0,0,10.072-10.072v-5.188a1.11,1.11,0,1,0-2.221,0v5.188a7.852,7.852,0,1,1-15.7,0v-5.188a1.11,1.11,0,1,0-2.221,0v5.188A10.084,10.084,0,0,0,324.078,214.427Z" transform="translate(-236.342 -156.111)" fill="#b1b1b1"></path>
                            <path id="Path_1111" data-name="Path 1111" d="M30.927,89.328c.2,0,.4-.011.592-.027H46.793v2.082a7.45,7.45,0,0,0,7.442,7.442H75.982q.163.012.329.012a1.116,1.116,0,1,0,0-2.232h-.235a2.346,2.346,0,0,1-2.107-2.332V81.733h29.358A6.541,6.541,0,0,0,109.86,75.2a1.117,1.117,0,0,0-.011-.153l-5.063-36.327a.1.1,0,0,0,0-.019,3.8,3.8,0,0,0-3.775-3.229H84.956l-1.35-9.682,0-.019a4.322,4.322,0,0,0-4.291-3.67H75.284V18.3a11.8,11.8,0,0,0-23.591,0v3.8H47.664a4.322,4.322,0,0,0-4.29,3.67l0,.019L41.166,41.61a4.3,4.3,0,0,0-1.02-.116,4.05,4.05,0,0,0-2.5.823,2.006,2.006,0,0,1-2.518,0,4.21,4.21,0,0,0-5,0,2,2,0,0,1-2.517,0,4.048,4.048,0,0,0-2.5-.822A1.11,1.11,0,0,0,24,42.6V82.4a6.935,6.935,0,0,0,6.927,6.927Zm5.1-2.248A6.9,6.9,0,0,0,37.854,82.4v-2.85a4.469,4.469,0,1,1,8.939,0V87.08Zm18.2,9.524a5.227,5.227,0,0,1-5.221-5.221V79.552A6.664,6.664,0,0,0,47.3,75.083H66.527A5.227,5.227,0,0,1,71.748,80.3V94.274a4.535,4.535,0,0,0,.641,2.332Zm48.354-57.568,5.052,36.236a4.318,4.318,0,0,1-4.312,4.24h-29.4a7.457,7.457,0,0,0-5.783-6.471l4.74-34a1.594,1.594,0,0,1,1.581-1.345h26.544a1.593,1.593,0,0,1,1.58,1.345ZM53.914,18.3a9.575,9.575,0,1,1,19.15,0v3.8H53.914Zm-8.345,7.81a2.112,2.112,0,0,1,2.1-1.785h4.029v5.942a1.11,1.11,0,1,0,2.221,0V24.321h19.15v5.942a1.11,1.11,0,1,0,2.221,0V24.321h4.029a2.112,2.112,0,0,1,2.1,1.785l1.305,9.365h-8.25A3.8,3.8,0,0,0,70.689,38.7l0,.019-4.76,34.143H56.294V42.6a1.11,1.11,0,0,0-1.11-1.11,4.05,4.05,0,0,0-2.5.823,2.009,2.009,0,0,1-2.519,0,4.211,4.211,0,0,0-5,0,1.885,1.885,0,0,1-1.258.444,1.843,1.843,0,0,1-.644-.1ZM26.221,44.059l.148.1a4.21,4.21,0,0,0,5,0,2.006,2.006,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.007,2.007,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.008,2.008,0,0,1,2.519,0,4.212,4.212,0,0,0,5,0l.149-.1v28.8H42.323a6.7,6.7,0,0,0-6.69,6.69V82.4a4.706,4.706,0,0,1-9.413,0Z" transform="translate(0 0)" fill="#b1b1b1"></path>
                            <path id="Path_1112" data-name="Path 1112" d="M81.291,266.374a1.11,1.11,0,0,0,1.11,1.11H96.614a1.11,1.11,0,0,0,0-2.221H82.4A1.11,1.11,0,0,0,81.291,266.374Z" transform="translate(-46.69 -210.882)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1113" data-name="Path 1113" d="M53.529,267.485h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -210.882)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1114" data-name="Path 1114" d="M96.614,298H82.4a1.11,1.11,0,1,0,0,2.221H96.614a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-46.69 -237.56)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1115" data-name="Path 1115" d="M53.529,300.221h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -237.56)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1116" data-name="Path 1116" d="M96.614,330.733H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.22Z" transform="translate(-46.69 -264.236)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1117" data-name="Path 1117" d="M53.529,332.954h2.3a1.11,1.11,0,1,0,0-2.22h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -264.236)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1118" data-name="Path 1118" d="M53.529,234.751H63.7a1.11,1.11,0,1,0,0-2.221H53.529a1.11,1.11,0,1,0,0,2.221Z" transform="translate(-23.16 -184.205)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1119" data-name="Path 1119" d="M179.133,396.835a1.338,1.338,0,0,1,1.336,1.336,1.11,1.11,0,1,0,2.221,0,3.562,3.562,0,0,0-2.446-3.377v-.414a1.11,1.11,0,1,0-2.221,0v.414a3.555,3.555,0,0,0,1.11,6.934,1.336,1.336,0,1,1,.019,2.672h-.037a1.337,1.337,0,0,1-1.318-1.335,1.11,1.11,0,1,0-2.221,0,3.561,3.561,0,0,0,2.447,3.377v.525a1.11,1.11,0,1,0,2.221,0v-.525a3.555,3.555,0,0,0-1.11-6.933,1.336,1.336,0,1,1,0-2.672Z" transform="translate(-123.528 -315.201)" fill="#b1b1b1" style={{"fill": "green"}}></path>
                            <path id="Path_1120" data-name="Path 1120" d="M234.011,453.726H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -364.47)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1121" data-name="Path 1121" d="M234.011,427.276H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -342.914)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                            <path id="Path_1122" data-name="Path 1122" d="M234.011,400.827H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-166.944 -321.36)" fill="#b1b1b1" style={{"fill": "#4169e1"}}></path>
                        </g>
                    </svg>
                    <h6>This will cancel the  current order and you will be taken to Shopping Cart.There may be MRP, Product availability changes.</h6>
                    <h6>Are you sure you want to Proceed</h6>
                    <button type="button" className="btn brand-secondary px-4 rounded-pill" value={false} onClick={(e)=>props.handleConfirmation(e.target.value)}>Cancel</button>
                    <button className="btn btn-brand-gradient rounded-pill px-4 ml-3 custom-btn-lg" type="button" value={true} onClick={(e)=>props.handleConfirmation(e.target.value)}>Yes, Proceed</button>
                </ModalBody>
            </Modal>    
        </React.Fragment>
      )
  }

export default Payment