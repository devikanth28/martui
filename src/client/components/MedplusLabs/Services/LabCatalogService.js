import ServerRequest from '../../../axios';
import LabCatalogServiceConfig from '../constants/LabCatalogServiceConfig';

const LabCatalogService = () =>{

    let getMarketingSectionTitles = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_MARKETING_SECTION_TITLES.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_MARKETING_SECTION_TITLES.PATH);
    }

    let getMarketingSectionTestDetails = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_MARKETING_SECTION_TEST_DETAILS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_MARKETING_SECTION_TEST_DETAILS.PATH);
    }

    let getTestIdsByMarketingSectionTitle = () =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_IDS_BY_MARKETING_SECTION_TITLES.HEADER.method, {}, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_IDS_BY_MARKETING_SECTION_TITLES.PATH);
    }

    let getTestsInfoByTestIds = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TESTS_INFO_BY_TEST_IDS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TESTS_INFO_BY_TEST_IDS.PATH);
    }

    let getTestSummariesByCategoryId = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_SUMMARY_LIST_BY_CATEGORY_ID.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_SUMMARY_LIST_BY_CATEGORY_ID.PATH);
    }

    let getTestSummariesByDerivedCategoryId = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_SUMMARY_LIST_BY_DERIVED_CATEGORY_ID.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TEST_SUMMARY_LIST_BY_DERIVED_CATEGORY_ID.PATH);
    }

    let getTopLevelCategories = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TOP_LEVEL_CATEGORIES.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_TOP_LEVEL_CATEGORIES.PATH);
    }

    let getSubCategories = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_SUB_CATEGORIES.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_SUB_CATEGORIES.PATH);
    }

    let getSubCategoryAndTestsInfo = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_SUB_CATEGORY_AND_TESTS_INFO.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_SUB_CATEGORY_AND_TESTS_INFO.PATH);
    }

    let getCustomCategories = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_CUSTOM_CATEGORIES.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.HOME.GET_CUSTOM_CATEGORIES.PATH);
    }

    let getTestsDetailsByTestId = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_TEST_DETAILS_BY_TEST_ID.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_TEST_DETAILS_BY_TEST_ID.PATH);
    }

    let getLabTestsSearchSuggestions = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.LAB_TEST.GET_LAB_TEST_SUGGESTIONS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.LAB_TEST.GET_LAB_TEST_SUGGESTIONS.PATH);
    }

    let getLabStaticContent=(obj)=>{
        return ServerRequest(LabCatalogServiceConfig.MART_COMMON.STATIC_CONTENT.GET_STATIC_CONTENT.HEADER.method, obj, LabCatalogServiceConfig.MART_COMMON.STATIC_CONTENT.GET_STATIC_CONTENT.PATH);
    }

    let getLabCatalogBannerDetails = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.GET_LAB_BANNER_DETAILS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.GET_LAB_BANNER_DETAILS.PATH);
    }

    let getSubscriptionStatus = (obj) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_SUBSCRIPTION_STATUS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_SUBSCRIPTION_STATUS.PATH);
    }

    let getPackagesIncludeTest = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_PACKAGES_INCLUDE_TEST.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_PACKAGES_INCLUDE_TEST.PATH);
    }

    let getViewAllTests = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.LAB_TEST.GET_VIEW_ALL_TESTS.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.LAB_TEST.GET_VIEW_ALL_TESTS.PATH);
    }

    let getTestServingCenters = (testCode) => {
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_TEST_SERVING_CENTERS.HEADER.method, {testCode: testCode}, LabCatalogServiceConfig.LAB_CATALOG.TEST_DETAIL.GET_TEST_SERVING_CENTERS.PATH);
    }

    let getCategoryDetailsById = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.LAB_STATIC_CONTENT.GET_CATEGORY_DESCRIPTION.HEADER.method, obj, LabCatalogServiceConfig.LAB_CATALOG.LAB_STATIC_CONTENT.GET_CATEGORY_DESCRIPTION.PATH);
    }

    let getDiagnosticsCategories = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.LAB_STATIC_CONTENT.GET_DIAGNOSTICS_CATEGORIES.HEADER.method, obj , LabCatalogServiceConfig.LAB_CATALOG.LAB_STATIC_CONTENT.GET_DIAGNOSTICS_CATEGORIES.PATH);
    }

    let getNearByCollectionCenters = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.HOME.COLLECTION_CENTERS.HEADER.method, obj , LabCatalogServiceConfig.LAB_CATALOG.HOME.COLLECTION_CENTERS.PATH);
    }

    let pushLabDatIntoRedis = (obj) =>{
        return ServerRequest(LabCatalogServiceConfig.LAB_CATALOG.PUSH_LAB_DATA_INTO_REDIS.HEADER.method, obj , LabCatalogServiceConfig.LAB_CATALOG.PUSH_LAB_DATA_INTO_REDIS.PATH);
    }

    return{
        getMarketingSectionTitles,
        getMarketingSectionTestDetails,
        getTestIdsByMarketingSectionTitle,
        getTestsInfoByTestIds,
        getTestSummariesByCategoryId,
        getTestsDetailsByTestId,
        getLabTestsSearchSuggestions,
        getLabStaticContent,
        getLabCatalogBannerDetails,
        getTopLevelCategories,
        getSubCategories,
        getTestSummariesByDerivedCategoryId,
        getCustomCategories,
        getSubscriptionStatus,
        getPackagesIncludeTest,
        getViewAllTests,
        getTestServingCenters,
        getCategoryDetailsById,
        getDiagnosticsCategories,
        getSubCategoryAndTestsInfo,
        getNearByCollectionCenters,
        pushLabDatIntoRedis
    }
}

export default LabCatalogService;