
const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH'
};

const CONTENT_TYPE = {
    JSON: 'application/json; charset=utf-8'
};

const MART_CATALOG_API_URL = process.env.API_URL + "mart-catalog-api/";
const MY_PROFILE_CONST="my-profile/"
const MEDPLUS_SUBSCRIPTION='medplusSubscription/';
const LAB_CHECKOUT = "labCheckout";
const MY_LAB_ORDER_HISTORY_CONST="labOrderHistory/"
const LAB_CATALOG = "labcatalog/"
const PAYBACK_CONST = "payback-api/"
const MART_CHECKOUT="mart-checkout/"
const MART_COMMON="mart-common-api/"

const CONFIG = {
    REDIRECT_HOME_URL: process.env.API_URL,
    BOT_WEBSOCKET_URL: process.env.BOT_WEBSOCKET_URL,
    API: {
        LOGIN: {
            LOGIN_WITH_PASSWORD : {
                PATH:  process.env.API_URL + 'loginWithPassword.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },  
        IMAGE_PROCESS: {
            GET_IMAGE_SERVER_DETAIL: {
                PATH:  process.env.API_URL+ MY_PROFILE_CONST + 'getImageServerDetail',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        }, 
        FOOTER :{
            SUBSCRIBE_NEWS_LETTER : {
                PATH:  process.env.API_URL + MY_PROFILE_CONST  + 'subscribeNewsLetter',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_DYNAMIC_FOOTER : {
                PATH: MART_CATALOG_API_URL + 'getDynamicFooter',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        IS_CUSTOMER_LOGGED_IN: {
            PATH:  process.env.API_URL  + 'isCustomerLoggedIn.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
        },
        REMOVE_SESSION: {
            PATH:  process.env.API_URL + MART_COMMON + 'removeSession',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
        },
        COMMON_HEADER :{
            GET_NAVIGATION_DETAILS : {
                PATH:  process.env.API_URL  + 'getNavigationMenu.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_CUSTOMER_NOTIFICATION:{
                PATH: process.env.API_URL + MY_PROFILE_CONST + 'getNotifications',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            UPDATE_CUSTOMER_NOTIFICATION:{
                PATH: process.env.API_URL  + MY_PROFILE_CONST + 'updateNotifications',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_MINI_SHOPPING_CART:{
                PATH: MART_CATALOG_API_URL + 'prepareMiniShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CLEAR_SHOPPING_CART:{
                PATH: MART_CATALOG_API_URL + 'clearShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PRODUCT_SUGGESTIONS: {
                PATH:  process.env.API_URL  + 'getProductAutoSuggestions.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_COMPOSITION_SUGGESTIONS: {
                PATH:  process.env.API_URL  + 'getCompositionSuggestions.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },GET_PRODUCT_SPECIAL_DISCOUNT: {
                PATH:  process.env.API_URL  + 'getProductSpecialDiscountOnSearch.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            MY_WALLET: {
                GET_MYWALLET_AMOUNT: {
                    PATH:  process.env.API_URL+MY_PROFILE_CONST+'getMWalletAmount',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },
            GET_UNREAD_NOTIFICATION_COUNT:{
                PATH: process.env.API_URL + MY_PROFILE_CONST + 'getUnreadNotificationCount',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
        },
        REGISTRATION: {
            REGISTER_NEW_CUSTOMER: {
                PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'saveUserDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_REGISTRATION_OTP_DETAILS : {
                PATH:  process.env.API_URL  + 'getRegistrationOtpDetails.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VERIFY_REGISTRATION_OTP : {
                PATH:  process.env.API_URL  + 'reactRegistrationVerifyOtp.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REGENERATE_REGISTRATION_OTP : {
                PATH:  process.env.API_URL  + 'regenerateOtpForRegistration.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            FORGET_PASSWORD :{
                PATH:  process.env.API_URL  + 'forgotPassword.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_LOGIN_CAPTCHA :{
                PATH:  process.env.API_URL + MY_PROFILE_CONST  + 'getCaptchaCode',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        }, 
        MY_ACCOUNT: {
            GET_LOGGED_IN_USER_INFO: {
                PATH:  process.env.API_URL+MY_PROFILE_CONST +'getCustomerDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SUBMIT_ORDER_COMPLAINT: {
                PATH:  process.env.API_URL+MY_PROFILE_CONST +'submitComplaint',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_USER_CONTACT_DETAILS: {
                PATH:  process.env.API_URL+MY_PROFILE_CONST +'getCustomerDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON 
                }
            },
            MY_PROFILE:{
                CHANGE_PASSWORD: {
                    PATH:  process.env.API_URL+MY_PROFILE_CONST +'changePassword',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GENERATE_PASSWORD: {
                    PATH: process.env.API_URL+MY_PROFILE_CONST +'generatePassword',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CHANGE_EMAIL_ADDRESS:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST+'changeEmailAddress',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CHANGE_ADDRESS:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST +'editProfile',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                SAVE_USER_DETAILS:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST +'saveUserDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_USER_LOGIN_INFO:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST +'getCustomerDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CHANGE_PHONE_NUMBER:{
                    SEND_OTP_FOR_MOBILE_NUMBER:{
                        PATH: process.env.API_URL+MY_PROFILE_CONST+'sendOtpForMobileNumber',
                        HEADER: {
                            method: REQUEST_TYPE.POST,
                            contentType: CONTENT_TYPE.JSON
                        }
                    },
                    VERIFY_OTP_FOR_MOBILE_NUMBER:{
                        PATH: process.env.API_URL+MY_PROFILE_CONST+'verifyOtpForMobileNumber',
                        HEADER: {
                            method: REQUEST_TYPE.POST,
                            contentType: CONTENT_TYPE.JSON
                        }
                    },
                    OTP_FOR_EDIT_NO:{
                        PATH: process.env.API_URL+MY_PROFILE_CONST+'sendOtpForEditMobileNumber',
                        HEADER: {
                            method: REQUEST_TYPE.POST,
                            contentType: CONTENT_TYPE.JSON
                        }
                    },
                    VERIFY_OTP_FOR_EDIT_NO:{
                        PATH:  process.env.API_URL+MY_PROFILE_CONST +'otpVerifyForEditMobNumber',
                        HEADER: {
                            method: REQUEST_TYPE.POST,
                            contentType: CONTENT_TYPE.JSON
                        }
                    },
                    SEND_OTP_ON_CALL:{
                        PATH:  process.env.API_URL+MY_PROFILE_CONST +'getOtpOnCallForEditMobileNumber',
                        HEADER: {
                            method: REQUEST_TYPE.POST,
                            contentType: CONTENT_TYPE.JSON
                        }
                    }
                },
            },
            WISH_LIST_INFO: {
                GET_WISH_LIST_BY_TYPE: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST +'getWishlist',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_WISH_LIST_BY_PRODUCT_IDS: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST +'getFrequentlyOrderProducts',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_SORTED_WISH_LIST_INFO: {
                    PATH: process.env.API_URL+ MY_PROFILE_CONST +'getSortedFrequentlyOrderProducts',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                MODIFY_WISH_LIST: {
                    PATH:  process.env.API_URL  + MY_PROFILE_CONST + 'modifyWishlist',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                NOTIFY_PRODUCT: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + 'requestCustRequisitionProduct',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PRODUCT_NOTIFY_INFO: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getProductNotifiedInfo',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },
            GET_MY_HEALTH_RECORDS: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getHealthRecords',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },


            CREATE_OR_UPDATE_HEALTH_RECORD: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'createOrUpdateHealthRecord',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_MY_HEALTH_RECORDS_MART: {
                PATH:  process.env.API_URL  + 'secure/getMyHealthRecords.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_MY_HEALTH_RECORD: {
                PATH:  process.env.API_URL  + 'secure/createMyHealthRecord.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            UPDATE_MY_HEALTH_RECORD: {
                PATH:  process.env.API_URL  + 'secure/updateMyHealthRecord.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            DELETE_MY_HEALTH_RECORD: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'deleteHealthRecord',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_ORDER_FROM_HEALTH_RECORD: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'createOrderFromHealthRecord',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REFILL_HISTORY: {
                GET_REFILL_HISTORY: {
                    PATH: MY_PROFILE_CONST+'getCustomerRefills',
                    HEADER: {
                        method: REQUEST_TYPE.GET
                    }
                },
                GET_REFILL_DETAILS:{
                    PATH: MY_PROFILE_CONST+'getRefillDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                    }
                },
                REMOVE_REFILL_PRODUCT:{
                    PATH: MY_PROFILE_CONST+'deleteRefillProduct',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                },
                UNSUBSCRIBE_REFILL:{
                    PATH: MY_PROFILE_CONST+'unsubscribeRefill',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                    }
                },
                MODIFY_REFILL_INTERVAL:{
                    PATH: MY_PROFILE_CONST+'updateRefillInterval',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                },
                MODIFY_REFILL_PRODUCT_QTY:{
                    PATH: MY_PROFILE_CONST+'updateRefillProductQty',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                    }
                }
            },

            MY_LAB_ORDERS: {
            	GET_LAB_ORDERS: {
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST+'getLabOrders',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_LAB_ORDER_DETAIL:{
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST+'getLabOrderDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PARAMETERS_DETAILS: {
                    PATH: process.env.API_URL+ MY_LAB_ORDER_HISTORY_CONST+ 'getParametersDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                   }
                },
                SHARE_HEALTH_RECORD_GRAPH: {
                    PATH: process.env.API_URL+ MY_LAB_ORDER_HISTORY_CONST+'shareHealthRecordGraph',
                    HEADER: {
                         method: REQUEST_TYPE.GET,
                         contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_HEALTH_RECORD_GRAPH: {
                    PATH: process.env.API_URL+ MY_LAB_ORDER_HISTORY_CONST+'getHealthRecordGraph',
                    HEADER: {
                         method: REQUEST_TYPE.GET,
                         contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PREVIOUS_AND_NEXT_LAB_ORDER_IDS:{
                    PATH:process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST + 'getPreviousAndNextLabOrderIds',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CANCEL_LAB_ORDER:{
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST + 'cancelLabOrder',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                DOWNLOAD_PATIENT_LAB_REPORTS:{
                    PATH:process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST +'downloadLabReport',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                PRINT_LAB_REPORT : {
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST +'printLabReport',
                    HEADER: {
                        method: REQUEST_TYPE.GET
                    }
                },
                GET_PATIENT_HASH : {
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST +'getPatientHash',
                    HEADER: {
                        method: REQUEST_TYPE.GET
                    }
                },
                GET_PATIENT_DETAILS_FROM_HASH : {
                    PATH: process.env.API_URL+MY_LAB_ORDER_HISTORY_CONST +'getPatientDetailsFromHash',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                }
            },

            MY_WALLET: {
                GET_MYWALLET_INFO: {
                    PATH:  MY_PROFILE_CONST+'getWalletInfo',
                    HEADER: {
                        method: REQUEST_TYPE.GET
                    }
                },
                GET_MYWALLET_TRANSACTIONS: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + '/getWalletTransactionDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },

            MY_COMPLAINTS: {
                GET_MY_COMPLAINTS_HOSTORY: {
                    PATH:  process.env.API_URL  + 'my-profile/getTicketsHistory',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },

            FLEXI_REWARDS:{
                GET_FLEXI_REWARDS_INFO:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST  + 'getGiftRedemptionInfo',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_GIFT_CAEGORY_PRODUCTS:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST  + 'getGiftCategoryProducts',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    } 
                },
                ADD_REWARD_PRODUCT:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST + 'addOrModifyGiftCart',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                REMOVE_REWARD_PRODUCT:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST + 'removeGiftProduct',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_GIFT_CART: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getGiftCart',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CLEAR_GIFT_CART: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST  + 'clearGiftCart',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_TRANSACTION_DETAILS: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getPointHistoryDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_GIFT_REVIEW: {
                    PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getFlexiCartReview',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CREATE_GIFT_ORDER: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'createRedemptionOrder',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GIFT_ORDER_SUMMARY: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'getRedemptionOrderSummary',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },
            PAYBACK:{
                GET_PAYBACK_CATEGORY_PRODUCTS:{
                    PATH:  process.env.API_URL+PAYBACK_CONST  + 'getPaybackCategoryProducts',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                ADD_OR_MODIFY_PAYBACK_CART:{
                    PATH:  process.env.API_URL+PAYBACK_CONST + 'secure/addOrModifyPaybackCart',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_GIFT_CART: {
                    PATH:  process.env.API_URL + PAYBACK_CONST + 'secure/getPaybackCart',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                REMOVE_PAYBACK_PRODUCT:{
                    PATH:  process.env.API_URL+ PAYBACK_CONST + 'secure/removeGiftProduct',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CLEAR_PAYBACK_CART:{
                    PATH:  process.env.API_URL+ PAYBACK_CONST + 'secure/clearPaybackCart',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_TRANSACTION_DETAILS: {
                    PATH:  process.env.API_URL + PAYBACK_CONST + 'secure/getPaybackTransactionHistoryDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_DELIVERY_DETAILS: {
                    PATH:  process.env.API_URL+ PAYBACK_CONST  + 'secure/getPickupStores',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                SAVE_PAYBACK_DELIVERY_DETAILS: {
                    PATH:  process.env.API_URL+ PAYBACK_CONST  + 'secure/saveDeliveryDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_GIFT_REVIEW: {
                    PATH:  process.env.API_URL + PAYBACK_CONST + 'secure/getPaybackCartReview',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CREATE_PAYBACK_OMS_ORDER:{
                    PATH:  process.env.API_URL+ PAYBACK_CONST  + 'secure/createPaybackOrder',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_ORDER_SUMMARY: {
                    PATH:  process.env.API_URL+ PAYBACK_CONST  + 'secure/paybackThankYouSummary',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PAYBACK_PAYMENT_CONFIG: {
                    PATH:  process.env.API_URL+ PAYBACK_CONST  + 'secure/getPaybackPaymentConfig',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                }
            },
            PURCHASE_HISTORY:{
                GET_HEALTH_RECORD_BY_PRESC_ID: {
                    PATH: process.env.API_URL + MY_PROFILE_CONST + 'getPrescriptionDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                },
                GET_OMS_ORDER_DETAILS: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'getOrderItems',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_PRESCRIPTION_ORDER_DETAILS:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST+'getPrescriptionDetails',
                    HEADER:{
                        method:REQUEST_TYPE.POST,
                        contentType:CONTENT_TYPE.JSON
                    }
                },
                GET_ORDER_PAYMENT_DETAILS: {
                    PATH: process.env.API_URL+ MY_PROFILE_CONST   + 'getPaymentDetails',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_ORDER_TRACK_INFO: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'getOrderStatusInfo',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_ORDER_RETURN_INFO: {
                    PATH: process.env.API_URL+ MY_PROFILE_CONST+'getMartCustomerReturns',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_RETURN_TRACK_INFO: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'getReturnStatusInfo',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_RETURN_REFUND_INFO: {
                    PATH:  process.env.API_URL+ MY_PROFILE_CONST  + 'getReturnRefundDetails',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_RETURN_ORDER_DETAILS:{
                    PATH: process.env.API_URL+MY_PROFILE_CONST+'returnOrderDetails',
                    HEADER:{
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }

                },
                SAVE_CUSTOMER_FEEDBACK: {
                    PATH:  process.env.API_URL  + '/saveCustomerFeedBack.mart',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_ORDER_HISTORY: {
                    PATH:  process.env.API_URL  + MY_PROFILE_CONST + 'getCustomerOrderHistory',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_INVOICE_DETAILS: {
                    PATH:  process.env.API_URL  +MY_PROFILE_CONST+ 'getInvoiceItems',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_REORDER_DETAILS: {
                    PATH:  process.env.API_URL  + MY_PROFILE_CONST +  'getOrderItems',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_REINVOICE_DETAILS: {
                    PATH: process.env.API_URL + MY_PROFILE_CONST  + 'getInvoiceItems',
                      HEADER: {
                          method: REQUEST_TYPE.POST,
                          contentType: CONTENT_TYPE.JSON
                      }
                  },
                EDIT_PRESCRIPTION: {
                    PATH:  process.env.API_URL  + MY_PROFILE_CONST+'editPrescriptionOrder',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                CANCEL_OMS_ORDER: {
                    PATH:  process.env.API_URL  + MY_PROFILE_CONST+'cancelOrder',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_LATEST_ORDER_FOR_CUSTOMER:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST+'getLatestOrderForCustomer',
                    HEADER:{
                        method:REQUEST_TYPE.GET,
                        contentType:CONTENT_TYPE.JSON
                    }
                },
                GET_RETRY_PAYMENT_INFO_FOR_CUSTOMER:{
                    PATH:  process.env.API_URL+MY_PROFILE_CONST+'getRetryPaymentInfoForCustomer',
                    HEADER:{
                        method:REQUEST_TYPE.GET,
                        contentType:CONTENT_TYPE.JSON
                    }
                },
            },
            MDX_POINTS : {
                GET_MDX_POINTS_TRANSACTION_DETAILS: {
                    PATH:process.env.API_URL +MEDPLUS_SUBSCRIPTION+ 'secure/getMdxPointsTransactionHistoryDetails',
                    HEADER:{
                        method:REQUEST_TYPE.GET
                    }
                }
            }
        },
        SHOPPING_CART: {
            GET_SHOPPING_CART_PRODUCTS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getCartInfo',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_OR_MODIFY_PRODUCT_TO_SHOPPING_CART: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'modifyCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            MODIFY_SHOPPING_CART_PRODUCT_QUANTITY: {
                PATH:  process.env.API_URL  + 'secure/modifyShoppingCartProductQuantity.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_OR_MODIFY_PRODUCT_TO_CART: {
                PATH:  MART_CATALOG_API_URL  + 'addOrModifyCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_BULK_PRODUCT_TO_CART: {
                PATH:  MART_CATALOG_API_URL + 'addBulkProductsToCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_PRODUCT_TO_REDIS_CART: {
                PATH:  process.env.API_URL  + 'addProductToRedisCart.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_PRODUCT_TO_COOKIE_CART: {
                PATH:  process.env.API_URL  + 'addProductToCookieCart.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_OR_MODIFY_COMPLIMENTARY_PRODUCT_TO_CART: {
                PATH: process.env.API_URL +MART_CHECKOUT + 'addOrModifyComplimentaryItem',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PAYMENT_AND_PROMOTION_BANNERS: {
                PATH:  process.env.API_URL  + 'secure/getPaymentAndPromotionBanners.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            PROCEED_SHOPPING_CART: {
                PATH: process.env.API_URL + MART_CHECKOUT +'proceedShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        PRESCRIPION: {
            GET_CHECKOUT_PRESCRIPTION_OPTIONS: {
                PATH:  process.env.API_URL +MART_CHECKOUT + 'getCheckoutPrescriptionOptions',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_HEALTH_RECORD: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'uploadHealthRecord',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SAVE_PRESCRIPTION_DETAILS: {
                PATH: process.env.API_URL + MART_CHECKOUT +'setPrescriptionDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PREVIOUS_HEALTH_RECORDS: {
                PATH:  process.env.API_URL  + MY_PROFILE_CONST + 'getPreviousHealthRecords',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SEND_OTP_FOR_UPLOAD_PRESCRIPTION: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'getOtpForPrescriptionsSubmit',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            PRESCRIPTION_UPLOAD: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'saveHealthRecord',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_MOBILE_NUMBER: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST  + 'getMobileNumber',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VERIFY_OTP_FOR_PRESCRIPTION_UPLOAD: {
                PATH:  process.env.API_URL + MY_PROFILE_CONST + 'verifyOtpForPrescriptionsSubmit',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_HEALTH_RECORD_BY_PRESC_ID: {
                PATH: process.env.API_URL + MY_PROFILE_CONST + 'getPrescriptionDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        CHECKOUT: {
            GET_DELIVERY_DETAILS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getLocationDeliveryDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_DELIVERY_DETAILS_OPTIONS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getLocationDeliveryDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PICK_STORE_DETAILS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getPickStoreDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_ADDRESS_AND_COMMUNITIES: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getAddressAndCommunities',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            
            GET_PROFILE_DELIVERY_DETAILS: {
                PATH:  process.env.API_URL+MY_PROFILE_CONST  + 'getPickupStores',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SAVE_FLEXI_DELIVERY_DETAILS: {
                PATH:  process.env.API_URL+MY_PROFILE_CONST  + 'saveDeliveryDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SAVE_DELIVERY_DETAILS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'setDeliveryDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_OR_UPDATE_DELIVERY_DETAILS: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'addNewAddress',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PAYMENT_CONFIG:{
                PATH:  process.env.API_URL  + 'secure/getPaymentConfig.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_RETRY_PAYMENT_CONFIG:{
                PATH:  process.env.API_URL  + 'secure/getRetryPaymentConfig.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_OMS_ORDER:{
                PATH: process.env.API_URL + 'secure/createCartOrder.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            RETRY_PAYMENT:{
                PATH: process.env.API_URL + 'secure/reattemptPayment.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            RETRY_PAYMENT_NEW:{
                PATH: process.env.API_URL + MART_CHECKOUT + 'reattemptPayment',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REQUEST_PAYMENT:{
                PATH: process.env.API_URL + MART_CHECKOUT+"initiatePayment",
                HEADER: {
                    method: REQUEST_TYPE.POST,
                }
            },
            GET_APPLIED_DISCOUNT:{
                PATH: process.env.API_URL + 'secure/getSelectedDiscount.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            EDIT_RETRY_ORDER:{
                PATH: process.env.API_URL + 'secure/editRetryPaymentOrder.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            UPDATE_PATIENT_DETAILS_IN_SHOPPING_CART:{
                PATH: process.env.API_URL + MART_CHECKOUT + 'addPatientToShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REMOVE_PATIENT_DETAILS_IN_SHOPPING_CART:{
                PATH: process.env.API_URL + MART_CHECKOUT + 'removePatientDetailsFromShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_REFILL_RE_ORDER_DETAILS:{
                PATH: process.env.API_URL + 'getRefillReOrderDetails.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_CFP_ORDER_DETAILS:{
                PATH: process.env.API_URL + 'getCfp.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VALIDATE_PAYBACK_POINTS:{
                PATH: process.env.API_URL + MART_CHECKOUT+"validatePayBackPoints",
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PAYMENT_PAGE_SUMMARY : {
                PATH: process.env.API_URL + MART_CHECKOUT+ 'getPaymentPageSummary',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_MYWALLET_AMOUNT : {
                PATH: process.env.API_URL + MART_CHECKOUT+ 'getWalletAndFinalAmount',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_ORDER : {
                PATH: process.env.API_URL + MART_CHECKOUT+ 'createOrder',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_RETRY_PAYMENT_PAGE_SUMMARY : {
                PATH: process.env.API_URL + MART_CHECKOUT+ 'getRetryPaymentPageSummary',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REDIRECT_TO_RETRY_PAYMENT : {
                PATH: process.env.API_URL + MART_CHECKOUT + 'redirectToRetryOrderPayment',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SET_REORDER_ITEM : {
                PATH: process.env.API_URL + MART_CHECKOUT + 'setReorderInfoIntoCart',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            FORCE_CANCEL_ORDER : {
                PATH: process.env.API_URL + MART_CHECKOUT + 'forceCancelOrder',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_ORDER_TYPE : {
                PATH: process.env.API_URL + MART_CHECKOUT + 'getOrderType',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            CANCEL_WALLET_TRANSACTION : {
                PATH: process.env.API_URL + MART_CHECKOUT + 'cancelWalletTransaction',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_CAPTCHA_CODE : {
                PATH:  process.env.API_URL  +MART_CHECKOUT+ 'getCaptchaCode',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VALIDATE_CAPTCHA_CODE : {
                PATH:  process.env.API_URL  +MART_CHECKOUT+ 'validateCaptchaCode',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        WALLET:{
            KYC : {
                SUBMIT_KYC_FORM : {
                    PATH: MY_PROFILE_CONST+'generateKycOtp',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                },
                VERIFY_CUSTOMER_KYC_OTP : {
                    PATH: MY_PROFILE_CONST+'saveCustKYCInfo',
                    HEADER: {
                        method: REQUEST_TYPE.POST
                    }
                }
            },
            GET_WALLET_AND_FINALAMOUNT:{
                PATH: process.env.API_URL + 'secure/getWalletAndFinalAmount.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            UPDATE_WALLET_AND_FINALAMOUNT:{
                PATH: process.env.API_URL + 'secure/updateWalletAndFinalAmount.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_WALLET_AND_FINALAMOUNT_FOR_RETRY:{
                PATH: process.env.API_URL + 'secure/getWalletAndFinalAmountForRetryPayment.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VERIFY_WALLET_OTP:{
                PATH: process.env.API_URL + 'v2/secure/verifyWalletOtp.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_MONEY_TO_WALLET:{
                PATH: MY_PROFILE_CONST+'walletRecharge',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            ADD_MONEY_TO_WALLET_CHECKOUT_FLOW:{
                PATH: process.env.API_URL + 'secure/walletRecharge.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GENERATE_WALLET_OTP:{
                PATH: process.env.API_URL + 'v2/secure/resendWalletOtp.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_WALLET_OTP_ON_CALL:{
                PATH: process.env.API_URL + 'requestOTPOnCall.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            UPLOAD_PAN_DETAILS:{
                PATH: MY_PROFILE_CONST+'addCustomerPanCardInfo',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            VERIFY_WALLET_OTP_FOR_DEBIT : {
                PATH: process.env.API_URL + MART_CHECKOUT+'verifyWalletOtpForDebit',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GENERATE_WALLET_OTP_FOR_MART : {
                PATH: process.env.API_URL + MART_CHECKOUT+'generateWalletOtp',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_MINIMUM_RELOAD_AMOUNT_AND_MWALLET_AMOUNT_FOR_MART : {
                PATH: process.env.API_URL + MART_CHECKOUT+'getWalletAndFinalAmount',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            RECHARGE_WALLET_CHECKOUT: {
                PATH: process.env.API_URL + MY_PROFILE_CONST + 'walletRecharge',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
        },
        ORDER_SUMMARY: {
            GET_ORDER_PRODUCTS: {
                PATH:  process.env.API_URL  + MART_CHECKOUT + 'getOrderReviewDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            APPLY_PROMOTION: {
                PATH:  process.env.API_URL  + 'secure/applyPromotionType.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            APPLY_COUPON: {
                PATH:  process.env.API_URL  +MART_CHECKOUT+'applyCoupon',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REMOVE_COUPON: {
                PATH: process.env.API_URL + MART_CHECKOUT + 'removeCoupon',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        TOKEN : {
            VALIDATE_TOKEN : {
                PATH:  process.env.API_URL + MART_COMMON  + 'validateToken',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GENERATE_TOKEN : {
                PATH:  process.env.API_URL + MART_COMMON  + 'generateToken',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            }

        },
        VERSION_KEYS : {
            GET_VERSION_KEYS : {
                PATH:  process.env.API_URL + MART_COMMON  + 'getVersionKeys',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        GET_CANCEL_REASONS : {
            PATH:  process.env.API_URL + MART_COMMON  + 'getOrderCancellationReasons',
            HEADER: {
                method: REQUEST_TYPE.GET,
                contentType: CONTENT_TYPE.JSON
            }
        },
        LOCALITY: {
            GET_SELECTED_LOCALITY_INFO: {
                PATH:  process.env.API_URL + MART_COMMON + 'validateToken',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_LOCALITY_AUTO_SUGGESTIONS: {
                PATH:  process.env.API_URL  +  MART_COMMON + 'getLocalityAutoSuggestions',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_RECENTLY_SEARCH_LOCALITY:{
                PATH: process.env.API_URL + MART_COMMON + 'getRecentlySearchLocality',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SET_SELECTED_LOCALITY: {
                PATH: process.env.API_URL + MART_COMMON + 'setLocality',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                } 
            },
            GET_CITY_COMMUNITIES: {
                PATH:  process.env.API_URL  + 'getCityCommunites.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                } 
            },
            SET_COMMUNITY_LOCALITY: {
                PATH:  process.env.API_URL  + 'setCommunityLocality.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                } 
            },
            SET_CURRENT_LOCATION: {
                PATH:  process.env.API_URL  + 'setCurrentLocation.mart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_LOCALITY_DETAILS_FOR_CHANGE_ADDRESS :{
                PATH:  process.env.API_URL  + 'getLocalityDetailsForChangeAddressModel.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        THANK_YOU_SUMMARY: {
            GET_ORDER_SUMMARY: {
                PATH:  process.env.API_URL  +MART_CHECKOUT+ 'getOrderDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_REFILL_ORDER: {
                PATH:  process.env.API_URL  +MART_CHECKOUT + 'createRefillRequest',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        BOT: {
            GET_BOT_TOKEN: {
                PATH: process.env.API_URL + MY_PROFILE_CONST + "bot/token",
                HEADER: {
                    method: REQUEST_TYPE.GET,
                },
            },
            GET_BOT_HISTORY: {
                PATH:  process.env.API_URL   + "bot/api/history",
                HEADER: {
                    method: REQUEST_TYPE.GET,
                },
            },
            GET_BOT_ORDER_HISTORY: {
                PATH:  process.env.API_URL   + "bot/api/order-history",
                HEADER: {
                    method: REQUEST_TYPE.GET,
                },
            },
            GET_BOT_CUSTOMER_HISTORY: {
                PATH:  process.env.API_URL   + "bot/api/customer-history",
                HEADER: {
                    method: REQUEST_TYPE.GET,
                },
            },
            
        },
        LAB_CHECKOUT: {
            GET_LAB_SHOPPING_CART:{
                PATH: process.env.API_URL  + 'labCheckout/addShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REMOVE_LAB_SHOPPING_CART_ITEM:{
                PATH: process.env.API_URL  + 'labCheckout/removeShoppingCartItem',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            APPLY_COUPON_ON_SHOPPING_CART:{
                PATH: process.env.API_URL  + 'labCheckout/applyCouponCodeInShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SAMPLE_COLLECTION: {
                GET_LAST_ORDER_ADDRESS:{
                    PATH: process.env.API_URL  + 'labCheckout/getLastOrderAddress',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_CUSTOMER_ADDRESSES:{
                    PATH: process.env.API_URL  + 'labCheckout/getCustomerAddresses',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_LAST_VISITED_COLLECTION_CENTRE:{
                    PATH: process.env.API_URL  + 'labCheckout/getLastVisitCollectionCenter',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                GET_COLLECTION_CENTRES:{
                    PATH: process.env.API_URL  + 'labCheckout/getCollectionCenters',
                    HEADER: {
                        method: REQUEST_TYPE.GET,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
                ADD_SAMPLE_COLLECTION_CONFIG:{
                    PATH: process.env.API_URL  + 'labCheckout/addSampleCollectionConfig',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                        contentType: CONTENT_TYPE.JSON
                    }
                },
            },
            APPLY_COUPON_CODE:{
                PATH: process.env.API_URL  + 'labCheckout/applyCouponCode',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REMOVE_COUPON_CODE:{
                PATH: process.env.API_URL  + 'labCheckout/removeCouponCode',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_REPORT_DELIVERY: {
                PATH: process.env.API_URL + 'labCheckout/addReportDeliveryToCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            PATIENT_INFO: {
                PATH: process.env.API_URL + 'labCheckout/getPatientDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_AVAILABLE_SLOT_INFO: {
                PATH: process.env.API_URL + 'labCheckout/getSlotDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SAVE_NEW_PATIENT_INFO: {
                PATH: process.env.API_URL + 'labCheckout/addCustomerPatient',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_CUSTOMER_DETAILS: {
                PATH: process.env.API_URL + 'labCheckout/getCustomerDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_SHOPPING_CART_INFO: {
                PATH: process.env.API_URL + 'labCheckout/getShoppingCart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PAYMENT_CONFIG:{
                PATH:  process.env.API_URL  + 'labCheckout/getPaymentGatways',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_CAPTCHA_DATA:{
                PATH:  process.env.API_URL  + 'labCheckout/getCaptcha',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            CREATE_LAB_ORDER:{
                PATH:  process.env.API_URL  + 'labCheckout/submitOrder',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            ADD_PATIENT_AND__SLOT_INFO:{
                PATH:  process.env.API_URL  + 'labCheckout/addPatientAndTimeSlotToCart',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_THANK_YOU_DETAILS:{
                PATH:  process.env.API_URL  + 'labCheckout/getLabOrderSummary',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            REQUEST_PAYMENT:{
            	PATH: process.env.API_URL + 'labRequestPayment'
            }
        },
        SUBSCRIPTION : {
            CUSTOMER_LOGIN:{
                GET_OTP:{
                    PATH:process.env.API_URL+ MY_PROFILE_CONST + 'getOtp',
                    HEADER:{
                        method:REQUEST_TYPE.GET
                    }
                },
                OTP_VERIFY_FOR_NEW_CUST:{
                    PATH:process.env.API_URL + 'validateSubscriptionOtpForNewCustomer.mart',
                    HEADER:{
                        method:REQUEST_TYPE.POST
                    }
                },
                OTP_VERIFY_FOR_OLD_CUST:{
                    PATH:process.env.API_URL+MY_PROFILE_CONST + 'validateOtp',
                    HEADER:{
                        method:REQUEST_TYPE.POST
                    }
                },
                RESEND_OTP: {
                    PATH:process.env.API_URL+MY_PROFILE_CONST + 'resendOtp',
                    HEADER:{
                        method:REQUEST_TYPE.POST
                    }
                }
            },
            GET_CART_SUMMARY:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getCartSummary",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_RETRY_PAYMENT_ORDER_SUMMARY:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getRetryPaymentOrderSummary",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            CREATE_SUBSCRIPTION_ORDER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"createOrUpdateSubscription",
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },
            DELETE_MEMBER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"deleteMember",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            CREATE_RETRY_ORDER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"createRetryOrder",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_BANNER_DETAILS:{
                PATH:  process.env.API_URL  + 'medplusSubscription/subscriptionBannerDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_SUBSCRIPTION_CONTENT:{
                PATH:  process.env.API_URL  + 'medplusSubscription/getSubscriptionContent',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PLAN_DETAILS:{
                PATH:  process.env.API_URL  + 'medplusSubscription/getPlanDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_ORGANIZATIONS:{
                PATH:  process.env.API_URL  + 'medplusSubscription/getOrganizations',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PLANS_FOR_ORGANIZATION:{
                PATH:process.env.API_URL +"medplusSubscription/getPlansBasedOnOrganizations",
                HEADER:{
                    method:REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            SEND_EMAIL_OTP_FOR_CORPORATE_PLAN:{
                PATH:   process.env.API_URL  + 'medplusSubscription/sendEmailOtpForCorporatePlan',
                HEADER:{
                    method:REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            RESEND_EMAIL_OTP_FOR_CORPORATE_PLAN:{
                PATH:   process.env.API_URL  + 'medplusSubscription/resendOtp',
                HEADER:{
                    method:REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            VALIDATE_EMAIL_OTP_FOR_CORPORATE_PLAN:{
                PATH:   process.env.API_URL  + 'medplusSubscription/validateEmailOtpValue',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_PATIENTS_FOR_CUSTOMER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getMembers",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            VALIDATE_MEMBERS_FOR_PLAN:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"validatePlanSpecificMembers",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            SAVE_MEMBERS_FOR_PLAN:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"saveMembers",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_SUBSCRIPTIONS:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getSubscriptions",
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },
            GET_CUSTOMER_PLAN_PURCHASE_ELIGIBILITY: {
                PATH: process.env.API_URL + MEDPLUS_SUBSCRIPTION + "getCustomerPlanPurchaseEligibility",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_SUBSCRIPTIONS_WITH_COMBO_PLAN: {
                PATH: process.env.API_URL + MEDPLUS_SUBSCRIPTION + "getSubscriptionsWithComboPlan",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            CREATE_ORGANIZATION:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"saveOrganization",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_PAYMENTS_LIST_DETAILS:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getPaymentListDetails",
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },
            GET_SUBSCRIPTION_ORDER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getSubscriptionOrder",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            IS_CORPORATE_EMAIL_VERIFIED:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"isCorporateEmailVerified",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            CANCEL_SUBSCRIPTION_ORDER:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"cancelSubscriptionOrder",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_HOME_PAGE_PLANS:{
                PATH:process.env.API_URL+MEDPLUS_SUBSCRIPTION+"getHomePagePlans",
                HEADER:{
                    method:REQUEST_TYPE.GET
                } 
            }
        },
        LAB_ORDER_REVIEW_PAGE : {
            GET_LAB_CART_INFO:{
                PATH:process.env.API_URL + LAB_CHECKOUT + '/get-lab-order-review',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
        },
        CAMPAIGN_SERVICE : {
            GET_OTP_FOR_CAMPAIGN:{
                PATH:process.env.API_URL+ LAB_CATALOG  + 'generateOtpForCampaignUser',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            VERIFY_OTP_FOR_CAMPAIGN:{
                PATH:process.env.API_URL+ LAB_CATALOG  + 'verifyOtpForCampaignUser',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            RESEND_OTP_FOR_CAMPAIGN:{
                PATH:process.env.API_URL+ LAB_CATALOG  + 'resendOtpForCampaignUser',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            INSERT_FOR_CAMPAIGN:{
                PATH:process.env.API_URL+ LAB_CATALOG  + 'saveCampaignUserInfo',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            }
        },
        PRODUCT : {
            SAVE_REQUESTED_PRODUCT : {
                PATH : process.env.API_URL + MY_PROFILE_CONST + 'saveRequestedProduct/',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_PRODUCT_SEARCH: {
                PATH : MART_CATALOG_API_URL + "getProductSearch",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_COMPOSITION_SEARCH: {
                PATH: MART_CATALOG_API_URL + "getCompositionsSearch",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_DISCOUNT_FOR_PRODUCT_SEARCH: {
                PATH : MART_CATALOG_API_URL + "getDiscountForProductsSearch",
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            }
        },
        SEO : {
            GET_META_INFORMATION : {
                PATH:process.env.API_URL + MART_COMMON + 'getMetaInfo',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            }
        },
        FCM: {
            SAVE_TOKEN_INFO: {
                PATH: process.env.API_URL + MART_COMMON + 'saveFCMToken',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        LOG_ERROR: {
            SEND_ERROR_LOG: {
                PATH: process.env.API_URL + MART_COMMON + 'logError',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        }
    }
}

export default CONFIG;
