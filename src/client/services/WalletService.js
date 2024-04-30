import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function WalletService() {

    function getWalletAndFinalAmount(isPayback){
        return ServerRequest(CONFIG.API.WALLET.GET_WALLET_AND_FINALAMOUNT.HEADER.method, {isPayback:isPayback}, CONFIG.API.WALLET.GET_WALLET_AND_FINALAMOUNT.PATH);
    }

    function updateWalletAndFinalAmount(obj){
        return ServerRequest(CONFIG.API.WALLET.UPDATE_WALLET_AND_FINALAMOUNT.HEADER.method, obj, CONFIG.API.WALLET.UPDATE_WALLET_AND_FINALAMOUNT.PATH);
    }

    function getWalletAndFinalAmountForRetry(isPayback){
        return ServerRequest(CONFIG.API.WALLET.GET_WALLET_AND_FINALAMOUNT_FOR_RETRY.HEADER.method, {isPayback:isPayback}, CONFIG.API.WALLET.GET_WALLET_AND_FINALAMOUNT_FOR_RETRY.PATH);
    }

    function verifyWalletOtp(obj,isPayback){
        return ServerRequest(CONFIG.API.WALLET.VERIFY_WALLET_OTP.HEADER.method, {...obj,isPayback:isPayback}, CONFIG.API.WALLET.VERIFY_WALLET_OTP.PATH);
    }

    function rechargeWallet(obj){
        return ServerRequest(CONFIG.API.WALLET.ADD_MONEY_TO_WALLET.HEADER.method, obj, CONFIG.API.WALLET.ADD_MONEY_TO_WALLET.PATH);
    }

    function rechargeWalletCheckoutFlow(obj){
        return ServerRequest(CONFIG.API.WALLET.ADD_MONEY_TO_WALLET_CHECKOUT_FLOW.HEADER.method, obj, CONFIG.API.WALLET.ADD_MONEY_TO_WALLET_CHECKOUT_FLOW.PATH);
    }

    function generateWalletOtp(isPayback){
        return ServerRequest(CONFIG.API.WALLET.GENERATE_WALLET_OTP.HEADER.method, {isPayback:isPayback}, CONFIG.API.WALLET.GENERATE_WALLET_OTP.PATH);
    }

    function getOtpOnCall(obj){
        return ServerRequest(CONFIG.API.WALLET.GET_WALLET_OTP_ON_CALL.HEADER.method, obj, CONFIG.API.WALLET.GET_WALLET_OTP_ON_CALL.PATH);
    }

    function submitKYCForm(customerKycDetails){
        return ServerRequest(CONFIG.API.WALLET.KYC.SUBMIT_KYC_FORM.HEADER.method, customerKycDetails, CONFIG.API.WALLET.KYC.SUBMIT_KYC_FORM.PATH);
    }

    function verifyCustomerKycOtp(customerKycDetails){
        return ServerRequest(CONFIG.API.WALLET.KYC.VERIFY_CUSTOMER_KYC_OTP.HEADER.method, customerKycDetails, CONFIG.API.WALLET.KYC.VERIFY_CUSTOMER_KYC_OTP.PATH);
    }

    function submitPanDetails(panImageData, panNo){
        return ServerRequest(CONFIG.API.WALLET.UPLOAD_PAN_DETAILS.HEADER.method, {'imageUploadDetails':JSON.stringify(panImageData),'PAN_NO':panNo}, CONFIG.API.WALLET.UPLOAD_PAN_DETAILS.PATH);
    }

    const verifyWalletOtpForDebit = (obj)=> {
        return ServerRequest(CONFIG.API.WALLET.VERIFY_WALLET_OTP_FOR_DEBIT.HEADER.method,obj, CONFIG.API.WALLET.VERIFY_WALLET_OTP_FOR_DEBIT.PATH);
    } 
    const generateWalletOtpForMart = (obj) => {
        return ServerRequest(CONFIG.API.WALLET.GENERATE_WALLET_OTP_FOR_MART.HEADER.method,obj, CONFIG.API.WALLET.GENERATE_WALLET_OTP_FOR_MART.PATH);

    }

    const getMinimumReloadAmountAndFinalAmountForMart = (obj) => {
        return ServerRequest(CONFIG.API.WALLET.GET_MINIMUM_RELOAD_AMOUNT_AND_MWALLET_AMOUNT_FOR_MART.HEADER.method,obj, CONFIG.API.WALLET.GET_MINIMUM_RELOAD_AMOUNT_AND_MWALLET_AMOUNT_FOR_MART.PATH);
    }

    const rechargeWalletCheckout = (obj) => {
        return ServerRequest(CONFIG.API.WALLET.RECHARGE_WALLET_CHECKOUT.HEADER.method,obj, CONFIG.API.WALLET.RECHARGE_WALLET_CHECKOUT.PATH); 
    }
    

    return Object.freeze({
        getWalletAndFinalAmount,
        updateWalletAndFinalAmount,
        getWalletAndFinalAmountForRetry,
        verifyWalletOtp,
        rechargeWallet,
        rechargeWalletCheckoutFlow,
        generateWalletOtp,
        getOtpOnCall,
        submitKYCForm,
        verifyCustomerKycOtp,
        submitPanDetails,
        verifyWalletOtpForDebit,
        generateWalletOtpForMart,
        getMinimumReloadAmountAndFinalAmountForMart,
        rechargeWalletCheckout
    });
}