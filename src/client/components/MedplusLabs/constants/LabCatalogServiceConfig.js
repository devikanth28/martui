const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const MEDPLUS_LAB_CATALOG = 'labcatalog/';
const MART_COMMON_API = 'mart-common-api/';
const ADMIN = "admin/"

const LabCatalogServiceConfig = {
    LAB_CATALOG : {
        HOME : {
            GET_MARKETING_SECTION_TITLES : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-marketing-section-titles',
                HEADER :{
                    method : REQUEST_TYPE.POST
                }
            },
            GET_MARKETING_SECTION_TEST_DETAILS : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-marketing-section-test-details',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_TEST_IDS_BY_MARKETING_SECTION_TITLES : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'getTestIdsByMarketingSectionTitle',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_TESTS_INFO_BY_TEST_IDS : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-tests-info-by-test-ids',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_TEST_SUMMARY_LIST_BY_CATEGORY_ID: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-test-summaries-by-category-id',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_TEST_SUMMARY_LIST_BY_DERIVED_CATEGORY_ID: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-test-summaries-by-derived-category-id',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_TOP_LEVEL_CATEGORIES: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-top-level-categories',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_SUB_CATEGORIES: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-sub-categories-details',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_CUSTOM_CATEGORIES: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-custom-categories-details',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_SUB_CATEGORY_AND_TESTS_INFO: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'getSubCategoryAndTestsInfo',
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            COLLECTION_CENTERS: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-nearby-collection-centers',
                HEADER :{
                    method : REQUEST_TYPE.POST
                }
            }
            
        },
        PUSH_LAB_DATA_INTO_REDIS : {
            PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG + ADMIN + 'labDataPushIntoRedis',
            HEADER :{
                method : REQUEST_TYPE.POST
            }
        },
        TEST_DETAIL : {
            GET_TEST_DETAILS_BY_TEST_ID : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-test-details-by-id',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            },
            GET_SUBSCRIPTION_STATUS :{
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-subscription-status',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            },
            GET_PACKAGES_INCLUDE_TEST: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-packages-include-test',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_TEST_SERVING_CENTERS: {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-test-serving-centers',
                HEADER : {
                    method : REQUEST_TYPE.POST
                }
            }
        },
        LAB_TEST : {
            GET_LAB_TEST_SUGGESTIONS : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-lab-test-suggestions',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            },
            GET_VIEW_ALL_TESTS : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-view-all-tests',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            }
        },
        LAB_STATIC_CONTENT : {
            GET_LAB_STATIC_CONTENT : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-static-content-for-item',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            },
            GET_CATEGORY_DESCRIPTION : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-categoy-details-by-id',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            },
            GET_DIAGNOSTICS_CATEGORIES : {
                PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'getDiagnosticsCategories',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            }
        },
        GET_LAB_BANNER_DETAILS : {
            PATH : process.env.API_URL+ MEDPLUS_LAB_CATALOG+'get-separator-banners',
            HEADER :{
                method : REQUEST_TYPE.GET
            }
        }
    },
    MART_COMMON : {
        STATIC_CONTENT : {
            GET_STATIC_CONTENT : {
                PATH : process.env.API_URL+ MART_COMMON_API + 'get-static-content-for-item',
                HEADER :{
                    method : REQUEST_TYPE.GET
                }
            }
        }
    }
}
export default LabCatalogServiceConfig;