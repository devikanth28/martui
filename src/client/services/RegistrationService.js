import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function CommonHeaderService() {

    function registerNewCustomer(registrationObject) {
        return ServerRequest(CONFIG.API.REGISTRATION.REGISTER_NEW_CUSTOMER.HEADER.method, registrationObject, CONFIG.API.REGISTRATION.REGISTER_NEW_CUSTOMER.PATH);
    }
    function getRegistrationOtpDetails(){
        return ServerRequest(CONFIG.API.REGISTRATION.GET_REGISTRATION_OTP_DETAILS.HEADER.method, {}, CONFIG.API.REGISTRATION.GET_REGISTRATION_OTP_DETAILS.PATH);
    }
    function verifyRegistrationOTP(otpValue){
        return ServerRequest(CONFIG.API.REGISTRATION.VERIFY_REGISTRATION_OTP.HEADER.method, {otp:otpValue}, CONFIG.API.REGISTRATION.VERIFY_REGISTRATION_OTP.PATH);
    }
    function regenerateOtpForRegistration(){
        return ServerRequest(CONFIG.API.REGISTRATION.REGENERATE_REGISTRATION_OTP.HEADER.method, {}, CONFIG.API.REGISTRATION.REGENERATE_REGISTRATION_OTP.PATH);
    }
    function loginWithPassword(obj){
        return ServerRequest(CONFIG.API.LOGIN.LOGIN_WITH_PASSWORD.HEADER.method, {loginId:obj.loginId,password:obj.password,captchaCode:obj.captchaCode}, CONFIG.API.LOGIN.LOGIN_WITH_PASSWORD.PATH);
    }
    function forgetPassword(loginId){
        return ServerRequest(CONFIG.API.REGISTRATION.FORGET_PASSWORD.HEADER.method, {userName:loginId}, CONFIG.API.REGISTRATION.FORGET_PASSWORD.PATH)
    }
    function getLoginCaptcha(obj){
        return ServerRequest(CONFIG.API.REGISTRATION.GET_LOGIN_CAPTCHA.HEADER.method, obj, CONFIG.API.REGISTRATION.GET_LOGIN_CAPTCHA.PATH)
    }

    return Object.freeze({
        registerNewCustomer,
        getRegistrationOtpDetails,
        verifyRegistrationOTP,
        regenerateOtpForRegistration,
        loginWithPassword,
        forgetPassword,
        getLoginCaptcha
    })

}