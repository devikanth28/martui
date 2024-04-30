const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
};

const MART_COMMON = process.env.API_URL + "mart-common-api/";
const MY_PROFILE_CONST="my-profile/"
const MART_CATALOG_API = process.env.API_URL + "mart-catalog-api/";
const ADMIN = "admin/"

const CONFIG = {
    API :{
        ADMIN_PANEL:{
            GET_USER_INFO:{
                PATH: MY_PROFILE_CONST + ADMIN + 'getAdminUserConfiguration',
                HEADER:{
                    method: REQUEST_TYPE.GET
                }
            },
            PUSH_CUSTOMER_DETAILS_IN_QUEUE:{
                PATH: MART_COMMON + ADMIN + 'pushCustomerDetailInQueue',
                HEADER:{
                    method: REQUEST_TYPE.GET
                }
            },
            FOOTERS_FOR_LABS_AND_DOCTERS:{
                PATH: MART_COMMON + ADMIN + 'footersForLabAndDoctors',
                HEADER:{
                    method: REQUEST_TYPE.GET
                }
            },
            CONFIGURE_BULK_ORDERS:{
                PATH: MART_COMMON + ADMIN + 'addOrRemoveBulkProductID',
                HEADER:{
                    method: REQUEST_TYPE.GET
                }
            },
            MART_VERSIONS:{
                PATH: MART_CATALOG_API + ADMIN + 'changeVersion',
                HEADER:{
                    method: REQUEST_TYPE.GET
                }
            },
            UPDATE_CMS_ADMIN:{
                PATH: MY_PROFILE_CONST + ADMIN + 'updateCMSAdmin',
                HEADER:{
                    method: REQUEST_TYPE.POST
                }
            },ORDER_CANCELLATION_REASONS_CONFIGURATION:{
                PATH: MART_COMMON + ADMIN + 'orderCancellationReasonConfiguration',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },SAVE_ORDER_CANCELLATION_REASON:{
                PATH: MART_COMMON + ADMIN +'saveOrderCancellationReason',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },DELETE_ORDER_CANCELLATION_REASON:{
                PATH: MART_COMMON + ADMIN + 'deleteOrderCancellationReason',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },SAVE_EPRESCRIPTION_CONFIG:{
                PATH: MART_COMMON + ADMIN + 'saveEPrescriptionConfig',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },CONFIGURE_PRESCRIPTION:{
                PATH: MART_COMMON + ADMIN + 'configurePrescription',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },PRODUCT_DISCOUNT_DETAILS:{
                PATH: MART_CATALOG_API + ADMIN + 'getProductDiscoutDetails',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },PRODUCT_STOCK_DETAILS:{
                PATH: MART_CATALOG_API + ADMIN + 'getProductStocks',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },CONFIGURE_REDIS_KEY:{
                PATH: MART_CATALOG_API + ADMIN + 'saveRedisInfo',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },GENERATE_LAB_CATEGORIES:{
                PATH: MART_CATALOG_API + ADMIN + 'generateDiagnosticsCategory',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },GENERATE_DOCTORS_CATEGORIES:{
                PATH: MART_CATALOG_API + ADMIN + 'generateDoctorsCategory',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },UNSUBSCRIBE_FROM_REFILLS:{
                PATH: MY_PROFILE_CONST+ ADMIN + 'unsubscribeFromRefills',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },FORCE_CANCEL_ORDERS:{
                PATH: MY_PROFILE_CONST+ ADMIN + 'forceCancelOrders',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },CANCEL_ORDERS_FROM_ADMIN:{
                PATH: MY_PROFILE_CONST+ ADMIN + 'cancelOrdersFromAdmin',
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },CUSTOMER_PROMOTION:{
                PATH: MART_COMMON + ADMIN + 'saveCustomerPromotionConfiguration',
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            }, META_CONFIGURATION : {
                GET_META_CONFIGURATION : {
                    PATH: MART_CATALOG_API + ADMIN + 'getMetaConfiguration',
                    HEADER:{
                        method:REQUEST_TYPE.GET
                    }
                },
                GET_META_DETAILS : {
                    PATH: MART_CATALOG_API + ADMIN + 'getMetaTagDetails',
                    HEADER:{
                        method:REQUEST_TYPE.GET
                    } 
                },
                SAVE_META_DETAILS : {
                    PATH: MART_CATALOG_API + ADMIN + 'saveMetaTagDetails',
                    HEADER:{
                        method:REQUEST_TYPE.POST
                    } 
                }
            },
            SAVE_IS_PRESCRIPTION_ENABLED : {
                PATH:MART_COMMON + ADMIN + 'saveIsPrescriptionUploadEnabled',
                    HEADER: {
                        method: REQUEST_TYPE.POST,
                    }
            },
            GET_IS_PRESCRIPTION_ENABLED:{
                PATH:MART_COMMON + ADMIN + 'getIsPrescriptionUploadEnabled',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                }
            },
            GET_UPSELL_PRODUCTS_HEADING:{
                PATH:MART_CATALOG_API + ADMIN + 'getUpSellProductsHeading',
                HEADER:{
                    method: REQUEST_TYPE.GET,
                } 
            },
            SAVE_UPSELL_PRODUCTS_HEADING:{
                PATH:MART_CATALOG_API + ADMIN + 'saveUpSellProductsHeading',
                HEADER:{
                    method: REQUEST_TYPE.POST,
                }   
            },
			MAIN_NAVIGATION_FOR_CATALOG: {
				PATH: MART_CATALOG_API + ADMIN + "generateMainNavigation",
				HEADER: {
					method: REQUEST_TYPE.GET
				}
			},
			GET_CATALOGS: {
				PATH: MART_CATALOG_API + ADMIN + "getcatalogIds",
				HEADER: {
					method: REQUEST_TYPE.GET
				}
			},
            GET_TOKEN_DETAILS:{
                PATH: MART_COMMON + ADMIN + 'getCustomerTokenDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_CUSTOMER_DETAILS:{
                PATH: MART_COMMON + ADMIN + "getLatestCustomerTokenDetails",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            MOVE_CUSTOMERS_INFO_TO_SOLR_FROM_GIVEN_DATE:{
                PATH: MY_PROFILE_CONST + ADMIN + "moveCustomersInfoToSolrFromGivenDate",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            MOVE_CUSTOMERS_INFO_TO_SOLR_BY_CUSTOMER_ID : {
                PATH: MY_PROFILE_CONST + ADMIN + "moveCustomerInfoToSolrByCustomerId",
                HEADER: {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_EMERGENCY_MESSAGE_CONFIGURATION: {
                PATH: MART_COMMON + ADMIN +"getEmergencyMessageConfiguration",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            CREATE_EMERGENCY_MESSAGE: {
                PATH: MART_COMMON + ADMIN + "createEmergencyMessage",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            DELETE_EMERGENCY_MSG: {
                PATH: MART_COMMON + ADMIN + "deleteEmergencyMessage",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_HOLIDAYS_ETA_CONFIGURATION:{
                PATH:MART_COMMON + ADMIN + "getHolidaysETAConfiguration",
                HEADER:{
                    method:REQUEST_TYPE.GET
                }
            },
            ADD_HOLIDAYS_ETA:{
                PATH:MART_COMMON + ADMIN + "addHolidaysETA",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            DELETE_HOLIDAYS_ETA_CONFIG:{
                PATH:MART_COMMON + ADMIN + "deleteHolidaysETAConfig",
                HEADER:{
                    method:REQUEST_TYPE.POST
                }
            },
            GET_LOCALITY_DETAILS: {
                PATH: MART_COMMON + ADMIN + "localityInfo",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_E_PRESCRIPTION: {
                PATH: MART_COMMON + ADMIN + "getIsEPrescriptionConfig",
                HEADER: {
                    method : REQUEST_TYPE.GET
                }
            }

        }
    }
}
export default CONFIG;