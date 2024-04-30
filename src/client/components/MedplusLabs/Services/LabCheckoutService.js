import ServerRequest from '../../../axios';
import LabCheckoutConfig from '../constants/LabCheckoutConfig';

const LabCheckOutService = () => {

    let addTestToCart = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.ADD_TEST_TO_CART.HEADER.method, obj, LabCheckoutConfig.LAB_API.SHOPPING_CART.ADD_TEST_TO_CART.PATH);
    }

    let removeTestFromCart = (testId) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.REMOVE_TEST_FROM_CART.HEADER.method, { testId: testId }, LabCheckoutConfig.LAB_API.SHOPPING_CART.REMOVE_TEST_FROM_CART.PATH);
    }

    let getLabShoppingCart = () => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.GET_SHOPPING_CART.HEADER.method, {}, LabCheckoutConfig.LAB_API.SHOPPING_CART.GET_SHOPPING_CART.PATH);
    }

    let getCustomerPatients = () => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.GET_CUSTOMER_PATIENTS.HEADER.method, {}, LabCheckoutConfig.LAB_API.PATIENT.GET_CUSTOMER_PATIENTS.PATH);
    }

    let deletePatient = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.DELETE_PATIENT.HEADER.method, obj, LabCheckoutConfig.LAB_API.PATIENT.DELETE_PATIENT.PATH);
    }

    let addOrEditCustomerPatient = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.ADD_OR_EDIT_CUSTOMER_PATIENT.HEADER.method, obj, LabCheckoutConfig.LAB_API.PATIENT.ADD_OR_EDIT_CUSTOMER_PATIENT.PATH);
    }

    let addPatientToShoppingCart = (patientId, doctorName) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.ADD_PATIENT_TO_SHOPPING_CART.HEADER.method, { patientId: patientId, doctorName: doctorName }, LabCheckoutConfig.LAB_API.PATIENT.ADD_PATIENT_TO_SHOPPING_CART.PATH);
    }

    let updateDoctorToPatient = (patientId, doctorName, isSubscribed) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.UPDATE_DOCTOR_TO_PATIENT.HEADER.method, { patientId: patientId, doctorName: doctorName, isSubscribed: isSubscribed }, LabCheckoutConfig.LAB_API.PATIENT.UPDATE_DOCTOR_TO_PATIENT.PATH);
    }

    let getCustomerAddresses = () => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_CUSTOMER_ADDRESSES.HEADER.method, {}, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_CUSTOMER_ADDRESSES.PATH);
    }

    let getCollectionCenters = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_COLLECTION_CENTERS.HEADER.method, object, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_COLLECTION_CENTERS.PATH);
    }

    let setDeliveryLocationToCart = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.SET_DELIVERY_LOCATION_TO_CART.HEADER.method, object, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.SET_DELIVERY_LOCATION_TO_CART.PATH);
    }

    let getSlotsDetails = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_SLOT_DETAILS.HEADER.method, object, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.GET_SLOT_DETAILS.PATH);
    }

    let setTimeSlotToCart = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.SET_TIME_SLOT_TO_CART.HEADER.method, object, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.SET_TIME_SLOT_TO_CART.PATH);
    }

    let addSampleCollectionInfoToCart = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.ADD_SAMPLE_COLLECTION_INFO_TO_CART.HEADER.method, object, LabCheckoutConfig.LAB_API.SAMPLE_COLLECTION_AND_SLOT_SELECTION.ADD_SAMPLE_COLLECTION_INFO_TO_CART.PATH);
    }

    let applyCoupon = (couponCode) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.APPLY_COUPON.HEADER.method, { couponCode: couponCode }, LabCheckoutConfig.LAB_API.SHOPPING_CART.APPLY_COUPON.PATH);
    }

    let removeCoupon = () => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.REMOVE_COUPON.HEADER.method, {}, LabCheckoutConfig.LAB_API.SHOPPING_CART.REMOVE_COUPON.PATH);
    }

    let getCaptch = () => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.GET_CAPTCHA.HEADER.method, {}, LabCheckoutConfig.LAB_API.LAB_ORDER.GET_CAPTCHA.PATH);
    }

    let getLabCartInfo = (mdxFlag) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_LAB_CART_INFO.HEADER.method, {applyMdxPointsPayment : mdxFlag}, LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_LAB_CART_INFO.PATH);
    }
    let getPaymentGatewayDetails = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_PAYMENT.GET_PAYMENT_GATEWAYS.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_PAYMENT.GET_PAYMENT_GATEWAYS.PATH);
    }
    let addReportDeliveryInfo = (object) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.ADD_REPORT_DELIVERY_INFO.HEADER.method, object, LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.ADD_REPORT_DELIVERY_INFO.PATH);
    }
    let submitLabOrder = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.SUBMIT_LAB_ORDER.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER.SUBMIT_LAB_ORDER.PATH);
    }

    let getLabOrderThankYouResponse = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER_SUMMARY.GET_THANKYOU_RESPONSE.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER_SUMMARY.GET_THANKYOU_RESPONSE.PATH);
    }

    let getPaymentLabOrderSummary = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_PAYMENT_ORDER_SUMMARY.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_PAYMENT_ORDER_SUMMARY.PATH);
    }

    let getRetryPaymentLabOrderSummary = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_RETRY_PAYMENT_ORDER_SUMMARY.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER_REVIEW_PAGE.GET_RETRY_PAYMENT_ORDER_SUMMARY.PATH);
    }

    let submitLabRetryOrder = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.SUBMIT_LAB_RETRY_ORDER.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER.SUBMIT_LAB_RETRY_ORDER.PATH);
    }

    let clearLabShoppingCart = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.SHOPPING_CART.CLEAR_LAB_SHOPPING_CART.HEADER.method, obj, LabCheckoutConfig.LAB_API.SHOPPING_CART.CLEAR_LAB_SHOPPING_CART.PATH);
    }

    let forceCancelTheOrder = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.FORCE_CANCEL_LAB_ORDER.HEADER.method, obj, LabCheckoutConfig.LAB_API.LAB_ORDER.FORCE_CANCEL_LAB_ORDER.PATH);
    }

    let removePatientFromLabShoppingCart = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.PATIENT.REMOVE_PATIENT_INFO_FROM_SHOPPING_CART.HEADER.method, obj, LabCheckoutConfig.LAB_API.PATIENT.REMOVE_PATIENT_INFO_FROM_SHOPPING_CART.PATH);
    }

    let addRemainingTestsToCart = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.ADD_REMAINING_TESTS_TO_CART.HEADER.method,obj,LabCheckoutConfig.LAB_API.LAB_ORDER.ADD_REMAINING_TESTS_TO_CART.PATH);
    }

    let getReckonerData = (obj) => {
        return ServerRequest(LabCheckoutConfig.LAB_API.LAB_ORDER.GET_RECKONER_DATA.HEADER.method,obj,LabCheckoutConfig.LAB_API.LAB_ORDER.GET_RECKONER_DATA.PATH);
    }

    return {
        getLabShoppingCart,
        getCustomerPatients,
        addOrEditCustomerPatient,
        addPatientToShoppingCart,
        updateDoctorToPatient,
        getCustomerAddresses,
        getCollectionCenters,
        setDeliveryLocationToCart,
        getSlotsDetails,
        setTimeSlotToCart,
        addSampleCollectionInfoToCart,
        applyCoupon,
        removeCoupon,
        getCaptch,
        addTestToCart,
        removeTestFromCart,
        getLabCartInfo,
        addReportDeliveryInfo,
        getPaymentGatewayDetails,
        submitLabOrder,
        getLabOrderThankYouResponse,
        getPaymentLabOrderSummary,
        getRetryPaymentLabOrderSummary,
        submitLabRetryOrder,
        clearLabShoppingCart,
        forceCancelTheOrder,
        deletePatient,
        removePatientFromLabShoppingCart,
        addRemainingTestsToCart,
        getReckonerData
    };

}
export default LabCheckOutService;