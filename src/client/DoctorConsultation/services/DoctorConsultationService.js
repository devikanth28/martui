import ServerRequest from "../../axios";
import CONFIG from "../constants/DoctorConsultationConfig";

const DoctorConsultationService = () => {

    const pushDoctersDataIntoRedis = (obj) => {
        return ServerRequest(CONFIG.API.PUSH_DOCTERS_DATA_INTO_REDIS.HEADER.method, obj, CONFIG.API.PUSH_DOCTERS_DATA_INTO_REDIS.PATH);
    }

    const getSymptomsList = (obj) => {
        return ServerRequest(CONFIG.API.GET_SYMPTOMS_LIST.HEADER.method, obj, CONFIG.API.GET_SYMPTOMS_LIST.PATH);
    }

    const getSpecializationsList = (obj) => {
        return ServerRequest(CONFIG.API.GET_SPECIALIALIZATIONS_LIST.HEADER.method, obj, CONFIG.API.GET_SPECIALIALIZATIONS_LIST.PATH);
    }

    const getDoctorInfo = (obj) => {
        return ServerRequest(CONFIG.API.DOCTOR_INFO.GET_DOCTOR_INFO.HEADER.method, obj, CONFIG.API.DOCTOR_INFO.GET_DOCTOR_INFO.PATH);
    }

    const getDoctorsList = (obj) => {
        return ServerRequest(CONFIG.API.GET_DOCTORS_LIST.HEADER.method, obj, CONFIG.API.GET_DOCTORS_LIST.PATH);
    }

    const getDoctorsForCatalog= obj =>{
        return ServerRequest(CONFIG.API.GET_DOCTORS_FOR_CATALOG.HEADER.method,obj,CONFIG.API.GET_DOCTORS_FOR_CATALOG.PATH);
    }

    const  getDoctorConsultContent = (obj) => {
        return ServerRequest(CONFIG.API.GET_DOCTOR_CONSULT_CONTENT.HEADER.method, obj, CONFIG.API.GET_DOCTOR_CONSULT_CONTENT.PATH);
    }

    const getPreviouslyConsultedDoctors = () => {
        return ServerRequest(CONFIG.API.GET_PREVIOUS_CONSULTED_DOCTORS.HEADER.method, {}, CONFIG.API.GET_PREVIOUS_CONSULTED_DOCTORS.PATH);
    }

    const getUpComingConsultations = () => {
        return ServerRequest(CONFIG.API.GET_UPCOMING_CONSULTATIONS.HEADER.method, {}, CONFIG.API.GET_UPCOMING_CONSULTATIONS.PATH);
    }
    const getSortAndFilters = (obj) => {
        return ServerRequest(CONFIG.API.GET_DOCTORS_SORT_AND_FILTERS.HEADER.method, obj, CONFIG.API.GET_DOCTORS_SORT_AND_FILTERS.PATH);
    }

    //Doctor consultation Checkout services

    const cancelDoctorConsultation = (obj) => {
        return ServerRequest(CONFIG.API.CANCEL_DOCTOR_CONSULTATION.HEADER.method, obj, CONFIG.API.CANCEL_DOCTOR_CONSULTATION.PATH);
    }
    const getDoctorConsultations =() => {
        return ServerRequest(CONFIG.API.GET_DOCTOR_CONSULTATIONS.HEADER.method, {}, CONFIG.API.GET_DOCTOR_CONSULTATIONS.PATH);
    }
    
    const emailInvoice = (obj) =>{
        return ServerRequest(CONFIG.API.INVOICE_MAIL.HEADER.method, obj, CONFIG.API.INVOICE_MAIL.PATH);
    }

    const getBannerDetails = (obj) => {
        return ServerRequest(CONFIG.API.GET_DOCTOR_CONSULT_BANNERS.HEADER.method, obj, CONFIG.API.GET_DOCTOR_CONSULT_BANNERS.PATH);
    }

    const getConsultationUrl = (obj)=>{
        return ServerRequest(CONFIG.API.GET_CONSULTATION_URL.HEADER.method,obj,CONFIG.API.GET_CONSULTATION_URL.PATH);
    }

    const validateConsultation =(obj)=>{
        return ServerRequest(CONFIG.API.VALIDATE_CONSULTATION.HEADER.method,obj,CONFIG.API.VALIDATE_CONSULTATION.PATH);
    }

    const updateEmail = (obj) => {
        return ServerRequest(CONFIG.API.UPDATE_EMAIL.HEADER.method, obj, CONFIG.API.UPDATE_EMAIL.PATH);
    }

    const getDoctorsCategories = (obj) => {
        return ServerRequest(CONFIG.API.GET_DOCTORS_CATEGORIES.HEADER.method, obj, CONFIG.API.GET_DOCTORS_CATEGORIES.PATH);
    }

    return Object.freeze({
        getSymptomsList,
        getSpecializationsList,
        getDoctorInfo,
        getDoctorsList,
        getPreviouslyConsultedDoctors,
        getUpComingConsultations,
        getSortAndFilters,
        getDoctorsForCatalog,
        getDoctorConsultContent,
        cancelDoctorConsultation,
        getDoctorConsultations,
        emailInvoice,
        getBannerDetails,
        getConsultationUrl,
        validateConsultation,
        updateEmail,
        getDoctorsCategories,
        pushDoctersDataIntoRedis
    })
}

export default DoctorConsultationService;