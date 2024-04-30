import ServerRequest from '../axios'
import SeoServerConfig from '../constants/SeoServerConfig';

const SeoService = () =>{

    let getSeoTestsDetailsByCategoryId = (obj) => {
        return ServerRequest(SeoServerConfig.SEO.LAB_CATALOG.GET_SEO_TEST_SUMMARY_LIST_BY_CATEGORY_ID.HEADER.method, obj, SeoServerConfig.SEO.LAB_CATALOG.GET_SEO_TEST_SUMMARY_LIST_BY_CATEGORY_ID.PATH);
    }

    let getSeoTestsDetailsByTestId = (obj) =>{
        return ServerRequest(SeoServerConfig.SEO.LAB_CATALOG.GET_SEO_TEST_DETAILS_BY_TEST_ID.HEADER.method, obj, SeoServerConfig.SEO.LAB_CATALOG.GET_SEO_TEST_DETAILS_BY_TEST_ID.PATH);
    }

    const getSeoDoctorInfo = (obj) => {
        return ServerRequest(SeoServerConfig.SEO.DOCTOR_CONSULTATION.GET_DOCTOR_INFO.HEADER.method, obj, SeoServerConfig.SEO.DOCTOR_CONSULTATION.GET_DOCTOR_INFO.PATH);
    }

    const getSeoPaybackCategoryProducts=(obj) =>{
        return ServerRequest(SeoServerConfig.SEO.PAYBACK.GET_PAYBACK_CATALOG.HEADER.method, obj, SeoServerConfig.SEO.PAYBACK.GET_PAYBACK_CATALOG.PATH);
    }

    const getSeoDoctorsForCatalog= obj =>{
        return ServerRequest(SeoServerConfig.SEO.DOCTOR_CONSULTATION.GET_DOCTORS_FOR_CATALOG.HEADER.method, obj, SeoServerConfig.SEO.DOCTOR_CONSULTATION.GET_DOCTORS_FOR_CATALOG.PATH);
    }

    const getSeoSubscriptionPlanDetails = obj => {
        return ServerRequest(SeoServerConfig.SEO.SUBSCRIPTION.GET_PLAN_DETAILS.HEADER.method, obj, SeoServerConfig.SEO.SUBSCRIPTION.GET_PLAN_DETAILS.PATH);
    }

    const getMetaInformation = (data) => {
        return ServerRequest(SeoServerConfig.SEO.STATIC_PAGES.GET_META_INFORMATION.HEADER.method,data, SeoServerConfig.SEO.STATIC_PAGES.GET_META_INFORMATION.PATH);
    }

    const getSeoInfoForProduct = (obj) => {
        return ServerRequest(SeoServerConfig.SEO.PRODUCT.GET_PRODUCT_META_INFO.HEADER.method, obj, SeoServerConfig.SEO.PRODUCT.GET_PRODUCT_META_INFO.PATH);
    }

    const getSeoInfoForCategoryPage = (obj) => {
        return ServerRequest(SeoServerConfig.SEO.CATEGORY.GET_CATEGORY_META_INFO.HEADER.method, obj, SeoServerConfig.SEO.CATEGORY.GET_CATEGORY_META_INFO.PATH);
    }

    const getSeoInfoForMarketingSecProducts = (obj) => {
        return ServerRequest(SeoServerConfig.SEO.CATEGORY.GET_DYNAMIC_PRODUCTS_META_INFO.HEADER.method, obj, SeoServerConfig.SEO.CATEGORY.GET_DYNAMIC_PRODUCTS_META_INFO.PATH);
    }

    return{
        getSeoTestsDetailsByCategoryId,
        getSeoTestsDetailsByTestId,
        getSeoDoctorInfo,
        getSeoPaybackCategoryProducts,
        getSeoDoctorsForCatalog,
        getSeoSubscriptionPlanDetails,
        getMetaInformation,
        getSeoInfoForProduct,
        getSeoInfoForCategoryPage,
        getSeoInfoForMarketingSecProducts
    }
}

export default SeoService;
