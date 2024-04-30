import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function MyAccountService() {

    function getLoggedInUserInfo() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.GET_LOGGED_IN_USER_INFO.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.GET_LOGGED_IN_USER_INFO.PATH);
    }

    function getMyWishListInfo(wishListType,productIds) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_WISH_LIST_BY_PRODUCT_IDS.HEADER.method, {WISHLIST_TYPE: wishListType, productIds: productIds}, CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_WISH_LIST_BY_PRODUCT_IDS.PATH);
    }

    function getSortedWishListInfo(wishListType, sortBy, filterBy) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_SORTED_WISH_LIST_INFO.HEADER.method, {WISHLIST_TYPE: wishListType, sortBy: sortBy, filterBy: filterBy}, CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_SORTED_WISH_LIST_INFO.PATH);
    }

    function modifyWishList(productId, wishListType,wishListOperation) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.MODIFY_WISH_LIST.HEADER.method, {ID: productId, WISHLIST_TYPE: wishListType,WISHLIST_OPERATION: wishListOperation, RETURN_WISHLIST: "false"}, CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.MODIFY_WISH_LIST.PATH);
    }
    
    function productNotifyMe(productId, requestedQty) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.NOTIFY_PRODUCT.HEADER.method,{productId: productId, requestedQty: requestedQty},  CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.NOTIFY_PRODUCT.PATH);
    }

    function getProductNotifiedInfo(productId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_PRODUCT_NOTIFY_INFO.HEADER.method,{productId: productId},  CONFIG.API.MY_ACCOUNT.WISH_LIST_INFO.GET_PRODUCT_NOTIFY_INFO.PATH);
    }

    function getRefillHistory() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.GET_REFILL_HISTORY.HEADER.method,{},  CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.GET_REFILL_HISTORY.PATH);
    }

    function getRefillHistoryDetails(refillId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.GET_REFILL_DETAILS.HEADER.method,{refillId:refillId}, CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.GET_REFILL_DETAILS.PATH);
    }

    function removeRefillProduct(productId,refillId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.REMOVE_REFILL_PRODUCT.HEADER.method,{productId:productId, refillId:refillId}, CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.REMOVE_REFILL_PRODUCT.PATH);
    }

    function getUserContactDetails() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.GET_USER_CONTACT_DETAILS.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.GET_USER_CONTACT_DETAILS.PATH);
    }

    function getUserLoginInfo() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.GET_USER_LOGIN_INFO.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.GET_USER_LOGIN_INFO.PATH);
    }

    function changePassword(passwordObject) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PASSWORD.HEADER.method, passwordObject , CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PASSWORD.PATH);
    }

    function generatePassword(passwordObject) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.GENERATE_PASSWORD.HEADER.method, passwordObject , CONFIG.API.MY_ACCOUNT.MY_PROFILE.GENERATE_PASSWORD.PATH);
    }

    function changeEmailAddress(newEmailAddress) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_EMAIL_ADDRESS.HEADER.method,{newEmailAddress:newEmailAddress}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_EMAIL_ADDRESS.PATH);
    }

    function changeAddress(userProfile) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_ADDRESS.HEADER.method,userProfile, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_ADDRESS.PATH);
    }

    function sendOtpForMobileNumber(isForResend) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.SEND_OTP_FOR_MOBILE_NUMBER.HEADER.method, {isForResend:isForResend}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.SEND_OTP_FOR_MOBILE_NUMBER.PATH);
    }

    function sendOtpForEditMobileNo(newMobileNumber,isForResend) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.OTP_FOR_EDIT_NO.HEADER.method, {newMobileNumber:newMobileNumber,isForResend:isForResend}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.OTP_FOR_EDIT_NO.PATH);
    }

    function verifyOtpForEditMobNo(otpValue,mobileNumber) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.VERIFY_OTP_FOR_EDIT_NO.HEADER.method, {mobileNumber:mobileNumber,otpValue:otpValue}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.VERIFY_OTP_FOR_EDIT_NO.PATH);
    }

    function verifyOtpForMobileNumber(otpValue) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.VERIFY_OTP_FOR_MOBILE_NUMBER.HEADER.method, {otpValue:otpValue}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.VERIFY_OTP_FOR_MOBILE_NUMBER.PATH);
    }

    function sendOtpOnCallForEditNo(otpKey,mobileNo) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.SEND_OTP_ON_CALL.HEADER.method, {otpKey:otpKey,mobileNumber:mobileNo}, CONFIG.API.MY_ACCOUNT.MY_PROFILE.CHANGE_PHONE_NUMBER.SEND_OTP_ON_CALL.PATH);
    }
   
    
    function getGiftCartInfo(isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_GIFT_CART.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_GIFT_CART.PATH);
        }else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_CART.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_CART.PATH);
        }
    }

    function getGiftOrderReviewInfo(isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_GIFT_REVIEW.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_GIFT_REVIEW.PATH);
        }else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_REVIEW.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_REVIEW.PATH);
        }
    }

    function createGiftOrder(isPayback,cartId) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_ORDER_SUMMARY.HEADER.method, {cartId:cartId}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_ORDER_SUMMARY.PATH);
        }else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.CREATE_GIFT_ORDER.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.CREATE_GIFT_ORDER.PATH);
        }
    }
    
    function getGiftOrderSummary(obj) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GIFT_ORDER_SUMMARY.HEADER.method, obj, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GIFT_ORDER_SUMMARY.PATH);
    }

    function unSubscribeRefill(refillId, description) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.UNSUBSCRIBE_REFILL.HEADER.method,{'refillId':refillId, 'description':description}, CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.UNSUBSCRIBE_REFILL.PATH);
    }

    function modifyRefillInterval(refillId, refillInterval) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.MODIFY_REFILL_INTERVAL.HEADER.method,{'refillId':refillId, 'interval':refillInterval}, CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.MODIFY_REFILL_INTERVAL.PATH);
    }
    
    function modifyRefillProductQuantity(refillId, productId, qty) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.MODIFY_REFILL_PRODUCT_QTY.HEADER.method,{'refillId':refillId, 'productId':productId, 'productQty':qty}, CONFIG.API.MY_ACCOUNT.REFILL_HISTORY.MODIFY_REFILL_PRODUCT_QTY.PATH);
    }

    function geMyComplaintsHistory(status,startLimit) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_COMPLAINTS.GET_MY_COMPLAINTS_HOSTORY.HEADER.method, {includeClosed:status,startLimit:startLimit}, CONFIG.API.MY_ACCOUNT.MY_COMPLAINTS.GET_MY_COMPLAINTS_HOSTORY.PATH);
    }

    function getFlexiRewardsInfo(param,isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_CATEGORY_PRODUCTS.HEADER.method, {paybackCatalogRequest: param}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_CATEGORY_PRODUCTS.PATH);
        } else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_FLEXI_REWARDS_INFO.HEADER.method, {giftSearchCriteria: param}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_FLEXI_REWARDS_INFO.PATH);
        }
    }

    function getGiftCategoryProducts(data,isPayback, catalogSearchCriteria ) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_CATEGORY_PRODUCTS.HEADER.method, {paybackCatalogRequest: catalogSearchCriteria}, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_CATEGORY_PRODUCTS.PATH);
        } else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_CAEGORY_PRODUCTS.HEADER.method, data, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_GIFT_CAEGORY_PRODUCTS.PATH);
        }
    }

    function addRewardProduct(productId, quantity, isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.ADD_OR_MODIFY_PAYBACK_CART.HEADER.method, {productId:productId, quantity : quantity}, CONFIG.API.MY_ACCOUNT.PAYBACK.ADD_OR_MODIFY_PAYBACK_CART.PATH);
        } else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.ADD_REWARD_PRODUCT.HEADER.method, {productId:productId, quantity : quantity}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.ADD_REWARD_PRODUCT.PATH);
        }
    }

    function removeRewardProduct(productId, isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.ADD_OR_MODIFY_PAYBACK_CART.HEADER.method, {productId:productId, quantity: 0}, CONFIG.API.MY_ACCOUNT.PAYBACK.ADD_OR_MODIFY_PAYBACK_CART.PATH);
        } else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.REMOVE_REWARD_PRODUCT.HEADER.method, {productId:productId}, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.REMOVE_REWARD_PRODUCT.PATH);
        }
    }

    function getMyWalletInfo() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_WALLET.GET_MYWALLET_INFO.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.MY_WALLET.GET_MYWALLET_INFO.PATH);
    }
    
    function getOrderHistory(includeCancel, pageNo) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_HISTORY.HEADER.method, {includeCancel, pageNo}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_HISTORY.PATH);
    }

    function getLatestOrderForCustomer() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_LATEST_ORDER_FOR_CUSTOMER.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_LATEST_ORDER_FOR_CUSTOMER.PATH);
    }

    function getRetryPaymentInfoForCustomer() {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETRY_PAYMENT_INFO_FOR_CUSTOMER.HEADER.method, {}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETRY_PAYMENT_INFO_FOR_CUSTOMER.PATH);
    }

    function getOmsOrderDetails(orderId, isReturned) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_OMS_ORDER_DETAILS.HEADER.method, {orderId, isReturned}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_OMS_ORDER_DETAILS.PATH);
    }
    function getOrderPaymentDetails(orderId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_PAYMENT_DETAILS.HEADER.method, {orderId}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_PAYMENT_DETAILS.PATH);
    }
    function getOrderTrackInfo(orderId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_TRACK_INFO.HEADER.method, {orderId}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_TRACK_INFO.PATH);
    }
    function getOrderReturnInfo(invoiceId, company, isReturned, returnRequestIds) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_RETURN_INFO.HEADER.method, {invoiceId, company, isReturned, returnRequestIds}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_ORDER_RETURN_INFO.PATH);
    }
    function getReturnTrackInfo(requestId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_TRACK_INFO.HEADER.method, {requestId:requestId}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_TRACK_INFO.PATH);
    }
    function getReturnRefundInfo(orderId,returnId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_REFUND_INFO.HEADER.method, {orderId:orderId,returnId:returnId}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_REFUND_INFO.PATH);
    }
    
    function getInvoiceDetails(invoiceId, storeId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_INVOICE_DETAILS.HEADER.method, {invoiceId,storeId}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_INVOICE_DETAILS.PATH);
    }

    function getReturnOrderDetails(invoiceId,company){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_ORDER_DETAILS.HEADER.method,{invoiceId:invoiceId,company:company},CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_RETURN_ORDER_DETAILS.PATH);
    }

    function getReorderDetails(orderId, fromReOrder) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_REORDER_DETAILS.HEADER.method, {orderId, fromReOrder}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_REORDER_DETAILS.PATH);
    }

    function getReInvoiceDetails (invoiceId, storeId, fromReOrder){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_REINVOICE_DETAILS.HEADER.method, {invoiceId, storeId, fromReOrder}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.GET_REINVOICE_DETAILS.PATH);
    }

    function saveCustomerFeedBack(customerComplaint) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.SAVE_CUSTOMER_FEEDBACK.HEADER.method, {customerComplaint:JSON.stringify(customerComplaint)}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.SAVE_CUSTOMER_FEEDBACK.PATH);
    }
    function cancelOrder(orderId,reason,cancelOrderType) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.CANCEL_OMS_ORDER.HEADER.method, {orderId:orderId, reason:reason, cancelOrderType:cancelOrderType}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.CANCEL_OMS_ORDER.PATH);
    }
    
    function getWalletTransactionDetails(pageNum,recordsPerPage){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_WALLET.GET_MYWALLET_TRANSACTIONS.HEADER.method, {pageNum:pageNum,recordsPerPage:recordsPerPage}, CONFIG.API.MY_ACCOUNT.MY_WALLET.GET_MYWALLET_TRANSACTIONS.PATH);
    }

    function getFlexiRewardsTransactionDetails(pageNum, isPayback,isMdxPoints) {
        if (isPayback) {
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_TRANSACTION_DETAILS.HEADER.method, { pageNum: pageNum }, CONFIG.API.MY_ACCOUNT.PAYBACK.GET_PAYBACK_TRANSACTION_DETAILS.PATH);
        }
        else if (isMdxPoints) {
            return ServerRequest(CONFIG.API.MY_ACCOUNT.MDX_POINTS.GET_MDX_POINTS_TRANSACTION_DETAILS.HEADER.method, { pageNum: pageNum }, CONFIG.API.MY_ACCOUNT.MDX_POINTS.GET_MDX_POINTS_TRANSACTION_DETAILS.PATH);
        }
        else {
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_TRANSACTION_DETAILS.HEADER.method, { pageNum: pageNum }, CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.GET_TRANSACTION_DETAILS.PATH);
        }
    }

    function clearFlexiCart(isPayback) {
        if(isPayback){
            return ServerRequest(CONFIG.API.MY_ACCOUNT.PAYBACK.CLEAR_PAYBACK_CART.HEADER.method,{},CONFIG.API.MY_ACCOUNT.PAYBACK.CLEAR_PAYBACK_CART.PATH);
        } else{
            return ServerRequest(CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.CLEAR_GIFT_CART.HEADER.method,{},CONFIG.API.MY_ACCOUNT.FLEXI_REWARDS.CLEAR_GIFT_CART.PATH);
        }
    }

    function submitOrderComplaint(customerComplaintsStr, captchaCode) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.SUBMIT_ORDER_COMPLAINT.HEADER.method, {customerComplaintsStr : customerComplaintsStr ,captchaCode: captchaCode}, CONFIG.API.MY_ACCOUNT.SUBMIT_ORDER_COMPLAINT.PATH)
    }

    function saveUserDetails(userProfile) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_PROFILE.SAVE_USER_DETAILS.HEADER.method,userProfile, CONFIG.API.MY_ACCOUNT.MY_PROFILE.SAVE_USER_DETAILS.PATH);
    }

    function saveRequestedProduct(productType, productName, brand = null, price = null) {
        return ServerRequest(CONFIG.API.PRODUCT.SAVE_REQUESTED_PRODUCT.HEADER.method,{productType : productType, productName : productName.trim(), brand : brand.trim(), price : price},CONFIG.API.PRODUCT.SAVE_REQUESTED_PRODUCT.PATH);
    }

    function validateToken(obj) {
        return ServerRequest(CONFIG.API.TOKEN.VALIDATE_TOKEN.HEADER.method, obj, CONFIG.API.TOKEN.VALIDATE_TOKEN.PATH);
    }

    function generateToken(obj){
        return ServerRequest(CONFIG.API.TOKEN.GENERATE_TOKEN.HEADER.method, obj, CONFIG.API.TOKEN.GENERATE_TOKEN.PATH);
    }
    
    function getVersionKeys() {
        return ServerRequest(CONFIG.API.VERSION_KEYS.GET_VERSION_KEYS.HEADER.method, {}, CONFIG.API.VERSION_KEYS.GET_VERSION_KEYS.PATH);
    }

    function getCancelReasons(obj){
        return ServerRequest(CONFIG.API.GET_CANCEL_REASONS.HEADER.method, obj, CONFIG.API.GET_CANCEL_REASONS.PATH);
    }

    return Object.freeze({
        getLoggedInUserInfo,
        getMyWishListInfo,
        getSortedWishListInfo,
        modifyWishList,
        productNotifyMe, getProductNotifiedInfo,
        getRefillHistory,
        getRefillHistoryDetails,
        removeRefillProduct,
        getUserContactDetails, getUserLoginInfo,
        changePassword,generatePassword,
        sendOtpForMobileNumber,
        sendOtpForEditMobileNo,
        verifyOtpForMobileNumber,
        verifyOtpForEditMobNo,
        sendOtpOnCallForEditNo,
        changeAddress,
        changeEmailAddress,
        unSubscribeRefill,
        modifyRefillInterval,
        modifyRefillProductQuantity,
        geMyComplaintsHistory,
        getFlexiRewardsInfo,
        getGiftCategoryProducts,
        addRewardProduct,
        getMyWalletInfo,
        removeRewardProduct,
        getGiftCartInfo,
        getFlexiRewardsTransactionDetails,
        getGiftOrderReviewInfo,
        getWalletTransactionDetails,
        createGiftOrder,getOmsOrderDetails,getOrderPaymentDetails,getOrderReturnInfo,getReturnTrackInfo,getReturnRefundInfo,
        getOrderTrackInfo,saveCustomerFeedBack,cancelOrder,getOrderHistory,getInvoiceDetails,getReorderDetails,
        getGiftOrderSummary,
        clearFlexiCart,getReturnOrderDetails,
        getReInvoiceDetails,
        getLatestOrderForCustomer,
        getRetryPaymentInfoForCustomer,
        submitOrderComplaint,
        saveUserDetails,
        saveRequestedProduct,
        validateToken,
        generateToken,
        getVersionKeys,
        getCancelReasons
    });
}
