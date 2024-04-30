const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const DOCTORS_API = 'doctors-api/';
const ADMIN = "admin/"

const DOCTOR_CONSULTATION_CONFIG = {
    API : {
        PUSH_DOCTERS_DATA_INTO_REDIS : {
            PATH : process.env.API_URL + DOCTORS_API + ADMIN + "pushDoctorsDataToRedis",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        GET_SPECIALIALIZATIONS_LIST : {
            PATH : process.env.API_URL + DOCTORS_API + "getSpecializationsList",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        }, 
        GET_CONSULTATION_URL:{
            PATH: process.env.API_URL + DOCTORS_API+"myAccount/doctorConsultationUrl",
            HEADER:{
                method: REQUEST_TYPE.POST
            }
        },
        VALIDATE_CONSULTATION:{
            PATH: process.env.API_URL + DOCTORS_API+"myAccount/validateInitiateConsultation",
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        GET_SYMPTOMS_LIST : {
            PATH : process.env.API_URL + DOCTORS_API + "getSymptomsList",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },
        DOCTOR_INFO: {
            GET_DOCTOR_INFO: {
                PATH : process.env.API_URL +DOCTORS_API + 'catalog/getDoctorInfo',
                HEADER: {
                    method: REQUEST_TYPE.GET
                },
            },
            GET_SEARCH_RESULTS:{
                PATH : process.env.API_URL +DOCTORS_API + 'search/getSearchResults',
                HEADER: {
                    method: REQUEST_TYPE.GET
                },
            }
        },
        GET_DOCTORS_LIST: {
            PATH: process.env.API_URL +DOCTORS_API + "catalog/getDoctorsList",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },GET_DOCTORS_FOR_CATALOG: {
            PATH: process.env.API_URL +DOCTORS_API + "catalog/getDoctorsForCatalog",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },
        GET_DOCTOR_CONSULT_CONTENT:{
            PATH : process.env.API_URL +DOCTORS_API + 'getDoctorConsultationContent',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        GET_DOCTOR_CONSULTATIONS: {
            PATH:process.env.API_URL +DOCTORS_API + "myAccount/getDoctorConsultations",
            HEADER :{
                method:REQUEST_TYPE.POST
            }
        },
        UPDATE_EMAIL:{
            PATH : process.env.API_URL +DOCTORS_API +"myAccount/updateEmail",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        GET_DOCTORS_CATEGORIES :{
            PATH : process.env.API_URL+DOCTORS_API+"getDoctorsCategories",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },
        INVOICE_MAIL:{
            PATH : process.env.API_URL +DOCTORS_API +"myAccount/emailInvoice",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        GET_PREVIOUS_CONSULTED_DOCTORS : {
            PATH : process.env.API_URL + DOCTORS_API + "getPreviouslyConsultedDoctors",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },
        CANCEL_DOCTOR_CONSULTATION : {
            PATH : process.env.API_URL + DOCTORS_API + "myAccount/cancelConsultationAppointment",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        GET_UPCOMING_CONSULTATIONS:{
            PATH : process.env.API_URL + DOCTORS_API + "getUpcomingConsultations",
            HEADER : {
                method : REQUEST_TYPE.GET
            }
        },
        GET_DOCTOR_CONSULT_BANNERS:{
            PATH : process.env.API_URL + DOCTORS_API + 'getBannerDetails',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        GET_DOCTORS_SORT_AND_FILTERS:{
            PATH : process.env.API_URL + DOCTORS_API + 'catalog/getSortAndFiltersForCatalog',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        CHECKOUT: {
            GET_FOLLOW_UP_DOCTOR_DETAILS_TO_VALIDATE: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/validateFollowupBooking",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            CLEAR_BOOKING_CONSULTATION: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/clearDoctorConsultation",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            ADD_PRIMARY_INFO_TO_DOCTOR_CONSULTATION: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/addPrimaryInfoToDoctorConsultation",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_PATIENTS: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/getPatients",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            ADD_OR_EDIT_PATIENT_FOR_CUSTOMER:{
                PATH : process.env.API_URL + DOCTORS_API + "checkout/addOrEditPatient",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            DELETE_PATIENT:{
                PATH : process.env.API_URL + DOCTORS_API + "checkout/deletePatient",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            REMOVE_PATIENT_INFO_FROM_DOCTOR_CONSULTATION_INFO:{
                PATH : process.env.API_URL + DOCTORS_API + "checkout/removePatientInfoFromDoctorConsultation",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_AVAILABLE_CLINICS: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/getDoctorClinics",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_TIMING_SLOTS: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/getDoctorTimingSlots",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            ADD_DOCTOR_CONSULTATION_INFO: {
                PATH : process.env.API_URL + DOCTORS_API + "checkout/addConsultationInfo",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_DOCTOR_CONSULTATION_FOR_REVIEW: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/getDoctorConsultationForReview",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_DOCTOR_CONSULTATION_FOR_RETRY: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/getRetryReviewDetails",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_PAYMENT_MODES: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/getPaymentMethods",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_CAPTCHA: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/getCaptcha",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            CREATE_BOOKING: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/createBookingForConsultation",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            RETRY_PAYMENT: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/retryPaymentForConsultation",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            APPLY_COUPON: {
                PATH : process.env.API_URL +DOCTORS_API + "checkout/applyCoupon",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            REMOVE_COUPON :{
                PATH : process.env.API_URL +DOCTORS_API + "checkout/removeCoupon",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_BOOKING_DETAILS_FOR_SUCCESS: {
                PATH: process.env.API_URL + DOCTORS_API + 'checkout/getBookingDetailsForSuccess',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            FORCE_CANCEL_DOCTOR_CONSULTATION : {
                PATH: process.env.API_URL + DOCTORS_API + 'checkout/forceCancelDoctorConsultation',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
    }
}

export default DOCTOR_CONSULTATION_CONFIG;