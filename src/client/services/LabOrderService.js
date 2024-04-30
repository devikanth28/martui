import ServerRequest from '../axios'
import CONFIG from '../constants/ServerConfig';

export default function LabOrderService() {

    function getLabOrders(includeCanceled, pageNo) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_LAB_ORDERS.HEADER.method, {"pageNo":pageNo, "includeCancel" : includeCanceled }, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_LAB_ORDERS.PATH);
    }

    function getLabOrderDetail(orderId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_LAB_ORDER_DETAIL.HEADER.method, {"orderId": orderId}, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_LAB_ORDER_DETAIL.PATH);
    }

    function getPreviousAndNextLabOrderIds(currentLabOrderId, isCancelledOrderIncluded) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PREVIOUS_AND_NEXT_LAB_ORDER_IDS.HEADER.method, {currentLabOrderId: currentLabOrderId, isCancelledOrderIncluded: isCancelledOrderIncluded}, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PREVIOUS_AND_NEXT_LAB_ORDER_IDS.PATH);
    }

    function labCancelOrder(orderId, cancelReason) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.CANCEL_LAB_ORDER.HEADER.method, {orderId:orderId, reason:cancelReason}, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.CANCEL_LAB_ORDER.PATH);
    }

    function downloadPatientLabReports(orderId, patientId,collectionCentreId) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.DOWNLOAD_PATIENT_LAB_REPORTS.HEADER.method, {orderId:orderId, patientId:patientId,collectionCenterId:collectionCentreId}, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.DOWNLOAD_PATIENT_LAB_REPORTS.PATH);
    }
    
    function shareHealthRecordGraph(obj){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.SHARE_HEALTH_RECORD_GRAPH.HEADER.method, obj ,CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.SHARE_HEALTH_RECORD_GRAPH.PATH);
    }

    function getHealthRecordGraph(obj){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_HEALTH_RECORD_GRAPH.HEADER.method, obj ,CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_HEALTH_RECORD_GRAPH.PATH);
    }

    function getParametersDetails(){
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PARAMETERS_DETAILS.HEADER.method , {} ,CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PARAMETERS_DETAILS.PATH)
    }

    function getPatientHash(obj) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PATIENT_HASH.HEADER.method, obj, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PATIENT_HASH.PATH);
    }

    function getPatientDetailsFromHash(obj) {
        return ServerRequest(CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PATIENT_DETAILS_FROM_HASH.HEADER.method, obj, CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.GET_PATIENT_DETAILS_FROM_HASH.PATH);
    }

    return Object.freeze({
        getLabOrders,
        getLabOrderDetail,
        getPreviousAndNextLabOrderIds,
        labCancelOrder,
        downloadPatientLabReports,
        getHealthRecordGraph,
        getParametersDetails,
        getPatientHash,
        getPatientDetailsFromHash,
        shareHealthRecordGraph
    });
}
