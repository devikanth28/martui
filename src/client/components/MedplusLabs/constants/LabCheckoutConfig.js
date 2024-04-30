import { DIAGNOSTICS_HOME } from "./LabConstants";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const LAB_CHECKOUT = "labCheckout";
const LAB_ORDER_HISTORY = "labOrderHistory/"


const LabCheckoutConfig = {
    LAB_HOME_URL: process.env.API_URL + DIAGNOSTICS_HOME,
    LAB_API_URL: process.env.API_URL,
    REDIRECT_HOME_URL: process.env.API_URL,
    LAB_API: {
        SHOPPING_CART: {
            ADD_TEST_TO_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-test-to-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            REMOVE_TEST_FROM_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/remove-test-from-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_SHOPPING_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-lab-shopping-cart',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            APPLY_COUPON: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/apply-coupon-code',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            REMOVE_COUPON: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/remove-coupon-code',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            CLEAR_LAB_SHOPPING_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/clear-lab-shopping-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        PATIENT: {
            GET_CUSTOMER_PATIENTS: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-customer-patients',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            ADD_OR_EDIT_CUSTOMER_PATIENT: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-or-edit-customer-patient',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            ADD_PATIENT_TO_SHOPPING_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-patient-to-shopping-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            UPDATE_DOCTOR_TO_PATIENT: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/update-doctor-to-patient',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            DELETE_PATIENT: {
                PATH: process.env.API_URL + LAB_CHECKOUT + "/delete-patient",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            REMOVE_PATIENT_INFO_FROM_SHOPPING_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + "/removePatientInfoFromShoppingCart",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        SAMPLE_COLLECTION_AND_SLOT_SELECTION: {
            GET_COLLECTION_CENTERS: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-collection-centers',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_CUSTOMER_ADDRESSES: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-customer-home-addresses',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            SET_DELIVERY_LOCATION_TO_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-delivery-location-to-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_SLOT_DETAILS: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-slot-details',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            SET_TIME_SLOT_TO_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-time-slot-to-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            ADD_SAMPLE_COLLECTION_INFO_TO_CART: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-sample-collection-info-to-cart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        LAB_ORDER: {
            SUBMIT_LAB_ORDER: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/submit-order',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_CAPTCHA: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/getCaptcha',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            SUBMIT_LAB_RETRY_ORDER: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/submit-retry-order',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            FORCE_CANCEL_LAB_ORDER: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/force-cancel-lab-order',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            ADD_REMAINING_TESTS_TO_CART:{
                PATH:process.env.API_URL + LAB_CHECKOUT + "/add-remaining-tests-to-cart",
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },
            GET_RECKONER_DATA:{
                PATH:process.env.API_URL + LAB_ORDER_HISTORY + 'getReckonerData',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            }
        },
        LAB_PAYMENT: {
            GET_PAYMENT_GATEWAYS: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-payment-gateways',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            }
        },
        LAB_ORDER_REVIEW_PAGE: {
            GET_LAB_CART_INFO: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-lab-order-review',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            ADD_REPORT_DELIVERY_INFO: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/add-report-delivery-info',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_PAYMENT_ORDER_SUMMARY: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-payment-order-summary',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_RETRY_PAYMENT_ORDER_SUMMARY: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-retry-payment-order-summary',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        LAB_ORDER_SUMMARY: {
            GET_THANKYOU_RESPONSE: {
                PATH: process.env.API_URL + LAB_CHECKOUT + '/get-lab-order-thank-you-response',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            }
        }
    }
}

export default LabCheckoutConfig;
