import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function CommonHeaderService() {

    function getCustomerNotifications() {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_CUSTOMER_NOTIFICATION.HEADER.method, {}, CONFIG.API.COMMON_HEADER.GET_CUSTOMER_NOTIFICATION.PATH);
    }

    function updateCustomerNotification(data) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.UPDATE_CUSTOMER_NOTIFICATION.HEADER.method, data, CONFIG.API.COMMON_HEADER.UPDATE_CUSTOMER_NOTIFICATION.PATH);
    }

    function getMiniShoppingCart() {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_MINI_SHOPPING_CART.HEADER.method, {}, CONFIG.API.COMMON_HEADER.GET_MINI_SHOPPING_CART.PATH);
    }

    function clearShoppingCart() {
        return ServerRequest(CONFIG.API.COMMON_HEADER.CLEAR_SHOPPING_CART.HEADER.method, {}, CONFIG.API.COMMON_HEADER.CLEAR_SHOPPING_CART.PATH);
    }

    function getnavigationDetails(){
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_NAVIGATION_DETAILS.HEADER.method, {}, CONFIG.API.COMMON_HEADER.GET_NAVIGATION_DETAILS.PATH);
    }

    function getProductAutoSuggestions(searchText,searchType) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_PRODUCT_SUGGESTIONS.HEADER.method, {searchText: searchText,searchType:searchType}, CONFIG.API.COMMON_HEADER.GET_PRODUCT_SUGGESTIONS.PATH);
    }

    function getCompositionSuggestions(searchText) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_COMPOSITION_SUGGESTIONS.HEADER.method, {searchText: searchText,rows:2}, CONFIG.API.COMMON_HEADER.GET_COMPOSITION_SUGGESTIONS.PATH);
    }
    function getProductSpecialDiscount(productList) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_PRODUCT_SPECIAL_DISCOUNT.HEADER.method, {productList: JSON.stringify(productList)}, CONFIG.API.COMMON_HEADER.GET_PRODUCT_SPECIAL_DISCOUNT.PATH);
    }
    
    function getMWalletAmount(){
        return ServerRequest(CONFIG.API.COMMON_HEADER.MY_WALLET.GET_MYWALLET_AMOUNT.HEADER.method, {}, CONFIG.API.COMMON_HEADER.MY_WALLET.GET_MYWALLET_AMOUNT.PATH);
    }

    function subscribeNewsletter(emailAddress){
        return ServerRequest(CONFIG.API.FOOTER.SUBSCRIBE_NEWS_LETTER.HEADER.method, {emailAddress:emailAddress}, CONFIG.API.FOOTER.SUBSCRIBE_NEWS_LETTER.PATH);
    }

    function isCustomerLoggedIn(){
        return ServerRequest(CONFIG.API.IS_CUSTOMER_LOGGED_IN.HEADER.method, {}, CONFIG.API.IS_CUSTOMER_LOGGED_IN.PATH);
    }

    function removeSession(obj){
        return ServerRequest(CONFIG.API.REMOVE_SESSION.HEADER.method, obj, CONFIG.API.REMOVE_SESSION.PATH);
    }

    function getFooter(){
        return ServerRequest(CONFIG.API.FOOTER.GET_DYNAMIC_FOOTER.HEADER.method, {}, CONFIG.API.FOOTER.GET_DYNAMIC_FOOTER.PATH);
    }

    function generateOtpForCampaignUser(obj){
        return ServerRequest(CONFIG.API.CAMPAIGN_SERVICE.GET_OTP_FOR_CAMPAIGN.HEADER.method, obj, CONFIG.API.CAMPAIGN_SERVICE.GET_OTP_FOR_CAMPAIGN.PATH);
    }

    function verifyOtpForCampaignUser(obj){
        return ServerRequest(CONFIG.API.CAMPAIGN_SERVICE.VERIFY_OTP_FOR_CAMPAIGN.HEADER.method, obj, CONFIG.API.CAMPAIGN_SERVICE.VERIFY_OTP_FOR_CAMPAIGN.PATH);
    }

    function resendOtpForCampaignUser(obj){
        return ServerRequest(CONFIG.API.CAMPAIGN_SERVICE.RESEND_OTP_FOR_CAMPAIGN.HEADER.method, obj, CONFIG.API.CAMPAIGN_SERVICE.RESEND_OTP_FOR_CAMPAIGN.PATH);
    }

    function insertCampaignUserInfo(obj){
        return ServerRequest(CONFIG.API.CAMPAIGN_SERVICE.INSERT_FOR_CAMPAIGN.HEADER.method, obj, CONFIG.API.CAMPAIGN_SERVICE.INSERT_FOR_CAMPAIGN.PATH);
    }

    function getProductSearch(obj){
        return ServerRequest(CONFIG.API.PRODUCT.GET_PRODUCT_SEARCH.HEADER.method, obj, CONFIG.API.PRODUCT.GET_PRODUCT_SEARCH.PATH);
    }

    function getCompositionsSearch(obj) {
        return ServerRequest(CONFIG.API.PRODUCT.GET_COMPOSITION_SEARCH.HEADER.method, obj, CONFIG.API.PRODUCT.GET_COMPOSITION_SEARCH.PATH);
    }

    function getDiscountForProductsSearch(obj) {
        return ServerRequest(CONFIG.API.PRODUCT.GET_DISCOUNT_FOR_PRODUCT_SEARCH.HEADER.method, obj, CONFIG.API.PRODUCT.GET_DISCOUNT_FOR_PRODUCT_SEARCH.PATH);
    }

    function sendErrorLog(obj) {
        return ServerRequest(CONFIG.API.LOG_ERROR.SEND_ERROR_LOG.HEADER.method, obj, CONFIG.API.LOG_ERROR.SEND_ERROR_LOG.PATH);
    }

    function getUnreadNotificationCount(obj){
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_UNREAD_NOTIFICATION_COUNT.HEADER.method,obj, CONFIG.API.COMMON_HEADER.GET_UNREAD_NOTIFICATION_COUNT.PATH);
    }

    return Object.freeze({
        getCustomerNotifications,
        updateCustomerNotification,
        getMiniShoppingCart,
        clearShoppingCart,
        getnavigationDetails,
        getProductAutoSuggestions,
        getCompositionSuggestions,
        getMWalletAmount,
        subscribeNewsletter,
        getProductSpecialDiscount,
        isCustomerLoggedIn,
        removeSession,
        getFooter,
        generateOtpForCampaignUser,
        verifyOtpForCampaignUser,
        resendOtpForCampaignUser,
        insertCampaignUserInfo,
        getProductSearch,
        getCompositionsSearch,
        getDiscountForProductsSearch,
        sendErrorLog,
        getUnreadNotificationCount
    })

}