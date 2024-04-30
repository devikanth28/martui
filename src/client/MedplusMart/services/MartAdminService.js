import serverRequest from "../../axios";
import CONFIG from "../constants/MartAdminConfig";

export default function MartAdminService() {

    let getCustomerInfo = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_USER_INFO.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.GET_USER_INFO.PATH);
    }

    let pushCustomerDetailsInQueue = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.PUSH_CUSTOMER_DETAILS_IN_QUEUE.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.PUSH_CUSTOMER_DETAILS_IN_QUEUE.PATH);
    }

    let footerForLabsAndDoctors = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.FOOTERS_FOR_LABS_AND_DOCTERS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.FOOTERS_FOR_LABS_AND_DOCTERS.PATH);
    }

    let addOrRemoveBulkProductId = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.CONFIGURE_BULK_ORDERS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.CONFIGURE_BULK_ORDERS.PATH);
    }

    let changeVersion = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.MART_VERSIONS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.MART_VERSIONS.PATH);
    }
    
    let generateLabCategory=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GENERATE_LAB_CATEGORIES.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.GENERATE_LAB_CATEGORIES.PATH);
    }

    let generateDoctorsCategory=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GENERATE_DOCTORS_CATEGORIES.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.GENERATE_DOCTORS_CATEGORIES.PATH);
    }

    let orderCancellationReasonsConfiguration=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.ORDER_CANCELLATION_REASONS_CONFIGURATION.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.ORDER_CANCELLATION_REASONS_CONFIGURATION.PATH);
    }

    let saveOrderCancellationReason=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.SAVE_ORDER_CANCELLATION_REASON.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.SAVE_ORDER_CANCELLATION_REASON.PATH);
    }

    let RemoveOrderCancellationReason=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.DELETE_ORDER_CANCELLATION_REASON.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.DELETE_ORDER_CANCELLATION_REASON.PATH);
    }
    
    let updateCmsAdmin = (obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.UPDATE_CMS_ADMIN.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.UPDATE_CMS_ADMIN.PATH);
    }

    let saveEPrescriptionConfig=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.SAVE_EPRESCRIPTION_CONFIG.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.SAVE_EPRESCRIPTION_CONFIG.PATH);
    }

    let getPrescriptionConfig=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.CONFIGURE_PRESCRIPTION.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.CONFIGURE_PRESCRIPTION.PATH);
    }

    let getProductDiscountDetails=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.PRODUCT_DISCOUNT_DETAILS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.PRODUCT_DISCOUNT_DETAILS.PATH);
    }

    let getProductStockDetails=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.PRODUCT_STOCK_DETAILS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.PRODUCT_STOCK_DETAILS.PATH);
    }

    let saveRedisKeyInfo=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.CONFIGURE_REDIS_KEY.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.CONFIGURE_REDIS_KEY.PATH);
    }

    let unSubscribeRefill=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.UNSUBSCRIBE_FROM_REFILLS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.UNSUBSCRIBE_FROM_REFILLS.PATH);
    }

    let forceCancelOrderByAdmin=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.FORCE_CANCEL_ORDERS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.FORCE_CANCEL_ORDERS.PATH);
    }

    let cancelOrdersByAdmin=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.CANCEL_ORDERS_FROM_ADMIN.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.CANCEL_ORDERS_FROM_ADMIN.PATH);
    }

    let saveCustomerPromotion=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.CUSTOMER_PROMOTION.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.CUSTOMER_PROMOTION.PATH);
    }

    let getMetaConfiguration=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.GET_META_CONFIGURATION.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.GET_META_CONFIGURATION.PATH);
    }

    let getMetaTagDetails=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.GET_META_DETAILS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.GET_META_DETAILS.PATH);
    }

    let getPrescriptionEnabledInfo = () => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_IS_PRESCRIPTION_ENABLED.HEADER.method, {}, CONFIG.API.ADMIN_PANEL.GET_IS_PRESCRIPTION_ENABLED.PATH);
    }

    let savePrescriptionEnabled = (obj) => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.SAVE_IS_PRESCRIPTION_ENABLED.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.SAVE_IS_PRESCRIPTION_ENABLED.PATH);
    }

    let getUpsellProductsHeading = () => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_UPSELL_PRODUCTS_HEADING.HEADER.method, {}, CONFIG.API.ADMIN_PANEL.GET_UPSELL_PRODUCTS_HEADING.PATH);
    }

    let saveUpsellProductsHeading = obj => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.SAVE_UPSELL_PRODUCTS_HEADING.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.SAVE_UPSELL_PRODUCTS_HEADING.PATH);
    }
    
    let saveMetaTagDetails = (obj)=> { 
        return serverRequest(CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.SAVE_META_DETAILS.HEADER.method,obj,CONFIG.API.ADMIN_PANEL.META_CONFIGURATION.SAVE_META_DETAILS.PATH);
    }

    const generateMainNavigation = (obj) => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.MAIN_NAVIGATION_FOR_CATALOG.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.MAIN_NAVIGATION_FOR_CATALOG.PATH);
    }

    const getCatalogs = () => {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_CATALOGS.HEADER.method, {}, CONFIG.API.ADMIN_PANEL.GET_CATALOGS.PATH);
    }

    const getTokenDetails = (obj) =>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_TOKEN_DETAILS.HEADER.method , obj , CONFIG.API.ADMIN_PANEL.GET_TOKEN_DETAILS.PATH);
    }
    
    const getCustomerDetails = (obj) =>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_CUSTOMER_DETAILS.HEADER.method , obj , CONFIG.API.ADMIN_PANEL.GET_CUSTOMER_DETAILS.PATH);
    }

    const moveCustomersInfoToSolrFromGivenDate = (obj) =>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.MOVE_CUSTOMERS_INFO_TO_SOLR_FROM_GIVEN_DATE.HEADER.method , obj , CONFIG.API.ADMIN_PANEL.MOVE_CUSTOMERS_INFO_TO_SOLR_FROM_GIVEN_DATE.PATH);

    }
    const moveCustomerInfoToSolrByCustomerId = (obj) =>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.MOVE_CUSTOMERS_INFO_TO_SOLR_BY_CUSTOMER_ID.HEADER.method , obj , CONFIG.API.ADMIN_PANEL.MOVE_CUSTOMERS_INFO_TO_SOLR_BY_CUSTOMER_ID.PATH);
    }

    let getEmergencyMessageConfiguration=()=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_EMERGENCY_MESSAGE_CONFIGURATION.HEADER.method, {}, CONFIG.API.ADMIN_PANEL.GET_EMERGENCY_MESSAGE_CONFIGURATION.PATH);
    }

    let createEmergencyMessage=(obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.CREATE_EMERGENCY_MESSAGE.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.CREATE_EMERGENCY_MESSAGE.PATH);
    }

    let deleteEmergencyMsg=(obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.DELETE_EMERGENCY_MSG.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.DELETE_EMERGENCY_MSG.PATH);
    }

    let getHolidaysETAConfiguration=()=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_HOLIDAYS_ETA_CONFIGURATION.HEADER.method, {}, CONFIG.API.ADMIN_PANEL.GET_HOLIDAYS_ETA_CONFIGURATION.PATH);
    }

    let addHolidaysETA=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.ADD_HOLIDAYS_ETA.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.ADD_HOLIDAYS_ETA.PATH);
    }

    let deleteHolidaysETAConfig=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.DELETE_HOLIDAYS_ETA_CONFIG.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.DELETE_HOLIDAYS_ETA_CONFIG.PATH);
    }

    let getLocalityDetails=(obj)=> {
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_LOCALITY_DETAILS.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.GET_LOCALITY_DETAILS.PATH);
    }

    let getIsEPrescriptionConfig=(obj)=>{
        return serverRequest(CONFIG.API.ADMIN_PANEL.GET_E_PRESCRIPTION.HEADER.method, obj, CONFIG.API.ADMIN_PANEL.GET_E_PRESCRIPTION.PATH);
    }


    return Object.freeze({
        getCustomerInfo,
        pushCustomerDetailsInQueue,
        footerForLabsAndDoctors,
        addOrRemoveBulkProductId,
        changeVersion,
        updateCmsAdmin,
        RemoveOrderCancellationReason,
        saveOrderCancellationReason,
        orderCancellationReasonsConfiguration,
        saveEPrescriptionConfig,
        getPrescriptionConfig,
        getProductDiscountDetails,
        getProductStockDetails,
        saveRedisKeyInfo,
        generateLabCategory,
        generateDoctorsCategory,
        unSubscribeRefill,
        forceCancelOrderByAdmin,
        cancelOrdersByAdmin,
        saveCustomerPromotion,
        getMetaConfiguration,
        getMetaTagDetails,
        getPrescriptionEnabledInfo,
        savePrescriptionEnabled,
        getUpsellProductsHeading,
        saveUpsellProductsHeading,
        generateMainNavigation,
        getCatalogs,
        getTokenDetails,
        getCustomerDetails,
        moveCustomersInfoToSolrFromGivenDate,
        moveCustomerInfoToSolrByCustomerId,
        saveMetaTagDetails,
        getEmergencyMessageConfiguration,
        createEmergencyMessage,
        deleteEmergencyMsg,
        getHolidaysETAConfiguration,
        addHolidaysETA,
        deleteHolidaysETAConfig,
        getLocalityDetails,
        getIsEPrescriptionConfig
    });
}