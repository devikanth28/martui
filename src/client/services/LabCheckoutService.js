import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function LabCheckoutService(){

    function getLabShoppingCart(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_LAB_SHOPPING_CART.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_LAB_SHOPPING_CART.PATH);
    }
    function removeShoppingCartItem(testCode){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.REMOVE_LAB_SHOPPING_CART_ITEM.HEADER.method, {testCode: testCode}, CONFIG.API.LAB_CHECKOUT.REMOVE_LAB_SHOPPING_CART_ITEM.PATH);
    }
    function applyCouponCodeInShoppingCart(couponCode){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.APPLY_COUPON_ON_SHOPPING_CART.HEADER.method, {couponCode: couponCode}, CONFIG.API.LAB_CHECKOUT.APPLY_COUPON_ON_SHOPPING_CART.PATH);
    }
    function getLastOrderAddress() {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_LAST_ORDER_ADDRESS.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_LAST_ORDER_ADDRESS.PATH);
    }
    function getCustomerAddresses() {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_CUSTOMER_ADDRESSES.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_CUSTOMER_ADDRESSES.PATH);
    }
    function getLastVisitCollectionCenter() {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_LAST_VISITED_COLLECTION_CENTRE.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_LAST_VISITED_COLLECTION_CENTRE.PATH);
    }
    function getCollectionCenters() {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_COLLECTION_CENTRES.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.GET_COLLECTION_CENTRES.PATH);
    }
    function addSampleCollectionConfig(visitType, selectedCollectionCenterId, homeSamplePickupAddress) {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.ADD_SAMPLE_COLLECTION_CONFIG.HEADER.method, {visitType: visitType, selectedCollectionCenterId: selectedCollectionCenterId, address: homeSamplePickupAddress}, CONFIG.API.LAB_CHECKOUT.SAMPLE_COLLECTION.ADD_SAMPLE_COLLECTION_CONFIG.PATH);
    }
    function applyCouponCode(couponCode){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.APPLY_COUPON_CODE.HEADER.method, {couponCode: couponCode}, CONFIG.API.LAB_CHECKOUT.APPLY_COUPON_CODE.PATH);
    }
    function removeCouponCode(couponCode){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.REMOVE_COUPON_CODE.HEADER.method, {couponCode: couponCode}, CONFIG.API.LAB_CHECKOUT.REMOVE_COUPON_CODE.PATH);
    }
    function getPreviousPatientDetails(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.PATIENT_INFO.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.PATIENT_INFO.PATH);
    }  
    function getAvailableSlots() {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_AVAILABLE_SLOT_INFO.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_AVAILABLE_SLOT_INFO.PATH);
    }
    function saveNewPatientDetails(obj){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.SAVE_NEW_PATIENT_INFO.HEADER.method,obj, CONFIG.API.LAB_CHECKOUT.SAVE_NEW_PATIENT_INFO.PATH);
    }
    function getCustomerDetails(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_CUSTOMER_DETAILS.HEADER.method,{}, CONFIG.API.LAB_CHECKOUT.GET_CUSTOMER_DETAILS.PATH);
    }
    function getShoppingCartInfo(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_SHOPPING_CART_INFO.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_SHOPPING_CART_INFO.PATH);
    }
    function getPaymentConfig(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_PAYMENT_CONFIG.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_PAYMENT_CONFIG.PATH);
    }
    function addReportDeliveryToCart(param) {
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.ADD_REPORT_DELIVERY.HEADER.method, param, CONFIG.API.LAB_CHECKOUT.ADD_REPORT_DELIVERY.PATH);
    }
    function getCaptcha(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_CAPTCHA_DATA.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_CAPTCHA_DATA.PATH);
    }
    function savePatientAndSlotInfoToCart(obj){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.ADD_PATIENT_AND__SLOT_INFO.HEADER.method, obj, CONFIG.API.LAB_CHECKOUT.ADD_PATIENT_AND__SLOT_INFO.PATH);
    }
    function createLabOrder (paymentObj){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.CREATE_LAB_ORDER.HEADER.method, paymentObj, CONFIG.API.LAB_CHECKOUT.CREATE_LAB_ORDER.PATH);
    }
    function getLabOrderSummaryDetails(){
        return ServerRequest(CONFIG.API.LAB_CHECKOUT.GET_THANK_YOU_DETAILS.HEADER.method, {}, CONFIG.API.LAB_CHECKOUT.GET_THANK_YOU_DETAILS.PATH);
    }

    function getLabCartInfo () {
        return ServerRequest(CONFIG.API.LAB_ORDER_REVIEW_PAGE.GET_LAB_CART_INFO.HEADER.method,{},CONFIG.API.LAB_ORDER_REVIEW_PAGE.GET_LAB_CART_INFO.PATH);
    }

    return Object.freeze({
        getLabShoppingCart,
        removeShoppingCartItem,
        applyCouponCodeInShoppingCart,
        applyCouponCode,
        removeCouponCode,
        getLastOrderAddress,
        getCustomerAddresses,
        getLastVisitCollectionCenter,
        getCollectionCenters,
        addSampleCollectionConfig,
        getPreviousPatientDetails,
        getAvailableSlots,
        saveNewPatientDetails,
        getCustomerDetails,
        saveNewPatientDetails,
        getShoppingCartInfo,
        addReportDeliveryToCart,
        getPaymentConfig,
        getCaptcha,
        savePatientAndSlotInfoToCart,
        createLabOrder,
        getLabOrderSummaryDetails,
        getLabCartInfo
    });
}