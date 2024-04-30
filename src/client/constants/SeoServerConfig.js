const path = require('path');
const dotenv = require('dotenv');

const envKeys = dotenv.config({ path: path.resolve(__dirname, '../../../.env.production') }).parsed;

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH'
};

const CONTENT_TYPE = {
    JSON: 'application/json; charset=utf-8'
};

const MEDPLUS_LAB_CATALOG = 'labcatalog/';
const DOCTORS_API = 'doctors-api/';
const PAYBACK_CONST="payback-api/"
const MART_CATALOG_API_URL = "mart-catalog-api/";

const SeoServerConfig = {
    REDIRECT_HOME_URL: envKeys.API_URL,
    SEO_URL: envKeys.SEO_URL,
    BOT_WEBSOCKET_URL: envKeys.BOT_WEBSOCKET_URL,

    SEO: {
        LAB_CATALOG : {
            GET_SEO_TEST_SUMMARY_LIST_BY_CATEGORY_ID: {
                PATH : envKeys.API_URL + MEDPLUS_LAB_CATALOG + 'get-seo-test-summaries-by-category-id',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_SEO_TEST_DETAILS_BY_TEST_ID : {
                PATH : envKeys.API_URL + MEDPLUS_LAB_CATALOG + 'get-seo-test-details-by-id',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            }
        },
        DOCTOR_CONSULTATION: {
            GET_DOCTOR_INFO: {
                PATH : envKeys.API_URL +DOCTORS_API + 'catalog/getDoctorInfo',
                HEADER: {
                    method: REQUEST_TYPE.GET
                },
            },
            GET_DOCTORS_FOR_CATALOG: {
                PATH : envKeys.API_URL +DOCTORS_API + 'catalog/getDoctorsForCatalog',
                HEADER: {
                    method: REQUEST_TYPE.GET
                },
            }
        },
        PAYBACK: {
            GET_PAYBACK_CATALOG: {
                PATH : envKeys.API_URL +PAYBACK_CONST + 'seoGetPaybackCategoryProducts',
                HEADER: {
                    method: REQUEST_TYPE.GET
                },
            }
        },
        SUBSCRIPTION:{
            GET_PLAN_DETAILS:{
                PATH:  process.env.API_URL  + 'medplusSubscription/getPlanDetails',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        STATIC_PAGES : {
            GET_META_INFORMATION : {
                PATH:  envKeys.API_URL  + 'getMetaInfo.mart',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
        },
        PRODUCT: {
            GET_PRODUCT_META_INFO: {
                PATH : envKeys.API_URL + MART_CATALOG_API_URL + 'getSeoInfoForProduct',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            }
        },
        CATEGORY: {
            GET_CATEGORY_META_INFO: {
                PATH : envKeys.API_URL + MART_CATALOG_API_URL + 'getSeoInfoForCategoryPage',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_DYNAMIC_PRODUCTS_META_INFO: {
                PATH : envKeys.API_URL + MART_CATALOG_API_URL + 'getSeoInfoForMarketingSecProducts',
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            }
        }
    }
}

export default SeoServerConfig;
