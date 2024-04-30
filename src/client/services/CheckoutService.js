import ServerRequest from '../../client/axios'
import CONFIG from '../constants/ServerConfig';
import Validate from '../helpers/Validate';

export default function CheckoutService() {

    function getShoppingCartProducts(promotionType, isCustomerAgreeToSingleOrder) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.GET_SHOPPING_CART_PRODUCTS.HEADER.method, {promotionType: promotionType, isCustomerAgreeToSingleOrder:isCustomerAgreeToSingleOrder}, CONFIG.API.SHOPPING_CART.GET_SHOPPING_CART_PRODUCTS.PATH);
    }

    function modifyShoppingCartProductQuantity(productId, requestedQuantity) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.MODIFY_SHOPPING_CART_PRODUCT_QUANTITY.HEADER.method, {productId: productId, requestedQuantity: requestedQuantity}, CONFIG.API.SHOPPING_CART.MODIFY_SHOPPING_CART_PRODUCT_QUANTITY.PATH);
    }

    function addOrModifyProductToShoppingCart(productId, requestedQuantity) {
        var CART_OBJECT = {};
        CART_OBJECT[productId] = requestedQuantity;
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_PRODUCT_TO_SHOPPING_CART.HEADER.method, { CART_OBJECT: JSON.stringify(CART_OBJECT)}, CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_PRODUCT_TO_SHOPPING_CART.PATH);
    }

    function addOrModifyProductToCart(productId, requestedQuantity, isRecommendedProduct) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_PRODUCT_TO_CART.HEADER.method, { productId: productId, requestedQuantity: requestedQuantity, isRecommendedProduct: isRecommendedProduct }, CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_PRODUCT_TO_CART.PATH);
    }

    function addBulkProductToCart(productIdQty) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_BULK_PRODUCT_TO_CART.HEADER.method, {productIdQty:JSON.stringify(productIdQty)}, CONFIG.API.SHOPPING_CART.ADD_BULK_PRODUCT_TO_CART.PATH);
    }
    
    function addProductToRedisCart(productId, requestedQuantity, isRecommendedProduct) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_PRODUCT_TO_REDIS_CART.HEADER.method, {productId: productId, requestedQuantity: requestedQuantity, isRecommendedProduct: isRecommendedProduct}, CONFIG.API.SHOPPING_CART.ADD_PRODUCT_TO_REDIS_CART.PATH);
    }

    function addProductToCookieCart(productId, requestedQuantity, isRecommendedProduct) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_PRODUCT_TO_COOKIE_CART.HEADER.method, {productId: productId, requestedQuantity: requestedQuantity, isRecommendedProduct: isRecommendedProduct}, CONFIG.API.SHOPPING_CART.ADD_PRODUCT_TO_COOKIE_CART.PATH);
    }

    function addOrModifyComplimentaryProductToCart(productId, requestedQuantity) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_COMPLIMENTARY_PRODUCT_TO_CART.HEADER.method, {productId: productId, requestedQuantity: requestedQuantity}, CONFIG.API.SHOPPING_CART.ADD_OR_MODIFY_COMPLIMENTARY_PRODUCT_TO_CART.PATH);
    }

    function getPaymentAndPromotionBanners(isBannersForOrderReview) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.GET_PAYMENT_AND_PROMOTION_BANNERS.HEADER.method, {isBannersForOrderReview: isBannersForOrderReview}, CONFIG.API.SHOPPING_CART.GET_PAYMENT_AND_PROMOTION_BANNERS.PATH);
    }

    function proceedShoppingCart(isDefaultLocalitySelectedByUser) {
        return ServerRequest(CONFIG.API.SHOPPING_CART.PROCEED_SHOPPING_CART.HEADER.method, {isDefaultLocalitySelectedByUser: isDefaultLocalitySelectedByUser}, CONFIG.API.SHOPPING_CART.PROCEED_SHOPPING_CART.PATH);
    }

    function getDeliveryDetails(checkOutType) {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_DELIVERY_DETAILS.HEADER.method, {checkOutType : checkOutType}, CONFIG.API.CHECKOUT.GET_DELIVERY_DETAILS.PATH);
    }

    function getDeliveryOptions() {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_DELIVERY_DETAILS_OPTIONS.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_DELIVERY_DETAILS_OPTIONS.PATH);
    }

    function getPickStoreDetails() {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_PICK_STORE_DETAILS.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_PICK_STORE_DETAILS.PATH);
    }

    function getAddressAndCommunities() {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_ADDRESS_AND_COMMUNITIES.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_ADDRESS_AND_COMMUNITIES.PATH);
    }

    

    function getFlexiPageDeliveryDetails(isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_DELIVERY_DETAILS.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_DELIVERY_DETAILS.PATH);
        }else{
            return ServerRequest(CONFIG.API.CHECKOUT.GET_PROFILE_DELIVERY_DETAILS.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_PROFILE_DELIVERY_DETAILS.PATH);
        }
    }
    
    function saveFlexiDeliveryDetails(data,isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.SAVE_PAYBACK_DELIVERY_DETAILS.HEADER.method, data, CONFIG.API.MY_ACCOUNT.PAYBACK.SAVE_PAYBACK_DELIVERY_DETAILS.PATH);
        }else{
            return ServerRequest(CONFIG.API.CHECKOUT.SAVE_FLEXI_DELIVERY_DETAILS.HEADER.method, data, CONFIG.API.CHECKOUT.SAVE_FLEXI_DELIVERY_DETAILS.PATH);
        }
    }

    function saveDeliveryDetails(data) {
        return ServerRequest(CONFIG.API.CHECKOUT.SAVE_DELIVERY_DETAILS.HEADER.method, data, CONFIG.API.CHECKOUT.SAVE_DELIVERY_DETAILS.PATH);
    } 

    function addOrUpdateDeliveryDetails(data) {
        return ServerRequest(CONFIG.API.CHECKOUT.ADD_OR_UPDATE_DELIVERY_DETAILS.HEADER.method, { address: JSON.stringify(data)}, CONFIG.API.CHECKOUT.ADD_OR_UPDATE_DELIVERY_DETAILS.PATH);
    }

    function getOrderSummary(retryOrderId) {
        return ServerRequest(CONFIG.API.ORDER_SUMMARY.GET_ORDER_PRODUCTS.HEADER.method, {retryOrderId:retryOrderId}, CONFIG.API.ORDER_SUMMARY.GET_ORDER_PRODUCTS.PATH);
    }

    function applyPromotion(promotionType) {
        return ServerRequest(CONFIG.API.ORDER_SUMMARY.APPLY_PROMOTION.HEADER.method, {promoType: promotionType}, CONFIG.API.ORDER_SUMMARY.APPLY_PROMOTION.PATH);
    }

    function applyCoupon(couponCode) {
        return ServerRequest(CONFIG.API.ORDER_SUMMARY.APPLY_COUPON.HEADER.method, { coupon: couponCode}, CONFIG.API.ORDER_SUMMARY.APPLY_COUPON.PATH);
    }

    function removeCoupon() {
        return ServerRequest(CONFIG.API.ORDER_SUMMARY.REMOVE_COUPON.HEADER.method, {}, CONFIG.API.ORDER_SUMMARY.REMOVE_COUPON.PATH);
    }

    function getPaymentConfig(obj) {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_PAYMENT_CONFIG.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_PAYMENT_CONFIG.PATH);
    }

    function getPaybackPaymentConfig(obj) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_PAYMENT_CONFIG.HEADER.method, obj, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_PAYMENT_CONFIG.PATH);
    }

    function getRetryPaymentConfig(obj) {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_RETRY_PAYMENT_CONFIG.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_RETRY_PAYMENT_CONFIG.PATH);
    }

    function createOmsOrder(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.CREATE_OMS_ORDER.HEADER.method, obj, CONFIG.API.CHECKOUT.CREATE_OMS_ORDER.PATH);
    }
    function retryPayment(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.RETRY_PAYMENT.HEADER.method, obj, CONFIG.API.CHECKOUT.RETRY_PAYMENT.PATH);
    }

    function getAppliedDiscount(){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_APPLIED_DISCOUNT.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_APPLIED_DISCOUNT.PATH);
    }

    function createRefillOrder(interval,cartId){
        return ServerRequest(CONFIG.API.THANK_YOU_SUMMARY.CREATE_REFILL_ORDER.HEADER.method, {interval: interval, cartId: cartId}, CONFIG.API.THANK_YOU_SUMMARY.CREATE_REFILL_ORDER.PATH);
    }

    function getOrderSummaryForThankyou(){
        return ServerRequest(CONFIG.API.THANK_YOU_SUMMARY.GET_ORDER_SUMMARY.HEADER.method, {}, CONFIG.API.THANK_YOU_SUMMARY.GET_ORDER_SUMMARY.PATH);
    }

    function validatePayBackPoints(retryOrderId){
        return ServerRequest(CONFIG.API.CHECKOUT.VALIDATE_PAYBACK_POINTS.HEADER.method, {cartId:retryOrderId}, CONFIG.API.CHECKOUT.VALIDATE_PAYBACK_POINTS.PATH);
    }

    function omsOrderCreationProcess (paymentObj, retryOrderId, isPayback){
        if(Validate().isNotEmpty(retryOrderId)) {
            var newPaymentObj = {...paymentObj};
            newPaymentObj['cartId'] = retryOrderId;
            return ServerRequest(CONFIG.API.CHECKOUT.RETRY_PAYMENT_NEW.HEADER.method, newPaymentObj, CONFIG.API.CHECKOUT.RETRY_PAYMENT_NEW.PATH);
        } else if(isPayback) {
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.CREATE_PAYBACK_OMS_ORDER.HEADER.method, paymentObj, CONFIG.API.MY_ACCOUNT.PAYBACK.CREATE_PAYBACK_OMS_ORDER.PATH);
        } else {
            return ServerRequest(CONFIG.API.CHECKOUT.CREATE_ORDER.HEADER.method, paymentObj, CONFIG.API.CHECKOUT.CREATE_ORDER.PATH);
        }
    }

    function editRetryOrder(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.EDIT_RETRY_ORDER.HEADER.method, obj, CONFIG.API.CHECKOUT.EDIT_RETRY_ORDER.PATH);
    }

    function updatePatientDetailsInShoppingCart(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.UPDATE_PATIENT_DETAILS_IN_SHOPPING_CART.HEADER.method, obj, CONFIG.API.CHECKOUT.UPDATE_PATIENT_DETAILS_IN_SHOPPING_CART.PATH);
    }

    function removePatientDetailsInShoppingCart(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.REMOVE_PATIENT_DETAILS_IN_SHOPPING_CART.HEADER.method, obj, CONFIG.API.CHECKOUT.REMOVE_PATIENT_DETAILS_IN_SHOPPING_CART.PATH);
    }

    function getRefillReOrderDetails(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_REFILL_RE_ORDER_DETAILS.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_REFILL_RE_ORDER_DETAILS.PATH);
    }

    function getCfp(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_CFP_ORDER_DETAILS.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_CFP_ORDER_DETAILS.PATH);
    }

    function getPaymentPageSummary(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_PAYMENT_PAGE_SUMMARY.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_PAYMENT_PAGE_SUMMARY.PATH);
    }

    function getMWalletAmount(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_MYWALLET_AMOUNT.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_MYWALLET_AMOUNT.PATH);
    }

    function redirectToRetryOrderPayment(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.REDIRECT_TO_RETRY_PAYMENT.HEADER.method, obj, CONFIG.API.CHECKOUT.REDIRECT_TO_RETRY_PAYMENT.PATH);
    }

    function getRetryPaymentPageSummary(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_RETRY_PAYMENT_PAGE_SUMMARY.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_RETRY_PAYMENT_PAGE_SUMMARY.PATH);
    }

    function setReOrderItems(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.SET_REORDER_ITEM.HEADER.method, obj, CONFIG.API.CHECKOUT.SET_REORDER_ITEM.PATH);
    }

    function forceCancelOrder (obj){
        return ServerRequest(CONFIG.API.CHECKOUT.FORCE_CANCEL_ORDER.HEADER.method, obj, CONFIG.API.CHECKOUT.FORCE_CANCEL_ORDER.PATH);
    }

    function getOrderType (obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_ORDER_TYPE.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_ORDER_TYPE.PATH);
    }

    function handleCancelWalletTransaction(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.CANCEL_WALLET_TRANSACTION.HEADER.method, obj, CONFIG.API.CHECKOUT.CANCEL_WALLET_TRANSACTION.PATH);
    }

    function getCaptchaCode(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.GET_CAPTCHA_CODE.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_CAPTCHA_CODE.PATH);

    }

    function validateCaptchaCode(obj){
        return ServerRequest(CONFIG.API.CHECKOUT.VALIDATE_CAPTCHA_CODE.HEADER.method, obj, CONFIG.API.CHECKOUT.VALIDATE_CAPTCHA_CODE.PATH);

    }

    return Object.freeze({
        getShoppingCartProducts,
        modifyShoppingCartProductQuantity,
        addOrModifyProductToCart,
        addOrModifyComplimentaryProductToCart,
        getPaymentAndPromotionBanners,
        proceedShoppingCart,
        getDeliveryDetails,
        saveDeliveryDetails,
        getFlexiPageDeliveryDetails,
        saveFlexiDeliveryDetails,
        addOrUpdateDeliveryDetails,
        getOrderSummary,
        applyPromotion,
        getPaymentConfig,
        getRetryPaymentConfig,
        createOmsOrder,
        applyCoupon,
        removeCoupon,
        getAppliedDiscount,
        getOrderSummaryForThankyou,
        retryPayment,
        omsOrderCreationProcess,
        editRetryOrder,
        createRefillOrder,
        addBulkProductToCart,
        addProductToRedisCart,
        addProductToCookieCart,
        updatePatientDetailsInShoppingCart,
        removePatientDetailsInShoppingCart,
        getRefillReOrderDetails,
        getCfp,
        getPaybackPaymentConfig,
        validatePayBackPoints,
        addOrModifyProductToShoppingCart,
        getDeliveryOptions,
        getPickStoreDetails,
        getAddressAndCommunities,
        getPaymentPageSummary,
        getMWalletAmount,
        redirectToRetryOrderPayment,
        getRetryPaymentPageSummary,
        setReOrderItems,
        forceCancelOrder,
        getOrderType,
        handleCancelWalletTransaction,
        getCaptchaCode,
        validateCaptchaCode
    });
}
