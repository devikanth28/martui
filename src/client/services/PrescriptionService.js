import serverRequest from '../axios'
import CONFIG from '../constants/ServerConfig';
import ImageProcessService, { IMAGE_TYPE_PRESCRIPTION } from './ImageProcessService';

export default function PrescriptionService() {

    const imageProcessService = ImageProcessService();

    function getCheckoutPrescriptionOptions() {
        return serverRequest(CONFIG.API.PRESCRIPION.GET_CHECKOUT_PRESCRIPTION_OPTIONS.HEADER.method, {}, CONFIG.API.PRESCRIPION.GET_CHECKOUT_PRESCRIPTION_OPTIONS.PATH);
    }
    function createHealthRecord(obj) {
        return serverRequest(CONFIG.API.PRESCRIPION.CREATE_HEALTH_RECORD.HEADER.method, obj, CONFIG.API.PRESCRIPION.CREATE_HEALTH_RECORD.PATH);
    }
    function savePrescriptionDetails(healthRecordId, isePrescriptionRequired, isShowPrescriptionAtStore, patientName, patientAge, doctorName) {
        const prescriptionDetails = { healthRecordId: healthRecordId, ePrescriptionRequired: isePrescriptionRequired, showPrescriptionAtStore: isShowPrescriptionAtStore, patientName: patientName, patientAge: patientAge, doctorName: doctorName};
        return serverRequest(CONFIG.API.PRESCRIPION.SAVE_PRESCRIPTION_DETAILS.HEADER.method, prescriptionDetails, CONFIG.API.PRESCRIPION.SAVE_PRESCRIPTION_DETAILS.PATH);
    }

    function getPreviousHealthRecords(startIndex, searchText){
        return serverRequest(CONFIG.API.PRESCRIPION.GET_PREVIOUS_HEALTH_RECORDS.HEADER.method, {startIndex: startIndex, searchText: searchText}, CONFIG.API.PRESCRIPION.GET_PREVIOUS_HEALTH_RECORDS.PATH);
    }

    function getMyHealthRecords(startIndex,searchText,searchPresTypes,sortBy,limitTo) {
        return serverRequest(CONFIG.API.MY_ACCOUNT.GET_MY_HEALTH_RECORDS.HEADER.method,{startIndex: startIndex,searchText:searchText,searchPresTypes:JSON.stringify(searchPresTypes),sortBy:sortBy,limitTo:limitTo},  CONFIG.API.MY_ACCOUNT.GET_MY_HEALTH_RECORDS.PATH);
    }

    function createOrUpdateHealthRecord(healthRecord, imageIdsToDelete, searchText, searchPresTypes, sortBy){
        return serverRequest(CONFIG.API.MY_ACCOUNT.CREATE_OR_UPDATE_HEALTH_RECORD.HEADER.method,{recordName:healthRecord.recordName,patientName:healthRecord.patientName,doctorName:healthRecord.doctorName,recordType:healthRecord.recordType,recordId:healthRecord.recordId,healthRecordImages:JSON.stringify(healthRecord.recordImageDetailList), imageIdsToDelete:JSON.stringify(imageIdsToDelete), searchText:searchText, searchPresTypes:JSON.stringify(searchPresTypes), sortBy:sortBy},CONFIG.API.MY_ACCOUNT.CREATE_OR_UPDATE_HEALTH_RECORD.PATH);
    }

    function getMyHealthRecordsMart(startIndex,searchText,searchPresTypes,sortBy) {
        return serverRequest(CONFIG.API.MY_ACCOUNT.GET_MY_HEALTH_RECORDS_MART.HEADER.method,{startIndex: startIndex,searchText:searchText,searchPresTypes:JSON.stringify(searchPresTypes),sortBy:sortBy},  CONFIG.API.MY_ACCOUNT.GET_MY_HEALTH_RECORDS_MART.PATH);
    }

    function createMyHealthRecord(healthRecord,sortBy){
        return serverRequest(CONFIG.API.MY_ACCOUNT.CREATE_MY_HEALTH_RECORD.HEADER.method,{recordName:healthRecord.recordName,patientName:healthRecord.patientName,doctorName:healthRecord.doctorName,recordType:healthRecord.recordType,healthRecordImages:JSON.stringify(healthRecord.recordImageDetailList),sortBy:sortBy},CONFIG.API.MY_ACCOUNT.CREATE_MY_HEALTH_RECORD.PATH);
    }

    function updateMyHealthRecord(healthRecord,imageIdsToDelete,searchText,searchPresTypes,sortBy){
        return serverRequest(CONFIG.API.MY_ACCOUNT.UPDATE_MY_HEALTH_RECORD.HEADER.method,{recordId:healthRecord.recordId,recordName:healthRecord.recordName,patientName:healthRecord.patientName,doctorName:healthRecord.doctorName,recordType:healthRecord.recordType,healthRecordImages:JSON.stringify(healthRecord.recordImageDetailList),imageIdsToDelete:JSON.stringify(imageIdsToDelete),searchText:searchText,searchPresTypes:JSON.stringify(searchPresTypes),sortBy:sortBy},  CONFIG.API.MY_ACCOUNT.UPDATE_MY_HEALTH_RECORD.PATH);
    }

    function deleteMyHealthRecord(recordId,searchText,searchPresTypes,sortBy){
        return serverRequest(CONFIG.API.MY_ACCOUNT.DELETE_MY_HEALTH_RECORD.HEADER.method,{recordId:recordId,searchText:searchText,searchPresTypes:JSON.stringify(searchPresTypes),sortBy:sortBy}, CONFIG.API.MY_ACCOUNT.DELETE_MY_HEALTH_RECORD.PATH);
    }

    function createOrderFromHealthRecord(recordId){
        return serverRequest(CONFIG.API.MY_ACCOUNT.CREATE_ORDER_FROM_HEALTH_RECORD.HEADER.method,{recordId:recordId}, CONFIG.API.MY_ACCOUNT.CREATE_ORDER_FROM_HEALTH_RECORD.PATH);
    }

    function editPrescription(prescriptionOrderId,healthRecordImages){
        return serverRequest(CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.EDIT_PRESCRIPTION.HEADER.method,{prescriptionOrderId:prescriptionOrderId,healthRecordImages:JSON.stringify(healthRecordImages)}, CONFIG.API.MY_ACCOUNT.PURCHASE_HISTORY.EDIT_PRESCRIPTION.PATH);
    }
    function sendOtpForUploadPrescription(obj){
        return serverRequest(CONFIG.API.PRESCRIPION.SEND_OTP_FOR_UPLOAD_PRESCRIPTION.HEADER.method,obj, CONFIG.API.PRESCRIPION.SEND_OTP_FOR_UPLOAD_PRESCRIPTION.PATH);
    }
    function uploadPrescription(obj){
        return serverRequest(CONFIG.API.PRESCRIPION.PRESCRIPTION_UPLOAD.HEADER.method,obj, CONFIG.API.PRESCRIPION.PRESCRIPTION_UPLOAD.PATH);
    }
    function getMobileNumber(){
        return serverRequest(CONFIG.API.PRESCRIPION.GET_MOBILE_NUMBER.HEADER.method,{}, CONFIG.API.PRESCRIPION.GET_MOBILE_NUMBER.PATH);
    }
    function verifyOtpToUploadPrescription(obj){
        return serverRequest(CONFIG.API.PRESCRIPION.VERIFY_OTP_FOR_PRESCRIPTION_UPLOAD.HEADER.method,obj, CONFIG.API.PRESCRIPION.VERIFY_OTP_FOR_PRESCRIPTION_UPLOAD.PATH);
    }
    
    function getHealthrecordByPrecsId(prescId){
        return serverRequest(CONFIG.API.PRESCRIPION.GET_HEALTH_RECORD_BY_PRESC_ID.HEADER.method, { presOrderId :prescId},CONFIG.API.PRESCRIPION.GET_HEALTH_RECORD_BY_PRESC_ID.PATH);
    }
    return Object.freeze({
        getCheckoutPrescriptionOptions,
        createHealthRecord,
        savePrescriptionDetails,
        getPreviousHealthRecords,
        getMyHealthRecords,
        createOrUpdateHealthRecord,
        createMyHealthRecord,
        updateMyHealthRecord,
        deleteMyHealthRecord,
        createOrderFromHealthRecord,
        editPrescription,
        sendOtpForUploadPrescription,
        uploadPrescription,
        getMobileNumber,
        verifyOtpToUploadPrescription,
        getMyHealthRecordsMart,
        getHealthrecordByPrecsId
    });
}