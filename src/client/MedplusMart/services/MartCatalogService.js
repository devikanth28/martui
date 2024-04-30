import serverRequest from "../../axios";
import CONFIG from "../constants/MartCatalogConfig";

export default function MartCatalogService() {

    function getProductDescFromWordPress(productId){
        return serverRequest(CONFIG.API.GET_PRODUCT_DESCRIPTION.HEADER.method, {itemId : productId, contentType : "ALL"}, CONFIG.API.GET_PRODUCT_DESCRIPTION.PATH);
    }

    let getBanners = (obj) => {
        return serverRequest(CONFIG.API.MART_HOME.GET_BANNERS.HEADER.method, obj, CONFIG.API.MART_HOME.GET_BANNERS.PATH);
    }

    function getBrandsAndBanners(data){
        return serverRequest(CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_BRANDS_AND_BANNERS.HEADER.method, data, CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_BRANDS_AND_BANNERS.PATH);
    }

    function getSimilarProducts(searchCriteria){
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_SIMILAR_PRODUCTS.HEADER.method, {searchCriteria:searchCriteria}, CONFIG.API.PRODUCT_DETAIL.GET_SIMILAR_PRODUCTS.PATH);
    }
    
    function getRecommendedProducts(data){
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_RECOMMENDED_PRODUCTS.HEADER.method, data, CONFIG.API.PRODUCT_DETAIL.GET_RECOMMENDED_PRODUCTS.PATH);
    }

    let getDynamicSectionProducts = (data) => {
        return serverRequest(CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_DYNAMIC_SECTION_PRODUCTS.HEADER.method, data, CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_DYNAMIC_SECTION_PRODUCTS.PATH);
    }

    let getPromotionalBannersForCategory = () => {
        return serverRequest(CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_PROMOTIONAL_BANNERS.HEADER.method, {}, CONFIG.API.PRODUCT_CATEGORY.CATEGORY_HOME.GET_PROMOTIONAL_BANNERS.PATH);
    }
    
    function getRecentPosts(data){
        return serverRequest(CONFIG.API.MART_HOME.GET_RECENT_POSTS.HEADER.method, data, CONFIG.API.MART_HOME.GET_RECENT_POSTS.PATH);
    }

    function getCatalogCategories(){
        return serverRequest(CONFIG.API.MART_HOME.GET_CATALOG_CATEGORY.HEADER.method,{},CONFIG.API.MART_HOME.GET_CATALOG_CATEGORY.PATH);
    }

    function getPharmacyCategories(){
        return serverRequest(CONFIG.API.PHARMACY.GET_PHARMACY_CATEGORIES.HEADER.method,{},CONFIG.API.PHARMACY.GET_PHARMACY_CATEGORIES.PATH)
    }

    let getProductDetails = (productId) => {
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_DETAILS.HEADER.method, {productId: productId}, CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_DETAILS.PATH);
    }

    let addOrModifyCart = (productId, requestedQuantity, isRecommendedProduct) => {
        return serverRequest(CONFIG.API.ADD_OR_MODIFY_CART.HEADER.method, {productId: productId, requestedQuantity: requestedQuantity, isRecommendedProduct: isRecommendedProduct}, CONFIG.API.ADD_OR_MODIFY_CART.PATH);
    }

    let getRecentlyViewedProducts = (obj) => {
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_RECENTLY_VIEWED_PRODUCTS.HEADER.method, obj, CONFIG.API.PRODUCT_DETAIL.GET_RECENTLY_VIEWED_PRODUCTS.PATH)
    }

    function getAlternateProducts(data){
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_ALTERNATE_PRODUCTS.HEADER.method,data,CONFIG.API.PRODUCT_DETAIL.GET_ALTERNATE_PRODUCTS.PATH);
    }

    function getProductRelatedArticles(data){
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_RELATED_ARTICLES.HEADER.method,data,CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_RELATED_ARTICLES.PATH);
    }
    
    function getPharmacyCategoryDetail(pCat,pCatName,catName){
        return serverRequest(CONFIG.API.PHARMACY.GET_PHARMACY_CATEGORY_DETAIL.HEADER.method, {pCat : pCat,pCatName : pCatName,catName : catName}, CONFIG.API.PHARMACY.GET_PHARMACY_CATEGORY_DETAIL.PATH)
    }
    function getPharmacyProducts(loadMoreCriteria){
        return serverRequest(CONFIG.API.PHARMACY.GET_PHARMACY_PRODUCTS.HEADER.method, loadMoreCriteria, CONFIG.API.PHARMACY.GET_PHARMACY_PRODUCTS.PATH)
    } 
    function getBlogPostsList(obj){
        return serverRequest(CONFIG.API.BLOG.GET_BLOG_POSTS_LIST.HEADER.method,obj,CONFIG.API.BLOG.GET_BLOG_POSTS_LIST.PATH);
    }
    function getBlogPostDetail(obj){
        return serverRequest(CONFIG.API.BLOG.GET_BLOG_POST_DETAIL.HEADER.method,obj,CONFIG.API.BLOG.GET_BLOG_POST_DETAIL.PATH);
    }
    function getBlogPostCategories(obj){
        return serverRequest(CONFIG.API.BLOG.GET_BLOG_POST_CATEGORIES.HEADER.method,obj,CONFIG.API.BLOG.GET_BLOG_POST_CATEGORIES.PATH);
    }

    let getPharmacyProductsOfManufacturer = (manufacturer) => {
        return serverRequest(CONFIG.API.PHARMACY.GET_PHARMACY_PRODUCTS_OF_MANUFACTURER.HEADER.method, {manufacturer : manufacturer}, CONFIG.API.PHARMACY.GET_PHARMACY_PRODUCTS_OF_MANUFACTURER.PATH);
    }

    let getMorePharmacyProductsOfManufacturer = (productIds) => {
        return serverRequest(CONFIG.API.PHARMACY.GET_MORE_PHARMACY_PRODUCTS_OF_MANUFACTURER.HEADER.method, {productIdsStr : productIds}, CONFIG.API.PHARMACY.GET_MORE_PHARMACY_PRODUCTS_OF_MANUFACTURER.PATH);
    }

    function getProductList(data){
        return serverRequest(CONFIG.API.CATEGORY.GET_PRODUCT_LIST.HEADER.method, data, CONFIG.API.CATEGORY.GET_PRODUCT_LIST.PATH);
    }

    let getCompositionProductDetails = (obj) => {
        return serverRequest(CONFIG.API.PHARMACY.GET_COMPOSITION_PRODUCTS.HEADER.method, obj, CONFIG.API.PHARMACY.GET_COMPOSITION_PRODUCTS.PATH);
    }

    function getNearByStores(obj){
        return serverRequest(CONFIG.API.MART_HOME.GET_NEAR_BY_STORES.HEADER.method,obj,CONFIG.API.MART_HOME.GET_NEAR_BY_STORES.PATH);
    }

    function getLatitudeLongitude(obj){
        return serverRequest(CONFIG.API.MART_HOME.GET_LAT_LONG.HEADER.method,obj,CONFIG.API.MART_HOME.GET_LAT_LONG.PATH);

    }

    function getPromotions(obj){
        return serverRequest(CONFIG.API.MART_HOME.GET_PROMOTIONS.HEADER.method,obj,CONFIG.API.MART_HOME.GET_PROMOTIONS.PATH);
    }

    function getSearchResults(obj){
        return serverRequest(CONFIG.API.MART_HOME.GET_SEARCH_RESULTS.HEADER.method,obj,CONFIG.API.MART_HOME.GET_SEARCH_RESULTS.PATH);
    }

    function mergeCustomerCart(obj){
        return serverRequest(CONFIG.API.MERGE_CUSTOMER_CART.HEADER.method, obj, CONFIG.API.MERGE_CUSTOMER_CART.PATH);
    }

    function getCategoryIcons() {
        return serverRequest(CONFIG.API.MART_HOME.GET_CATEGORY_ICONS.HEADER.method, {}, CONFIG.API.MART_HOME.GET_CATEGORY_ICONS.PATH);
    }

    function getEmergencyMessages() {
        return serverRequest(CONFIG.API.GET_EMERGENCY_MESSAGE.HEADER.method,{},CONFIG.API.GET_EMERGENCY_MESSAGE.PATH)
    }

    function removeEmergencyMsg(){
        return serverRequest(CONFIG.API.REMOVE_EMERGENCY_MESSAGE.HEADER.method,{},CONFIG.API.REMOVE_EMERGENCY_MESSAGE.PATH)
    }

    function alphabetWiseProducts(obj){
        return serverRequest(CONFIG.API.STATIC.ALPHABET_WISE_PRODUCTS.HEADER.method,obj,CONFIG.API.STATIC.ALPHABET_WISE_PRODUCTS.PATH)
    }

    function getSubAlphabetProductList(obj){
        return serverRequest(CONFIG.API.STATIC.GET_SUB_ALPHABET_WISE_PRODUCTS.HEADER.method,obj,CONFIG.API.STATIC.GET_SUB_ALPHABET_WISE_PRODUCTS.PATH)
    }

    function browseAllBrands(obj){
        return serverRequest(CONFIG.API.STATIC.BROWSE_ALL_BRANDS.HEADER.method,obj,CONFIG.API.STATIC.BROWSE_ALL_BRANDS.PATH)
    }
    
    function saveBulkOrder(object) {
        return serverRequest(CONFIG.API.BULK_ORDER.HEADER.method, object, CONFIG.API.BULK_ORDER.PATH)
    }

    function getProductInfo(object) {
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_INFO.HEADER.method, object, CONFIG.API.PRODUCT_DETAIL.GET_PRODUCT_INFO.PATH)
    }

    function getAlternativeProductDetails(object) {
        return serverRequest(CONFIG.API.PRODUCT_DETAIL.GET_ALTERNATE_PRODUCTS.HEADER.method, object, CONFIG.API.PRODUCT_DETAIL.GET_ALTERNATE_PRODUCTS.PATH)
    }

    return Object.freeze({
        getProductDescFromWordPress,
        getBanners,
        getBrandsAndBanners,
        getSimilarProducts,
        getRecommendedProducts,
        getDynamicSectionProducts,
        getPromotionalBannersForCategory,
        getRecentPosts,
        getCatalogCategories,
        getProductDetails,
		addOrModifyCart,
        getRecentlyViewedProducts,
		getPharmacyCategories,
        getPharmacyCategoryDetail,
        getPharmacyProducts,
        getAlternateProducts,
        getProductRelatedArticles,
        getBlogPostsList,
        getBlogPostDetail,
        getBlogPostCategories,
        getPharmacyProductsOfManufacturer,
        getMorePharmacyProductsOfManufacturer,
        getProductList,
        getCompositionProductDetails,
        getNearByStores,
        getLatitudeLongitude,
        getPromotions,
        getSearchResults,
        mergeCustomerCart,
        getCategoryIcons,
        getEmergencyMessages,
        removeEmergencyMsg,
        alphabetWiseProducts,
        getSubAlphabetProductList,
        browseAllBrands,
        saveBulkOrder,
        getProductInfo,
        getAlternativeProductDetails
    });
}