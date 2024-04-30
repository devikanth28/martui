import React, { useState, useEffect } from 'react';
import PaymentGhostImage from '../../../Checkout/Payments/PaymentGhostImage';
import CODMode from '../../../Checkout/Payments/CODMode';
import OnlinePaymentMode from '../../../Checkout/Payments/OnlinePaymentMode';
import AppliedPaymentOffer from '../../../Checkout/Payments/AppliedPaymentOffer';
import LabCheckoutService from '../../../../services/LabCheckoutService';
import CollectionDetails from '../../Common/CollectionDetails';
import Alert from '../../../Common/Alert';
import Promotion from '.././../../Checkout/OrderReview/Promotion';
import LabCartSummary from '../../Common/LabCartSummary';
import HiddenForm from '../../../Checkout/Payments/HiddenForm';
import NetBankingMode from '../../../Checkout/Payments/NetBankingMode';
import Validate from '../../../../helpers/Validate';
import CONFIG from '../../../../constants/ServerConfig';
import LabCheckoutAction from '../../../../../redux/action/LabCheckoutAction';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';
import LocalDB from '../../../../DataBase/LocalDB';

const LabPayment = (props)=>{

    const labCheckoutService = LabCheckoutService();
    const validate = Validate();
    const labCheckoutAction = LabCheckoutAction();
    const selectedLocality = getLabSelectedLocality();

    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const [isSummaryLoading, setSummaryLoading] = useState(false);
    const [isCODOrderBtnLoading, setCODOrderBtnLoading] = useState(false);
    const [isOnlineOrderBtnLoading, setOnlineOrderBtnLoading] = useState(false);
    const [isBankListPage, setBankListPage] = useState(false);
    const [isCouponRequestLoading, setCouponRequestLoading] = useState(false);
    

    const [captchaData, setCaptchaData] = useState(null);
    const [captchaCode, setCaptchaCode] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState({});
    const [paymentConfigData, setPaymentConfigData] = useState({});
    const [shoppingCartObj, setShoppingCartObj] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [formData, setFormData] = useState(null);

    const response_message = props.location.errorMsg;
    const [alertInfo, setAlertInfo] = useState(validate.isNotEmpty(response_message)?{ message:response_message, type: "" }:{});
    
    var token_from_LocalStorage = LocalDB.getValue("SESSIONID");
    const custId_from_LocalStorage = LocalDB.getValue("customerId");

    useEffect(() => {
            getPaymentConfig();
            getLabShoppingCart();
            getCaptchaImage()
    },[])

    const getPaymentConfig = ()=>{
        setPaymentLoading(true);
        labCheckoutService.getPaymentConfig().then((response)=>{
            setPaymentLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setPaymentConfigData(response.responseData);
            }
        },
        (err)=>{
            setPaymentLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        })
    }
    const getLabShoppingCart = ()=>{
        setSummaryLoading(true);
        labCheckoutService.getShoppingCartInfo().then(response => {
            setSummaryLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                setShoppingCartObj(response.responseData.shoppingCart)
                if(validate.isNotEmpty(response.responseData.shoppingCart.couponCode)){
                    setSelectedDiscount({'COUPON':response.responseData.couponCode});
                    setSuccessMsg("Coupon applied successfully!");
                }
            }
        }).catch(function(error) {
            setSummaryLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const getCaptchaImage = () => {
        labCheckoutService.getCaptcha().then((response)=>{
            console.log(response);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setCaptchaCode("");
                setCaptchaData(response.responseData);
            }
        },(err)=>{

        })
    }

    const handleCODModeClick = (paymentType)=>{
        if(validate.isNotEmpty(captchaCode) && validate.isNotEmpty(paymentType)){
            setCODOrderBtnLoading(true);
            createOrder("COD",paymentType,captchaCode);
        }else{
            setAlertInfo({message:"Please Enter captcha.", type: ""});
        }
    }

    const createOrder = (selectedPayMode, paymentType, captchaCode, netBankingId=null) => {
        if (selectedPayMode === undefined || selectedPayMode === '') {
            setAlertInfo({message:"Please select any payment mode.", type: ""});
            return;
        }
        var obj = {
            paymentType:paymentType,
            instrument:selectedPayMode
        }
        if(paymentType==='C' && validate.isNotEmpty(captchaCode)){
            obj['captchaCode'] = captchaCode;
        }
        if(netBankingId){
            obj['netBankingCode'] = netBankingId;
        }
        labCheckoutService.createLabOrder(obj).then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                if(paymentType==='C'){
                    setCODOrderBtnLoading(false);
                    props.history.push("/labsThankyou");
				}else if(paymentType==='O'){
                    setOnlineOrderBtnLoading(undefined);
                    handlePaymentSubmit({...response.responseData,...obj});
                }
            }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
                if(paymentType==='C'){
                    getCaptchaImage();
                }
                setAlertInfo({message:validate.isNotEmpty(response.message)?response.message:"Something Went Wrong!", type: ""})
                setCODOrderBtnLoading(false);
                setOnlineOrderBtnLoading(undefined);
            }else{
                setAlertInfo({message:"Something Went Wrong!", type: ""})
                setCODOrderBtnLoading(false);
                setOnlineOrderBtnLoading(undefined);
            }
        },(err)=>{
            console.log(err);
            setAlertInfo({message:"Something Went Wrong!", type: ""});
            setCODOrderBtnLoading(false);
            setOnlineOrderBtnLoading(false);
        })
    }

    

    const handlePaymentModeClick = (selectedPaymentMode, paymentType)=>{
        if(selectedPaymentMode=='NB' && (paymentConfigData.isNetBankingDiversionEnabled=='Y' || (paymentConfigData.isNetBankingDiversionEnabled=='A' && paymentConfigData.IS_ADMIN_USER))){
            setBankListPage(true);
            return;
        }
        if(selectedPaymentMode && paymentType){
            setOnlineOrderBtnLoading(selectedPaymentMode);
            createOrder(selectedPaymentMode, paymentType, undefined , undefined);
        }
    }

    const handleNBModeClick = (selectedBankId)=>{
        let selectedPaymentMode = 'NB';
        let paymentType = 'O';
        if(selectedBankId){
            setOnlineOrderBtnLoading(selectedPaymentMode);
            createOrder(selectedPaymentMode, paymentType, selectedBankId);
        }else{
            setAlertInfo({message:"Please Select a Bank", type: ""});
        }
    }

    const redirectToOrderReview = ()=>{
    }

    const redirectTo = (path, parameter=undefined)=>{
        if(validate.isNotEmpty(parameter)){
            props.history.push({
                pathname: path,
                errorData: parameter
            });
        } else{
            props.history.push(path);
        }
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    const removeCouponCode = (couponCode) => {
        setCouponRequestLoading(true);
        labCheckoutService.removeCouponCode(couponCode).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                setSuccessMsg(undefined);
                setSelectedDiscount(undefined)
                setShoppingCartObj(response.responseData.shoppingCart);
                updateShoppingCartInRedux(response.responseData.shoppingCart);
                redirectTo('/labsOrderSummary');
            } else if(response.statusCode === "FAILURE"){
                setFailureMsg(response.message);
            }
            setCouponRequestLoading(false);
        }).catch(function(error) {
            setCouponRequestLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }
    
    const updateShoppingCartInRedux = (shoppingCart) => {
        if(validate.isEmpty(shoppingCart)) {
            return;
        }
        labCheckoutAction.saveLabShoppingCart(shoppingCart);
    }

    const addMoreTest = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL + "lab/labtest-list/A";
    }

    const applyCouponCode = (coupon) => {
    }

    const handlePaymentSubmit = (dataObj) => {
        console.log("token_from_LocalStorage:",token_from_LocalStorage);
        var formData = {};
        var ajaxData = {};
        var inputArray = [];

        var formValues = {
            "formId": "paymentForm",
            "formAction": CONFIG.API.LAB_CHECKOUT.REQUEST_PAYMENT.PATH,
            "formMethod": "post",
            "formStyle": { display: 'none' }
        };
        var user_token = {"name":"tokenId", "value":token_from_LocalStorage};
        inputArray.push(user_token);

        var user_id = {"name":"customerId", "value":custId_from_LocalStorage};
        inputArray.push(user_id);

        var instrument = { "name": "instrument", "value": dataObj.instrument };
        inputArray.push(instrument);

        if(dataObj.netBankingCode){
            var netBankingCode = { "name": "NETBANKING_CODE", "value": dataObj.netBankingCode };
            inputArray.push(netBankingCode);
        }

        var referenceId = { "name": "referenceId", "value": dataObj.labOrder.orderId };
        inputArray.push(referenceId);

        var orderDateCreated = { "name": "ORDER_DATE_CREATED", "value": validate.isNotEmpty(dataObj.labOrder.dateCreated)? dataObj.labOrder.dateCreated:new Date()};
        inputArray.push(orderDateCreated);

        var amount = { "name": "amount", "value": dataObj.labOrder.totalAmount};
        inputArray.push(amount);

        var company = { "name": "company", "value": "optival" };
        inputArray.push(company);

        const userInfo = dataObj.userDetails;

        var userId = { "name": "userId", "value": userInfo.webLoginID };
        inputArray.push(userId);
        
        if(dataObj.labOrder.userId){
        	var email = { "name": "email", "value": dataObj.labOrder.userId }
            inputArray.push(email);
        }

        var customerId = { "name": "customerId", "value": userInfo.customerID };
        inputArray.push(customerId);

        var mobileNo = { "name": "mobileNo", "value": userInfo.mobileNumber };
        inputArray.push(mobileNo);

        var customerName = { "name": "customerName", "value": `${userInfo.firstName} ${userInfo.lastName}` };
        inputArray.push(customerName);

        var pincode = { "name": "pincode", "value": validate.isEmpty(userInfo.shippingAddress) || validate.isEmpty(userInfo.shippingAddress.pincode)?selectedLocality.pincode: userInfo.shippingAddress.pincode};
        inputArray.push(pincode);

        var state = { "name": "state", "value": validate.isEmpty(userInfo.shippingAddress) || validate.isEmpty(userInfo.shippingAddress.state)?selectedLocality.state: userInfo.shippingAddress.state };
        inputArray.push(state);
        city
        var city = { "name": "city", "value": validate.isEmpty(userInfo.shippingAddress) || validate.isEmpty(userInfo.shippingAddress.city)?selectedLocality.city: userInfo.shippingAddress.city };
        inputArray.push(city);

        var country = { "name": "country", "value": "IND" };
        inputArray.push(country);

        var address = { "name": "address", "value": validate.isEmpty(userInfo.shippingAddress) || validate.isEmpty(userInfo.shippingAddress.address)?selectedLocality.combination: userInfo.shippingAddress.address};
        inputArray.push(address);
        
        formData = { ...formValues, inputArray: inputArray };
        setFormData(formData);
    }

    if(formData){
        return (
            <HiddenForm formData = {formData} />
        )
    }

    return(
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>}
            <main role="main" className="container">
            {!isBankListPage &&
                <div className="row">
                     {(isPaymentLoading || isSummaryLoading) && 
                    <PaymentGhostImage paymentLoader={isPaymentLoading} orderReviewLoader={isSummaryLoading}/>
                     }
                    {paymentConfigData &&
                    <div className="col-8 pl-0 pr-2">
                        <section>
                            <div className="header">
                                <p>Payment Options</p>
                            </div>
                            <div className="payment-options pt-2">
                                <ul>
                                {paymentConfigData.onlineModes && paymentConfigData.onlineModes.map(eachMode => {
                                    return(
                                    <OnlinePaymentMode onPaymentSelect={handlePaymentModeClick}
                                    createOrderLoader={isOnlineOrderBtnLoading} mode={eachMode} 
                                    selectedDiscount={selectedDiscount} />
                                        )
                                })}
                                {paymentConfigData.codPaymentAllowed && paymentConfigData.codPaymentAllowed==='Y' &&
                                    <CODMode onPaymentSelect={handleCODModeClick} captchaData={captchaData} 
                                    refreshCaptcha={()=>getCaptchaImage()} handleOnChangeCaptcha={(captchaTxt)=>setCaptchaCode(captchaTxt)}
                                    captchaText={captchaCode} createOrderLoader={isCODOrderBtnLoading} 
                                    mode={{'displayName':'Now you can pay with cash on delivery. No online/UPI payment will be accepted on delivery.'}}
                                    selectedDiscount={selectedDiscount} vertical={"lab"}/>
                                }
                                </ul>
                            </div>
                        </section>
                    </div>
                    }
                    {validate.isNotEmpty(shoppingCartObj) &&
                    <div className="col-4 pl-2 pr-0">
                        {validate.isNotEmpty(shoppingCartObj.patientCartsMap) && 
                            <LabCartSummary shoppingCartInfo={shoppingCartObj}/>
                        }
                        <CollectionDetails
                        patientAddress={shoppingCartObj.address}
                        storeAddress={shoppingCartObj.collectionCenterStore}
                        visitType={shoppingCartObj.visitType}
                        reportDeliveryType={shoppingCartObj.reportDeliveryType}
                        timeSlot={Object.keys(shoppingCartObj.patientCartsMap).length>0?shoppingCartObj.patientCartsMap[Object.keys(shoppingCartObj.patientCartsMap)[0]].timeSlot:undefined} 
                        />
                    </div>}
                </div>}
                {paymentConfigData && shoppingCartObj && isBankListPage &&
                    <div className="row no-gutters">
                        <div className="col-12">
                            <NetBankingMode bankList={paymentConfigData.netBankingData}
                            handleBackClick={()=>setBankListPage(false)}
                            totalPayble={shoppingCartObj.totalAmountAfterAdjustments}
                            onPaymentSelect={handleNBModeClick}
                            createOrderLoader={isOnlineOrderBtnLoading}/>
                        </div>
                    </div>
                }
            </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <React.Fragment>
                                <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>redirectTo('/labsOrderSummary')}>back</button>
                                <button type="submit" className="btn btn-outline-brand px-5 ml-3 rounded-pill" data-toggle="modal" data-target=".refill-interval-popup" onClick={addMoreTest}>
                                    add more tests
                                </button>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )

}

export default LabPayment