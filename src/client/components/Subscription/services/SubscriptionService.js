import serverRequest from "../../../axios";
import CONFIG from "../../../constants/ServerConfig";

const SubscriptionService = () => {

    const getSubscriptionBanner = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_BANNER_DETAILS.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.GET_BANNER_DETAILS.PATH);
    }
    const getSubscriptionContent = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTION_CONTENT.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTION_CONTENT.PATH);
    }
    const customerGetOtp=(obj) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.GET_OTP.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.GET_OTP.PATH);
    }
    const otpVerifyForOldCustomer = (obj) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.OTP_VERIFY_FOR_OLD_CUST.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.OTP_VERIFY_FOR_OLD_CUST.PATH);
    }
    const otpVerifyForNewCustomer = (obj) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.OTP_VERIFY_FOR_NEW_CUST.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.OTP_VERIFY_FOR_NEW_CUST.PATH);
    }
    const resendOtp = (obj) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.RESEND_OTP.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.CUSTOMER_LOGIN.RESEND_OTP.PATH);
    }
    
    const getSubscriptionPlanDetails = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_PLAN_DETAILS.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.GET_PLAN_DETAILS.PATH);
    }
    const getOrganizations = () =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_ORGANIZATIONS.HEADER.method,{},CONFIG.API.SUBSCRIPTION.GET_ORGANIZATIONS.PATH);
    }
    const getPlansForOrganization = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_PLANS_FOR_ORGANIZATION.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.GET_PLANS_FOR_ORGANIZATION.PATH);
    }

    const sendEmailOtpForCorporatePlan = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.SEND_EMAIL_OTP_FOR_CORPORATE_PLAN.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.SEND_EMAIL_OTP_FOR_CORPORATE_PLAN.PATH);
    }

    const resendEmailOtpForCorporatePlan = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.RESEND_EMAIL_OTP_FOR_CORPORATE_PLAN.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.RESEND_EMAIL_OTP_FOR_CORPORATE_PLAN.PATH);
    }

    const validateEmailOtpForCorporatePlan = (obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.VALIDATE_EMAIL_OTP_FOR_CORPORATE_PLAN.HEADER.method, obj, CONFIG.API.SUBSCRIPTION.VALIDATE_EMAIL_OTP_FOR_CORPORATE_PLAN.PATH);
    }

    const getMembersForCustomer=(obj)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_PATIENTS_FOR_CUSTOMER.HEADER.method,obj,CONFIG.API.SUBSCRIPTION.GET_PATIENTS_FOR_CUSTOMER.PATH);
    }

    const getPlanDetails=(obj)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_PLAN_DETAILS.HEADER.method,obj,CONFIG.API.SUBSCRIPTION.GET_PLAN_DETAILS.PATH);
    }

    const validatePlanSpecificMembers=(obj)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.VALIDATE_MEMBERS_FOR_PLAN.HEADER.method,obj,CONFIG.API.SUBSCRIPTION.VALIDATE_MEMBERS_FOR_PLAN.PATH);
    }
 
    const saveMembersForPlan=(obj)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.SAVE_MEMBERS_FOR_PLAN.HEADER.method,obj,CONFIG.API.SUBSCRIPTION.SAVE_MEMBERS_FOR_PLAN.PATH);
    }

    const getSubscriptions = (data) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTIONS.HEADER.method, data, CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTIONS.PATH);
    }

    const getCustomerPlanPurchaseEligibility = (data) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_CUSTOMER_PLAN_PURCHASE_ELIGIBILITY.HEADER.method, data, CONFIG.API.SUBSCRIPTION.GET_CUSTOMER_PLAN_PURCHASE_ELIGIBILITY.PATH);
    }

    const getSubscriptionsWithComboPlan = (data) => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTIONS_WITH_COMBO_PLAN.HEADER.method, data, CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTIONS_WITH_COMBO_PLAN.PATH);
    }
    
    
    const getPaymentListDetails = () =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_PAYMENTS_LIST_DETAILS.HEADER.method, {}, CONFIG.API.SUBSCRIPTION.GET_PAYMENTS_LIST_DETAILS.PATH);
    }    
       
    const createOrganization = (data) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.CREATE_ORGANIZATION.HEADER.method, data, CONFIG.API.SUBSCRIPTION.CREATE_ORGANIZATION.PATH);
    }

    const getSubscriptionOrder =(data)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTION_ORDER.HEADER.method,data,CONFIG.API.SUBSCRIPTION.GET_SUBSCRIPTION_ORDER.PATH);
    }

    const getCartSummary=(obj) =>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_CART_SUMMARY.HEADER.method,obj,CONFIG.API.SUBSCRIPTION.GET_CART_SUMMARY.PATH);
    }

    const getRetryPaymentOrderSummary = (data)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_RETRY_PAYMENT_ORDER_SUMMARY.HEADER.method,data,CONFIG.API.SUBSCRIPTION.GET_RETRY_PAYMENT_ORDER_SUMMARY.PATH);
    }

    const createSubscriptionOrder =(data)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.CREATE_SUBSCRIPTION_ORDER.HEADER.method,data,CONFIG.API.SUBSCRIPTION.CREATE_SUBSCRIPTION_ORDER.PATH);
    }

    const createRetryOrder = (data)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.CREATE_RETRY_ORDER.HEADER.method,data,CONFIG.API.SUBSCRIPTION.CREATE_RETRY_ORDER.PATH);
    }

    const isCorporateEmailVerified = (data)=>{
        return serverRequest(CONFIG.API.SUBSCRIPTION.IS_CORPORATE_EMAIL_VERIFIED.HEADER.method,data,CONFIG.API.SUBSCRIPTION.IS_CORPORATE_EMAIL_VERIFIED.PATH);
    }
    
    const deleteMember = (data) =>{
    	return serverRequest(CONFIG.API.SUBSCRIPTION.DELETE_MEMBER.HEADER.method,data,CONFIG.API.SUBSCRIPTION.DELETE_MEMBER.PATH);
    }

    const cancelSubscriptionOrder = (data) =>{
    	return serverRequest(CONFIG.API.SUBSCRIPTION.CANCEL_SUBSCRIPTION_ORDER.HEADER.method,data,CONFIG.API.SUBSCRIPTION.CANCEL_SUBSCRIPTION_ORDER.PATH);
    }

    const getHomePagePlans = () => {
        return serverRequest(CONFIG.API.SUBSCRIPTION.GET_HOME_PAGE_PLANS.HEADER.method, {}, CONFIG.API.SUBSCRIPTION.GET_HOME_PAGE_PLANS.PATH);
    }

    return Object.freeze({
        getSubscriptionBanner,
        getSubscriptionContent,
        customerGetOtp,
        otpVerifyForOldCustomer,
        otpVerifyForNewCustomer,
        getSubscriptionContent,
        getSubscriptionPlanDetails,
        getOrganizations,
        getPlansForOrganization,
        getSubscriptionPlanDetails,
        sendEmailOtpForCorporatePlan,
        resendEmailOtpForCorporatePlan,
        validateEmailOtpForCorporatePlan,
        resendOtp,
        getMembersForCustomer,
        getPlanDetails,
        saveMembersForPlan,
        validatePlanSpecificMembers,
        getSubscriptions,
        getPaymentListDetails,
        createOrganization,
        getSubscriptionOrder,
        getCartSummary,
        createSubscriptionOrder,
        getRetryPaymentOrderSummary,
        createRetryOrder,
        isCorporateEmailVerified,
        deleteMember,
        cancelSubscriptionOrder,
        getSubscriptionsWithComboPlan,
        getCustomerPlanPurchaseEligibility,
        getHomePagePlans
    });
}
export default SubscriptionService;