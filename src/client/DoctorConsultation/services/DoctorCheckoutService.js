import ServerRequest from "../../axios";
import CONFIG from "../constants/DoctorConsultationConfig";

const DoctorCheckoutService = () => {

    const addPrimaryInfoToDoctorConsultation = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.ADD_PRIMARY_INFO_TO_DOCTOR_CONSULTATION.HEADER.method, obj, CONFIG.API.CHECKOUT.ADD_PRIMARY_INFO_TO_DOCTOR_CONSULTATION.PATH);
    }

    const getPatients = () => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_PATIENTS.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_PATIENTS.PATH);
    }

    const addOrEditPatientForCustomer = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.ADD_OR_EDIT_PATIENT_FOR_CUSTOMER.HEADER.method, obj, CONFIG.API.CHECKOUT.ADD_OR_EDIT_PATIENT_FOR_CUSTOMER.PATH);
    }

    const deletePatient = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.DELETE_PATIENT.HEADER.method, obj, CONFIG.API.CHECKOUT.DELETE_PATIENT.PATH);
    }

    const getAvailableClinics = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_AVAILABLE_CLINICS.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_AVAILABLE_CLINICS.PATH);
    }

    const getDoctorTimingSlots = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_TIMING_SLOTS.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_TIMING_SLOTS.PATH);
    }

    const addDoctorConsultationInfo = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.ADD_DOCTOR_CONSULTATION_INFO.HEADER.method, obj, CONFIG.API.CHECKOUT.ADD_DOCTOR_CONSULTATION_INFO.PATH);
    }

    const applyCoupon = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.APPLY_COUPON.HEADER.method, obj, CONFIG.API.CHECKOUT.APPLY_COUPON.PATH);
    }

    const removeCoupon = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.REMOVE_COUPON.HEADER.method, obj, CONFIG.API.CHECKOUT.REMOVE_COUPON.PATH);
    }

    const getPaymentMethods = () => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_PAYMENT_MODES.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_PAYMENT_MODES.PATH);
    }

    const getCaptcha = () => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_CAPTCHA.HEADER.method, {}, CONFIG.API.CHECKOUT.GET_CAPTCHA.PATH);
    }

    const getDoctorConsultationForReview = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_DOCTOR_CONSULTATION_FOR_REVIEW.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_DOCTOR_CONSULTATION_FOR_REVIEW.PATH);
    }

    const createBookingForConsultation = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.CREATE_BOOKING.HEADER.method, obj, CONFIG.API.CHECKOUT.CREATE_BOOKING.PATH);
    }

    const retryPaymentForConsultation = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.RETRY_PAYMENT.HEADER.method, obj, CONFIG.API.CHECKOUT.RETRY_PAYMENT.PATH);
    }

    const getBookingDetailsForSuccess = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_BOOKING_DETAILS_FOR_SUCCESS.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_BOOKING_DETAILS_FOR_SUCCESS.PATH);
    }

    const getDoctorConsultationForRetry = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_DOCTOR_CONSULTATION_FOR_RETRY.HEADER.method, obj, CONFIG.API.CHECKOUT.GET_DOCTOR_CONSULTATION_FOR_RETRY.PATH);
    }

    const forceCancelDoctorConsultation = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.FORCE_CANCEL_DOCTOR_CONSULTATION.HEADER.method, obj, CONFIG.API.CHECKOUT.FORCE_CANCEL_DOCTOR_CONSULTATION.PATH);
    }

    const removePatientFromDoctorConsulationInfo = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.REMOVE_PATIENT_INFO_FROM_DOCTOR_CONSULTATION_INFO.HEADER.method, obj, CONFIG.API.CHECKOUT.REMOVE_PATIENT_INFO_FROM_DOCTOR_CONSULTATION_INFO.PATH);
    }

    const getFollowUpDoctorDetailsToValidate = (obj) => {
        return ServerRequest(CONFIG.API.CHECKOUT.GET_FOLLOW_UP_DOCTOR_DETAILS_TO_VALIDATE.HEADER.method, obj,CONFIG.API.CHECKOUT.GET_FOLLOW_UP_DOCTOR_DETAILS_TO_VALIDATE.PATH)
    }

    const clearBookingConsultation = () =>{
        return ServerRequest(CONFIG.API.CHECKOUT.CLEAR_BOOKING_CONSULTATION.HEADER.method, {},CONFIG.API.CHECKOUT.CLEAR_BOOKING_CONSULTATION.PATH)
    }

    return Object.freeze({
        addPrimaryInfoToDoctorConsultation,
        getPatients,
        addOrEditPatientForCustomer,
        getAvailableClinics,
        getDoctorTimingSlots,
        addDoctorConsultationInfo,
        applyCoupon,
        removeCoupon,
        getPaymentMethods,
        getDoctorConsultationForReview,
        createBookingForConsultation,
        retryPaymentForConsultation,
        addDoctorConsultationInfo,
        getBookingDetailsForSuccess,
        getCaptcha,
        getDoctorConsultationForRetry,
        forceCancelDoctorConsultation,
        deletePatient,
        removePatientFromDoctorConsulationInfo,
        getFollowUpDoctorDetailsToValidate,
        clearBookingConsultation
    });
}
export default DoctorCheckoutService;