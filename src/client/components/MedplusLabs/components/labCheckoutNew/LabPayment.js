import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLabSelectedLocality, reloadSelectedLocalityInfo } from '../../../../../redux/action/LocalityAction';
import CONFIG from '../../../../constants/ServerConfig';
import Validate from '../../../../helpers/Validate';
import CODMode from '../../../Checkout/Payments/CODMode';
import HiddenForm from '../../../Checkout/Payments/HiddenForm';
import NetBankingMode from '../../../Checkout/Payments/NetBankingMode';
import OnlinePaymentMode from '../../../Checkout/Payments/OnlinePaymentMode';
import PaymentGhostImage from '../../../Checkout/Payments/PaymentGhostImage';
import Alert from '../../../Common/Alert';
import ShowPickUpStore from '../../../Common/ShowPickUpStore';
import PatientAddress from '../../../Labs/Common/PatientAddress';
import LabNewCheckoutAction from '../../redux/action/LabNewCheckoutAction';
import LabCheckOutService from '../../Services/LabCheckoutService';
import LabCartSummary from '../Common/LabCartSummary';
import SlotDetails from '../Common/SlotDetails';
import ForceCancelConfirmationModal from '../../../../commonComponents/ForceCancelConfirmationModal';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX } from '../../constants/LabConstants';
import LocalDB from '../../../../DataBase/LocalDB';

const LabPayment = (props)=>{

    const labCheckoutService = LabCheckOutService();
    const labNewCheckoutAction = LabNewCheckoutAction();
    const validate = Validate();
    const selectedLocality = getLabSelectedLocality();

    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const [isSummaryLoading, setSummaryLoading] = useState(false);
    const [isCODOrderBtnLoading, setCODOrderBtnLoading] = useState(false);
    const [isOnlineOrderBtnLoading, setOnlineOrderBtnLoading] = useState(false);
    const [isBankListPage, setBankListPage] = useState(false);

    const [captchaData, setCaptchaData] = useState(null);
    const [captchaCode, setCaptchaCode] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState({});
    const [paymentConfigData, setPaymentConfigData] = useState({});
    const [labCartSummary, setLabCartSummary] = useState({});
    const [formData, setFormData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const response_message = props.location.errorMsg;
    const [alertInfo, setAlertInfo] = useState(validate.isNotEmpty(response_message)?{ message:response_message, type: "" }:{});
    const dispatch = useDispatch();
    let token_from_LocalStorage  = LocalDB.getValue("SESSIONID");
    const custId_from_LocalStorage = LocalDB.getValue("customerId");
    const retryPayment = validate.isNotEmpty(props.match.params.orderId)
    const [labMinOrderAmount,setLabMiniOrderAmount] = useState(0);
    useEffect(() => {
        if(retryPayment){
            getLabRetryCartSummary();
        }else{
            getPaymentConfig();
            getLabCartSummary();
        }
        getCaptchaImage();
    },[])
    
    const getPaymentConfig = ()=>{
        setPaymentLoading(true);
        labCheckoutService.getPaymentGatewayDetails({}).then((response)=>{
            setPaymentLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setPaymentConfigData(response.responseData);
            }else{
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
                setTimeout(() => {props.history.push(`/${DIAGNOSTICS_HOME}`)}, 2000);
            }
        },
        (err)=>{
            setPaymentLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        })
    }

    const getLabCartSummary = ()=>{
        setSummaryLoading(true);
        labCheckoutService.getPaymentLabOrderSummary({}).then(response => {
            setSummaryLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                setLabCartSummary(response.responseData);
                setLabMiniOrderAmount(response.responseData.labMinOrderAmount);
            }else{
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
                setTimeout(() => {props.history.push(`/${DIAGNOSTICS_HOME}`)}, 2000);
            }
        }).catch(function(error) {
            setSummaryLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }


    const getLabRetryCartSummary = ()=>{
        setPaymentLoading(true);
        setSummaryLoading(true);
        labCheckoutService.getRetryPaymentLabOrderSummary({orderId:props.match.params.orderId, needToChangeLocality:false, retryPayment:true}).then(response => {
            setSummaryLoading(false);
            setPaymentLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                setLabCartSummary(response.responseData.orderSummary);
                setPaymentConfigData(response.responseData.paymentDetails);
                setLabMiniOrderAmount(response.responseData.labMinOrderAmount);
                reloadSelectedLocalityInfo(null,null,dispatch);
            }else{
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
                setTimeout(() => {props.history.push(`/${DIAGNOSTICS_HOME}`)}, 2000);
            }
        }).catch(function(error) {
            setSummaryLoading(false);
            setPaymentLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const getCaptchaImage = () => {
        labCheckoutService.getCaptch().then((response)=>{
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
        if(retryPayment){
            labCheckoutService.submitLabRetryOrder(obj).then((response)=>{
                handleLabOrderSubmitResponse(response, paymentType, obj);
            },(err)=>{
                console.log(err);
                setAlertInfo({message:"Something Went Wrong!", type: ""});
                setCODOrderBtnLoading(false);
                setOnlineOrderBtnLoading(false);
            })
        }else{
            labCheckoutService.submitLabOrder(obj).then((response)=>{
                handleLabOrderSubmitResponse(response, paymentType, obj);
            },(err)=>{
                console.log(err);
                setAlertInfo({message:"Something Went Wrong!", type: ""});
                setCODOrderBtnLoading(false);
                setOnlineOrderBtnLoading(false);
            })
        }

    }

    const handleLabOrderSubmitResponse =(response, paymentType, obj)=>{
        if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
            labNewCheckoutAction.saveLabOrderId(response.responseData.orderIdForRetryPayment);
            if(paymentType==='C'){
                setCODOrderBtnLoading(false);
                props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-thank-you`);
            }else if(paymentType==='O'){
                setOnlineOrderBtnLoading(undefined);
                handlePaymentSubmit({...response.responseData,...obj});
            }
        }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
            if(paymentType==='C'){
                getCaptchaImage();
            }
            setCODOrderBtnLoading(false);
            setOnlineOrderBtnLoading(undefined);
            if("LAB_SLOTS_ALREADY_FILLED" === response.message || "Agent has reached max limit for this slot, Please select different slot OR Agent" === response.message){
                setAlertInfo({message:"Selected slot is full, please select another slot", type: ""})
                setTimeout(() => props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/schedule-slot`), 2000);
            }else{
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            }
        }else{
            setAlertInfo({message:"Something Went Wrong!", type: ""})
            setCODOrderBtnLoading(false);
            setOnlineOrderBtnLoading(undefined);
        }
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

    const addMoreTest = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL + `${DIAGNOSTICS_HOME}`;
    }

    const handleBackButton = ()=>{
        if(retryPayment){
            setOpenModal(true);
        }else{
            redirectTo(`${DIAGNOSTICS_URL_PREFIX}/lab-review-cart`);
        }
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

        var referenceId = { "name": "referenceId", "value": dataObj.referenceId };
        
        inputArray.push(referenceId);

        var amount = { "name": "amount", "value": dataObj.amount};
        inputArray.push(amount);

        var company = { "name": "company", "value": "optival" };
        inputArray.push(company);

        const userInfo = dataObj.userDetails;

        var userId = { "name": "userId", "value": Validate().isEmpty(userInfo.webLoginID) ? userInfo.customerID : userInfo.webLoginID};
        inputArray.push(userId);
        
        if(validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.emailId) && validate.email(userInfo.emailId)){
            inputArray.push({"name":"email","value":userInfo.emailId});
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

    const forceCancelTheOrder = () => {
        setOpenModal(false);
        labCheckoutService.forceCancelTheOrder().then(data=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" === data.statusCode){
                props.history.replace(`/${DIAGNOSTICS_HOME}`);    
            }else{
                console.log(data);
            }
        }).catch(function(error){
            console.error(error);
            props.history.replace(`/${DIAGNOSTICS_HOME}`);
        });
    }

    return(
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>}
            <main role="main" className="container-lg container-fluid">
            {!isBankListPage &&
                <div className="row px-sm-3">
                     {(isPaymentLoading || isSummaryLoading) && 
                    <PaymentGhostImage paymentLoader={isPaymentLoading} orderReviewLoader={isSummaryLoading}/>
                     }
                    {validate.isNotEmpty(paymentConfigData) &&
                    <div className="col-8 pl-0 pr-2">
                        <section>
                            <div className="header">
                                <p>Payment Options</p>
                            </div>
                            <div className="payment-options pt-2">
                                {validate.isNotEmpty(labCartSummary) && parseFloat(labCartSummary.cartSummary.totalAmount) >= parseFloat(labMinOrderAmount) &&
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
                                }
                            </div>
                        </section>
                    </div>
                    }
                    {validate.isNotEmpty(labCartSummary) &&
                        <div className="col-4 pl-2 pr-0">
                            <LabCartSummary couponCode={labCartSummary.couponApplied} {...labCartSummary.cartSummary}/>
                            <CollectionDetails
                            patientAddress={labCartSummary.homeAddress}
                            storeAddress={labCartSummary.labAddress}
                            reportDeliveryType={labCartSummary.reportDeliveryData.deliveryType}
                            reportDeliveryAddress={labCartSummary.reportDeliveryData.address}
                            timeSlot ={labCartSummary.walkInLabOrderItems && labCartSummary.walkInLabOrderItems[0].labOrderItemSlot ? labCartSummary.walkInLabOrderItems[0].labOrderItemSlot : labCartSummary.homeLabOrderItems[0].labOrderItemSlot} />
                        </div>
                    }
                </div>}
                {paymentConfigData && isBankListPage &&
                    <div className="row  px-sm-3">
                        <div className="col-12">
                            <NetBankingMode bankList={paymentConfigData.netBankingData}
                            handleBackClick={()=>setBankListPage(false)}
                            totalPayble={labCartSummary.cartSummary.totalAmount}
                            onPaymentSelect={handleNBModeClick}
                            createOrderLoader={isOnlineOrderBtnLoading}/>
                        </div>
                    </div>
                }
            </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-6">
                            {labMinOrderAmount && validate.isNotEmpty(labCartSummary) && labMinOrderAmount > 0 && (parseFloat(labCartSummary.cartSummary.totalAmount) < parseFloat(labMinOrderAmount)) &&
                                <p className="alert alert-warning alert-sm px-2 py-1 m-0"><strong>Note:</strong> Minimum order amount should be above ₹ {labMinOrderAmount}</p>
                            }
                        </div>
                        <div className="col-6 text-right">
                            <React.Fragment>
                                <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={handleBackButton}>back</button>
                                {!retryPayment && 
                                    <button type="submit" role="button" className="btn btn-outline-brand px-5 ml-3 rounded-pill custom-btn-lg" data-toggle="modal" data-target=".refill-interval-popup" onClick={addMoreTest}>
                                        add more tests
                                    </button>
                                }
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </footer>
            <ForceCancelConfirmationModal openModal = {openModal} toggleModel={()=>{setOpenModal(!openModal)}} 
            handleConfirmation={(flag)=>{
                setOpenModal(false);
                if(flag=='true'){
                    forceCancelTheOrder();
                }else{
                    return false;
                }
            }}/>
        </React.Fragment>
    )
}

export const CollectionDetails = (props) =>{
    return(
        <React.Fragment>
            <section className="delivery-detail mb-3">
                <div className="header">
                    <p>Collection Details</p>
                    {props.patientAddress ?
                    <span className="badge-title success right">Home Sample Pickup</span>:
                    <span className="badge-title success right">Sample Collection Center</span>
                    }
                </div>
                <div className="body">
                    {props.patientAddress &&
                    <PatientAddress isHeaderRequired={true} 
                    firstName={props.patientAddress.firstName}
                    lastName={props.patientAddress.lastName}
                    address1={props.patientAddress.addressLine1}
                    address2={props.patientAddress.addressLine2}
                    city={props.patientAddress.city}
                    state={props.patientAddress.state}
                    pinCode={props.patientAddress.pincode}
                    mobile={props.patientAddress.mobileNo}
                    locationConfigId={props.patientAddress.locationConfigId}/>}
                    {props.storeAddress &&
                    <ShowPickUpStore
                    pickStoreName={props.storeAddress.name}
                    pickUpAddress={props.storeAddress.address}
                    locationLatLong={props.storeAddress.locationLatLong}
                    phoneNumber={props.storeAddress.phoneNumber}
                    isSmallAddressRequired={true} excludeBodyClass={true}/>}
                    {props.timeSlot &&
                    <React.Fragment>
                        <hr className="my-3 border-bottom-0"/>
                        <SlotDetails date={props.timeSlot.date} slotDisplayName={props.timeSlot.labTimeSlot.displayName}/>
                    </React.Fragment>
                    }
                </div>
            </section>
            {props.reportDeliveryType && props.reportDeliveryType=="HOME" &&
            <section className="delivery-detail mb-3">
                <div className="header">
                    <p>Report Delivery Address</p>
                </div>
                <div className="body">
                    {props.reportDeliveryAddress &&
                    <PatientAddress isHeaderRequired={false} 
                    firstName={props.reportDeliveryAddress.firstName}
                    lastName={props.reportDeliveryAddress.lastName}
                    address1={props.reportDeliveryAddress.addressLine1}
                    address2={props.reportDeliveryAddress.addressLine2}
                    city={props.reportDeliveryAddress.city}
                    state={props.reportDeliveryAddress.state}
                    pinCode={props.reportDeliveryAddress.pincode}
                    mobile={props.reportDeliveryAddress.mobileNo}
                    locationConfigId={props.reportDeliveryAddress.locationConfigId}/>}
                </div>
            </section>}
        </React.Fragment>
    )
}
export default LabPayment