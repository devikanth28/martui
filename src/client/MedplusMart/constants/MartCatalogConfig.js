const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH'
};

const CONTENT_TYPE = {
    JSON: 'application/json; charset=utf-8'
};

const MART_CATALOG_API_URL = process.env.API_URL + "mart-catalog-api/";
const MART_CHECKOUT = process.env.API_URL + "mart-checkout/"
const MART_COMMON_API_URL = process.env.API_URL + "mart-common-api/";

const PRODUCT = 'product/';

const BLOG ='blog/';

const CONFIG = {
    REDIRECT_HOME_URL: MART_CATALOG_API_URL,
    BOT_WEBSOCKET_URL: process.env.BOT_WEBSOCKET_URL,
    API :{
        PRODUCT_DETAIL:{
            GET_PRODUCT_DESCRIPTION: {
                PATH:  MART_CATALOG_API_URL + PRODUCT + 'getProductDescription',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_SIMILAR_PRODUCTS: {
                PATH:  MART_CATALOG_API_URL + PRODUCT + 'getSimilarProducts',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_RECOMMENDED_PRODUCTS:{
                PATH:  MART_CATALOG_API_URL + PRODUCT + 'getRecommendedProducts',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PRODUCT_DETAILS : {
                PATH: MART_CATALOG_API_URL + PRODUCT + "getCompleteProductInformation",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_ALTERNATE_PRODUCTS : {
                PATH: MART_CATALOG_API_URL + PRODUCT + "getAlternateProducts",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_RECENTLY_VIEWED_PRODUCTS : {
                PATH : MART_CATALOG_API_URL + PRODUCT + "getRecentViewedProducts",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_PRODUCT_RELATED_ARTICLES : {
                PATH: MART_CATALOG_API_URL + BLOG + "getProductRelatedBlogs",
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
            GET_PRODUCT_INFO : {
                PATH: MART_CATALOG_API_URL + PRODUCT + "productInfo",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            },
            GET_ALTERNATE_PRODUCT_DETAILS: {
                PATH: MART_CATALOG_API_URL + PRODUCT + 'getAlternateProducts',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            }
        },
        GET_PRODUCT_DESCRIPTION: {
            PATH:  MART_COMMON_API_URL + 'get-static-content-for-item',
            HEADER: {
                method: REQUEST_TYPE.GET
            }
        },
        PHARMACY : {
            GET_PHARMACY_CATEGORIES : {
                PATH : MART_CATALOG_API_URL + "getPharmacyCategories",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_PHARMACY_CATEGORY_DETAIL: {
                PATH:  MART_CATALOG_API_URL + 'getPharmacyCategoryDetail',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PHARMACY_PRODUCTS: {
                PATH:  MART_CATALOG_API_URL + 'getPharmacyProducts',
                HEADER: {
                    method: REQUEST_TYPE.POST,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_PHARMACY_PRODUCTS_OF_MANUFACTURER: {
                PATH: MART_CATALOG_API_URL + 'getPharmacyProductsForManufacturer',
                HEADER: {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_MORE_PHARMACY_PRODUCTS_OF_MANUFACTURER: {
                PATH: MART_CATALOG_API_URL + 'getMorePharmacyProductsForManufacturer',
                HEADER: {
                    method : REQUEST_TYPE.POST
                }
            },
            GET_COMPOSITION_PRODUCTS: {
                PATH: MART_CATALOG_API_URL + 'getCompositionProductDetails',
                HEADER: {
                    method: REQUEST_TYPE.POST
                }
            },
        },
        MART_HOME : {
            GET_BANNERS : {
                PATH : MART_CATALOG_API_URL + "getBannerDetails",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_RECENT_POSTS: {
                PATH : MART_CATALOG_API_URL + BLOG + "getBlogPostsList",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_CATALOG_CATEGORY : {
                    PATH : MART_CATALOG_API_URL + "getCatalogCategory",
                    HEADER: { 
                        method: REQUEST_TYPE.GET
                    }
                },
            GET_NEAR_BY_STORES : {
                PATH :  MART_CATALOG_API_URL + "getNearByStores",
                HEADER: { 
                    method: REQUEST_TYPE.GET
                }
            },
            GET_LAT_LONG : {
                PATH :  MART_CATALOG_API_URL  + "getLatitudeLongitude",
                HEADER: { 
                    method: REQUEST_TYPE.GET
                }
            },
            GET_PROMOTIONS : {
                PATH :  MART_CATALOG_API_URL  + "getAllPromotionalBanners",
                HEADER: { 
                    method: REQUEST_TYPE.GET
                }
            },
            GET_SEARCH_RESULTS : {
                PATH :  MART_CATALOG_API_URL  + "getProductSearchResults",
                HEADER: { 
                    method: REQUEST_TYPE.GET
                }
            },
            GET_CATEGORY_ICONS : {
                PATH : MART_CATALOG_API_URL + "getCategoryIcons",
                HEADER: {
                    method: REQUEST_TYPE.GET
                }
            }
        },
        PRODUCT_CATEGORY:{
            CATEGORY_HOME : {
                GET_BRANDS_AND_BANNERS : {
                    PATH : MART_CATALOG_API_URL + 'getBrandsAndBannersForCategory',
                    HEADER : {
                        method : REQUEST_TYPE.POST,
                        contentType : CONTENT_TYPE.JSON
                    }
                },
                GET_DYNAMIC_SECTION_PRODUCTS : {
                    PATH : MART_CATALOG_API_URL + 'getDynamicSectionProducts',
                    HEADER : {
                        method : REQUEST_TYPE.GET
                    }
                },
                GET_PROMOTIONAL_BANNERS : {
                    PATH : MART_CATALOG_API_URL + 'getPromotionalBanners',
                    HEADER : {
                        method : REQUEST_TYPE.GET
                    }
                }
            }
        },
        ADD_OR_MODIFY_CART : {
            PATH : MART_CATALOG_API_URL + "addOrModifyCart",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        MERGE_CUSTOMER_CART : {
            PATH : MART_CATALOG_API_URL + "mergeCustomerCart",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        },
        BLOG:{
           GET_BLOG_POSTS_LIST: {
                PATH:  MART_CATALOG_API_URL + BLOG + 'getBlogPostsList',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_BLOG_POST_DETAIL: {
                PATH:  MART_CATALOG_API_URL + BLOG + 'getBlogPostDetail',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            },
            GET_BLOG_POST_CATEGORIES: {
                PATH:  MART_CATALOG_API_URL + BLOG +'getBlogPostCategories',
                HEADER: {
                    method: REQUEST_TYPE.GET,
                    contentType: CONTENT_TYPE.JSON
                }
            }
          
        },
        CATEGORY : {
            GET_PRODUCT_LIST : {
                PATH: MART_CATALOG_API_URL + 'general/' + 'getCategoryProducts',
            	HEADER: {
            	method: REQUEST_TYPE.POST
            	}
            },
        },
        GET_EMERGENCY_MESSAGE:{
            PATH:MART_CATALOG_API_URL+'getEmergencyMessages',
            HEADER:{
                method:REQUEST_TYPE.GET,
            }
        },
        REMOVE_EMERGENCY_MESSAGE:{
            PATH:MART_CATALOG_API_URL+'removeEmergencyMsg',
            HEADER:{
                method:REQUEST_TYPE.GET,
            }
        },
        STATIC : {
            ALPHABET_WISE_PRODUCTS : {
                PATH : MART_CATALOG_API_URL + "alphabetWiseProducts",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            GET_SUB_ALPHABET_WISE_PRODUCTS : {
                PATH : MART_CATALOG_API_URL + "getSubAlphabetWiseProductsList",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            },
            BROWSE_ALL_BRANDS : {
                PATH : MART_CATALOG_API_URL + "browseAllBrands",
                HEADER : {
                    method : REQUEST_TYPE.GET
                }
            }
        },
        BULK_ORDER: {
            PATH: MART_CHECKOUT + 'saveBulkOrder',
            HEADER: {
                method: REQUEST_TYPE.POST,
            }
        }
    }
}

export default CONFIG;