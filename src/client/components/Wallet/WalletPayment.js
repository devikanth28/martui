import React, { useState, useEffect } from 'react';
import WalletService from '../../services/WalletService';
import CheckoutService from '../../services/CheckoutService';
import OtpDisplay from '../Common/OtpDisplay';
import HiddenForm from '../Checkout/Payments/HiddenForm';
import WalletIcon from '../../images/common/medpluswallet-icn.png';
import Wallet2xIcon from '../../images/common/medpluswallet-icn2x.png';
import ReloadWalletSection from './ReloadWalletSection';
import Alert from '../Common/Alert';
import WalletGhostImage from './WalletGhostImage';
import Validate from '../../helpers/Validate';
import { sendRetryPaymentEvent } from '../../Analytics/Analytics';
import { useDispatch, useSelector } from 'react-redux';
import {SET_CART_ID} from '../../../redux/reducer/CheckoutReducer';

const WalletPayment = (props) => {

    const validate = Validate();
    const dispatch = useDispatch();
    const [finalWalletObj, setFinalWalletObj] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resendOtpLoader, setResendOtpLoader] = useState(false);
    const [otpvalue, setOtpvalue] = useState();
    const [resendOtpFlag, setResendOtpFlag] = useState(true);
    const [resetOtpRequired, setResetOtpRequired] = useState(false);
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [continueToOtp, setContinueToOtp] = useState(false);
    const [disableRechargeOptions, setDisableRechargeOptions] = useState(false);
    const [amount, setAmount] = useState(null);
    const [useFlexi, setUseFlexi] = useState(false);
    const [paymentMode, setPaymentMode] = useState("CC");
    const [formData, setFormData] = useState(null);

    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
    const mWalletData = useSelector(state=>state?.checkout?.mWalletDetails);
    let isPayback = mWalletData?.isPayback;
    const OTP_PATTERN = /^[0-9]{6}$/;
    let retryOrderId = mWalletData?.retryOrderId || props.match.params.retryOrderId;

    useEffect(()=>{
        processMWalletDataToOldResponse();
        getMWalletAmount();
        if(props.location.errorData && props.location.errorData.errorMsg){
            setAlertInfo({ message: "We are processing your Request, Please wait..!", type: ""}); 
        }
    },[]);

    const getMWalletAmount = () => {
        setLoading(true);
        const obj = {retryCartId : retryOrderId,orderType : isPayback? 'PAYBACK_ORDER' : 'MART_ORDER'};
        CheckoutService().getMWalletAmount(obj).then(response=>{
            if(response && response.statusCode && response.statusCode === 'SUCCESS' && response.dataObject ){
                setAmount(parseInt(response?.dataObject?.minimumReloadAmount));
                    setFinalWalletObj((previous)=>{
                        return({...previous,...response.dataObject});
                    });
                if((response?.dataObject?.mWalletAmount>=response?.dataObject?.finalAmount)){
                    setDisableRechargeOptions(true);
                    setShowOtpSection(true);
                }
                
            }
            setLoading(false);
        }).catch((err)=>{
            setLoading(false);
            console.log(err);
        })
    }

    const processMWalletDataToOldResponse = ()=> {
        const mWalletResponse = {}; 
        if(validate.isNotEmpty(mWalletData)){
            mWalletResponse.finalAmount=mWalletData.finalAmount;
            mWalletResponse.shippingContactNumber = mWalletData?.mWalletDebitResponse?.mobileNumber;
            mWalletResponse.mWalletAmount=mWalletData?.mWalletDebitResponse?.mwalletAmount;
            mWalletResponse.flexiAmount=mWalletData?.mWalletDebitResponse?.flexiAmount;
            setFinalWalletObj(mWalletResponse);
        }
    }


    const handleOtpChange = (otpStr) => {
        setOtpvalue(otpStr);
        if (otpStr && otpStr.length === 6) {
            if(!OTP_PATTERN.test(otpStr) || parseInt(otpStr) < 0){
                return;
            }
            let otpObj ={"walletOtp":otpStr};
            verifyWalletOtp(otpObj);
        }
    }

    const submitOtp = () =>{
        if (otpvalue && otpvalue.length === 6) {
            if(!OTP_PATTERN.test(otpvalue) || parseInt(otpvalue) < 0){
                e.preventDefault();
                return;
            }
            let otpObj ={"walletOtp":otpvalue};
            verifyWalletOtp(otpObj);
        }else{
            setAlertInfo({ message: 'Enter Valid OTP', type: ""}); 
        }
    }

    const verifyWalletOtp = async(otpObject) => {
        const martOtpObject ={};
        martOtpObject.otp=otpObject.walletOtp
        martOtpObject.cartId=mWalletData?.cartId;
        martOtpObject.storeId=mWalletData?.storeId;
        martOtpObject.flexiAmount=mWalletData?.mWalletDebitResponse?.flexiAmount;
        martOtpObject.mwalletAmount=mWalletData?.mWalletDebitResponse?.mwalletAmount;
        martOtpObject.transactionId=mWalletData?.mWalletDebitResponse?.transactionId;
        setVerifyOtpLoader(true);
        try{
        const response =  await WalletService().verifyWalletOtpForDebit(martOtpObject);
            setVerifyOtpLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                try{
                    if(retryOrderId){
                        sendRetryPaymentEvent(true);
                    }
                }catch(err){
                    console.log(err);
                }
                props.history.replace({pathname : isPayback ? "/payback/thankyou" : "/thankyou" ,cartId : mWalletData?.cartId});
            }else{
                setResetOtpRequired(true);
                if(response?.dataObject?.otpRemainingCount && response?.dataObject?.resendOtpAllowed == true){
                    setAlertInfo({ message: "Invalid OTP, You have another "+response.dataObject.otpRemainingCount+" chances to verify OTP", type: ""});
                    //redirect to payment
                }
                else if(response?.dataObject?.resendOtpAllowed == false){
                    setResendOtpFlag(false);
                    setAlertInfo({ message: response?.message, type: ""});
                    handleCancelWalletTransaction(response?.message)
                }
                else {
                    setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""}); 
                    }
            }
        }
        catch(err){
            setVerifyOtpLoader(true);
            console.log(err);
        }
        }


    const resendOtp = async(e) => {
        e.preventDefault();
        setResendOtpLoader(true);
        const martOtpObject = {};
        martOtpObject.amount=mWalletData?.finalAmount;
        martOtpObject.storeId=mWalletData?.storeId;;
        martOtpObject.resendOtp=true;
        try{
        const response =  await WalletService().generateWalletOtpForMart(martOtpObject);
            setResetOtpRequired(true);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                setAlertInfo({ message: "OTP resent to your mobile", type: ""}); 
            }else{
                if(response.responseObject && response.responseObject.resendOtpAllowed==false){
                    setResendOtpFlag(false);
                }
                setAlertInfo({ message: response.message ? response.message:"System experiencing some problem, Please try after some time.", type: ""}); 
            }
            setResendOtpLoader(false);
        }
        catch(err){
            setResendOtpLoader(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""}); 
        }
    }


    const addAmount = (amt)=>{
        setAmount(parseInt(amount+parseInt(amt)));
    }

    const resetAmount = () => {
        setAmount(parseInt(finalWalletObj.minimumReloadAmount));
    }

    const handleFlexiChoice = (e)=>{
        let obj;
        if(e.target.checked){
            obj = {"isFlexiIncluded":"Y"}
        }else{
            obj = {"isFlexiIncluded":"N"}
        }
        updateWalletAndFinalAmount(obj);
    }

    const selectPaymentMode = (e) => {
        const { name, value } = e.target;
        setPaymentMode(value);
    }

    const continueToPay = ()=>{
        let paymentObj = {
            paymentType:"O",
            instrument:"MW",
            PAYMENT_MODE:"MW"
        }
        CheckoutService().omsOrderCreationProcess(paymentObj,retryOrderId,isPayback).then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                setShowOtpSection(true);
                dispatch({type: SET_CART_ID, data: (validate.isNotEmpty(retryOrderId) || !isPayback) ? response.responseData.orderList[0].cartId : response.dataObject.orderList[0].cartId});
                setDisableRechargeOptions(true);
            }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
                if(response.message=="MIN_AMOUNT_ERROR"){
                    setAlertInfo({message:"Order Failed", type: ""});
                }
                if(response.message=="INVALID_PROMOTION_TYPE"){
                    props.history.push({
                        pathname:'/shoppingCart',
                        errorData: { errorMsg: "Invalid promotion type, Please select valid promotion."}
                    });
                }
                if(!response.message || response.message.indexOf("_")>-1){
                    setAlertInfo({message:"Something Went Wrong!", type: ""});
                }else{
                    setAlertInfo({message:response.message, type: ""});
                }
            }else{
                setAlertInfo({message:"Something Went Wrong!", type: ""});
            }
        },(err)=>{
            setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""}); 
        })
    }

    const rechargeWallet = () =>{
        if(paymentMode === undefined || paymentMode == null){
            var elm = document.getElementById("selectPayment");
            elm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            setAlertInfo({ message: "Please Select Payment Mode", type: ""});
            return;
        }
        if(amount === undefined || amount===null){
            setAlertInfo({ message: "Amount Can't be empty", type: ""});
            return;
        }
        const obj = {
            "walletAmount" : amount,
            "paymentMode" : paymentMode,
            "requestFrom" : 'MART_CHECKOUT'
        }
        setLoading(true);
        WalletService().rechargeWalletCheckout(obj).then(response => {
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                handlePaymentRedirect(response.dataObject);
            }else{
                setLoading(false);
                setAlertInfo({ message: response.message ? response.message:"System experiencing some problem, Please try after some time.", type: ""});
            }
        },(err)=>{
            setLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""});
        })
    }

    const redirectToPayment = ()=>{
        if(retryOrderId){
            props.history.push('/payment/'+retryOrderId);
        }else{
            props.history.push(isPayback ? '/payback/payment' : '/payment');
        }
    }

    const handleCancelWalletTransaction = (reason)=> {
        CheckoutService().handleCancelWalletTransaction({cartId : mWalletData?.cartId,reason:reason}).then(response=>{

            if(response && response.statusCode=='SUCCESS') {
                props.history.push(`/payment/${mWalletData?.cartId}`);
            }
            else if(response && response.statusCode == 'FAILURE'){
                setAlertInfo({ message: response.message, type: ""}); 
            }
        })
        .catch(err=>{
            console.log(err);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""}); 
        })
    }

    const closeAlertMessage = () => {
        setAlertInfo({});
    }

    const handlePaymentRedirect = (data) =>{
        const parameters = data.parameters;
        var formData = {};
        var inputArray = [];

        var formValues = {
            "formId" : "paymentForm",
            "formAction" : data.processTransactionURL+"?orderid="+parameters.ORDER_ID,
            "formMethod" : "post",
            "formStyle":{display:'none'}
        }

        var checkSumHash = {"name": "CHECKSUMHASH", "value":parameters.CHECKSUMHASH};
        inputArray.push(checkSumHash);

        var channelId = {"name": "CHANNEL_ID", "value":parameters.CHANNEL_ID};
        inputArray.push(channelId);

        var custId = {"name": "CUST_ID" , "value":parameters.CUST_ID};
        inputArray.push(custId);

        var email = {"name": "EMAIL", "value":parameters.EMAIL};
        inputArray.push(email);

        var industryTypeId = {"name": "INDUSTRY_TYPE_ID", "value":parameters.INDUSTRY_TYPE_ID};
        inputArray.push(industryTypeId);

        var mid= {"name": "MID", "value":parameters.MID};
        inputArray.push(mid);

        var mobileNo = {"name": "MOBILE_NO", "value":parameters.MOBILE_NO};
        inputArray.push(mobileNo);

        var orderId = {"name": "ORDER_ID","value":parameters.ORDER_ID};
        inputArray.push(orderId);

        var requestType = {"name": "REQUEST_TYPE", "value":parameters.REQUEST_TYPE};
        inputArray.push(requestType);

        var txnAmount = {"name": "TXN_AMOUNT", "value":parameters.TXN_AMOUNT};
        inputArray.push(txnAmount);

        var website = {"name": "WEBSITE", "value":parameters.WEBSITE};
        inputArray.push(website);

        var callbackUrl = {"name": "CALLBACK_URL", "value":parameters.CALLBACK_URL};
        inputArray.push(callbackUrl);

        var authMode = {"name": "AUTH_MODE", "value":parameters.AUTH_MODE};
        inputArray.push(authMode);

        var paymentModeOnly = {"name": "PAYMENT_MODE_ONLY" , "value":parameters.PAYMENT_MODE_ONLY};
        inputArray.push(paymentModeOnly);

        var paymentTypeId = {"name": "PAYMENT_TYPE_ID", "value":parameters.PAYMENT_TYPE_ID};
        inputArray.push(paymentTypeId);

        formData = {...formValues, inputArray : inputArray};
        setFormData(formData);
    }

    if(formData){
        return (
            <HiddenForm formData = {formData} />
        )
    }
    if(loading){
        return(<WalletGhostImage/>);
    }
    return(
        <React.Fragment>
            {!loading && finalWalletObj &&
            <main role="main" className="container">
            <div className="row">
                <div className="col-8 pl-2 pr-0 order-last">
                    {!showOtpSection ?
                    <ReloadWalletSection finalWalletObj={finalWalletObj} handleFlexiChoice={handleFlexiChoice}
                    disableRechargeOptions={disableRechargeOptions} amount={amount} addAmount={addAmount} 
                    selectPaymentMode={selectPaymentMode} handleResetClick={resetAmount}/>
                    :
                    <OtpDisplay type='WALLET' digits = {6} mobileNumber={finalWalletObj.shippingContactNumber}
                            setOtpStr={handleOtpChange} 
                            resetOtp={resetOtpRequired} setOtpResetFlag = {() => {setResetOtpRequired(false); setOtpvalue("")}}
                            showResendOtp={resendOtpFlag} handleResendOtp = {resendOtp} 
                            resendOtpLoader = {resendOtpLoader}/>}
                </div>
                <div className="col-4 pl-0 pr-2 order-first">
                    <section className="body-height">
                        {!disableRechargeOptions ?
                        <div className="header">
                            <p>Add Money to Wallet</p>
                        </div>:
                        <div className="header">
                            <p>Pay Through Wallet</p>
                        </div>}
                        <div className="wallet-container">
                            <div className="card">
                                <p>
                                    Total order Amount to be paid
                                </p>
                                <h4>
                                    <strong className="rupee">&#x20B9;</strong> {parseFloat(finalWalletObj.finalAmount).toFixed(2)}
                                </h4>
                            </div>
                            {!disableRechargeOptions &&
                            <h6>
                                You are short of <strong className="rupee">&#x20B9;</strong> 
                                {useFlexi ? parseFloat((finalWalletObj.finalAmount - (finalWalletObj.mWalletAmount + finalWalletObj.flexiAmount))).toFixed(2) : parseFloat(finalWalletObj.finalAmount - finalWalletObj.mWalletAmount).toFixed(2)}
                            </h6>}
                            <div className="wallet-details">
                                <img srcSet={`${WalletIcon} 1x, ${Wallet2xIcon} 2x`} alt="MedPlus Wallet" title="MedPlus Wallet"/>
                                <div className="w-100">
                                    <p>
                                        <span>MedPlusCash:</span>
                                        <span><strong className="rupee">&#x20B9;</strong> {parseFloat(finalWalletObj.mWalletAmount).toFixed(2)}</span>
                                    </p>
                                </div>
                            </div>
                            {!showOtpSection &&
                            <div className="footer wallet-note-text">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18">
                                    <g transform="translate(-762 -1106)">
                                        <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(761.437 1105.438)"></path>
                                    </g>
                                    </svg>
                                    Note:
                                </p>
                                <ol>
                                    <li>
                                    Only RegularCash will be loaded
                                    </li>
                                    <li>
                                    You will get 20% discount using wallet of medicines
                                    </li>
                                </ol>
                            </div>}
                        </div>
                    </section>
                </div>
            </div>
            {!showOtpSection ?<footer className="footer fixed-bottom mt-auto py-2">
                <div className="container container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={redirectToPayment}>back</button>
                            {continueToOtp ? 
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={continueToPay}>Proceed</button>:
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={rechargeWallet}>Add Money To Wallet</button>}
                        </div>
                    </div>
                </div>
            </footer>:
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>handleCancelWalletTransaction('Transaction has been failed,Because Of Cancel Request by Customer.')}>CANCEL</button>
                            <button type="button" className="brand-secondary btn px-5 rounded-pill ml-3" onClick={submitOtp}>
                            {verifyOtpLoader ? "" : "SUBMIT"}
                            {verifyOtpLoader &&
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            }
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
            }
        </main>}
        {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration={5000}/>}
    </React.Fragment>
    )
}

export default WalletPayment;