import { matchPath } from 'react-router-dom';
import SeoService from '../../client/services/SeoService';
import SeoServerConfig from '../../client/constants/SeoServerConfig';
import {getCategoryIdFromParam, getCategoryIdFromUrl, getCategoryNameFromParam, getCategoryNameFromUrl, getDecodedURL, getDepartmentIdFromUrl, getDepartmentNameFromUrl, getNameFromUrl, getProductIdFromParam, getProductRedirectUrl, getTestCodeFromUrl, getTestNameFromUrl, textCapitalize} from '../../client/helpers/CommonUtil';
import Validate from '../../client/helpers/Validate';
import SubscriptionPlans from '../../client/components/Subscription/constants/SubscriptionPlans';
import { UrlTypeConstants } from '../../client/DoctorConsultation/constants/DoctorConsultationConstants';
import { getPageTypeFromUrlValue } from '../../client/DoctorConsultation/helper/DoctorConsulationHelper';
import {MEDPLUS_ADVANTAGE_URL_PREFIX } from '../../client/components/Subscription/constants/SubscriptionConstants';
import {DIAGNOSTICS_URL_PREFIX } from '../../client/components/MedplusLabs/constants/LabConstants';
import moment from 'moment';
import MartCatalogService from '../../client/MedplusMart/services/MartCatalogService';
const dynamicPages = ['home','categoryHome','composition','manufacturer','drugInfo','brand','catalog','product', 'healthy-life', 'diagnosticTestDetail', 'diagnosticsCategory', 'diagnosticsDepartment', "doctorDetailPage","paybackspecialsale",'medplusAdvantage','doctorCatalogPage','marketingPage']; 
const staticPages = ['DIAGNOSTICS','DOCTOR_CONSULTATION','VIEW_PRESCRIPTION','ORDER_HISTORY','FLEXI_REWARDS','MEDPLUS_BLOG','TERMS_AND_CONDITIONS','SITEMAP'];

export const getSeoString = async (url,cookies) => {
    const validate = Validate();
    let matchPattern = "";
    let page = "";
    let  isDiagnostic = false;
    let  isDoctorConsultation = false;
    let isStaticPage = false;
    let urlSplitLength = 0;
    url = decodeUrl(url);

    if(url === "/"){
        matchPattern = "";
        page = "home";
    } else if (url.indexOf('/product/') !== -1) {
        if (url.split('/').length == 2) {
            matchPattern = "/product/:productNameId";
        }
        else if (url.split('/').length == 4) {
            matchPattern = "/product/:currentCategoryName_Id/:productNameId";
        }
        else if (url.split('/').length == 5) {
            matchPattern = "/product/:parentCategoryName_Id/:currentCategoryName_Id/:productNameId";
        }
        else if (url.split('/').length == 6) {
            matchPattern = "/product/:topCategoryName_Id/:parentCategoryName_Id/:currentCategoryName_Id/:productNameId";
        }
        page = "product";
    } else if(url.indexOf("/paybackspecialsale")!==-1){
        page="paybackspecialsale";
    }else if(url.toLowerCase() === MEDPLUS_ADVANTAGE_URL_PREFIX.toLowerCase()){
        page="medplusAdvantage";
    }else if(url.indexOf("/categories/") !== -1){
        if(url.split("/").length === 3){
            matchPattern = "/categories/:currentCategoryName_Id";
            page = "categoryHome";
        }else if(url.split("/").length === 4){
            matchPattern = "/categories/:parentCategoryName_Id/:currentCategoryName_Id";
            page = "catalog";
        }else if(url.split("/").length === 5){
            matchPattern = "/categories/:topCategoryName_Id/:parentCategoryName_Id/:currentCategoryName_Id";
            page = "catalog";
        }
    }else if(url.indexOf("/brand/") !== -1){
        matchPattern = "/brand/:brandName";
        page = "brand";
    }else if(url.indexOf("/drugsInfo/") !== -1){
        matchPattern = "/drugsInfo/:pCat/:pCatName/:catName";
        page = "drugInfo";
    }else if(url.indexOf("/manufacturer/") !== -1){
        matchPattern = "/manufacturer/:manufacturer";
        page = "manufacturer";
    }else if(url === "/walletTermsandConditions" || url.indexOf("/termsandconditions") !== -1){
        page="TERMS_AND_CONDITIONS";
        isStaticPage=true;
    }else if(url.indexOf("/compositionProducts/") !== -1){
        matchPattern = "/compositionProducts/:compositionName/:compositionId";
        page = "composition";
    }else if(url.indexOf("/healthy-life") !== -1) {
        if(url.endsWith("/")) {
            url = url.slice(-1);
        }
        urlSplitLength = url.split('/').length;
        if(urlSplitLength === 2) {
            matchPattern = "/healthy-life";
        } else if(urlSplitLength === 5) {
            matchPattern = "/healthy-life/info/:postId/:postName";
        } else if(urlSplitLength === 4) {
            matchPattern = "/healthy-life/:categoryId/:categoryName";
        } else if(urlSplitLength === 6) {
            matchPattern = "/healthy-life/info/:postId/:categoryName/:postName";
        }
        page = "healthy-life";
    }else if(url === "/diagnostics/"){
        url= url.slice(0,-1);
        matchPattern="/diagnostics";
        page="DIAGNOSTICS";
         isStaticPage=true;
    }else if(url.indexOf("/sub-category") !== -1 ){
        matchPattern=`${DIAGNOSTICS_URL_PREFIX}/sub-category/:categoryNameId/`;
        page="diagnosticsCategory";
        isDiagnostic=true;
    }else if(url.indexOf("/department") !== -1 ){
        matchPattern=`${DIAGNOSTICS_URL_PREFIX}/department/:categoryNameId`;
        page="diagnosticsDepartment";
        isDiagnostic=true;
    }else if(url.indexOf("/category-home") !== -1 ){
        matchPattern=`${DIAGNOSTICS_URL_PREFIX}/category-home/:category`;
        page="category-home";
        isDiagnostic=true;
    }else if(url.indexOf("/testdetails") !== -1 ){
        if(url.split("/").length === 4){
            matchPattern = `${DIAGNOSTICS_URL_PREFIX}/testdetails/:testNameId`;
        }else if(url.split("/").length === 5){
            const tempArray=url.split('/');
            tempArray.splice(3,1);
            url=tempArray.join('/');
            matchPattern = `${DIAGNOSTICS_URL_PREFIX}/testdetails/:testNameId`;
        }
        page="diagnosticTestDetail";
        isDiagnostic=true;
    } else if(url === ("/doctorconsultation")){
        matchPattern="/doctorconsultation";
        page = 'DOCTOR_CONSULTATION';
         isStaticPage=true;
    } else if(url.indexOf("/doctorconsultation/doctor/") !== -1 ){
        if(url.split("/").length===4){
            matchPattern = "/doctorconsultation/doctor/:doctorNameId";
           }
        if(url.split("/").length === 5){
            matchPattern = "/doctorconsultation/doctor/:doctorNameId/:onlineOrWalkInType";
        }
        page = "doctorDetailPage";
        isDoctorConsultation = true;
    } else if(url.indexOf("/doctorconsultation/categorydoctor/") !== -1 ){
        if(url.split("/").length === 7){
            matchPattern = "/doctorconsultation/categorydoctor/:doctorNameId/:specializationOrSymptomsId/:specializationOrSymptomsType/";
        }
        if(url.split("/").length === 7 && (url.split('/')[6] == 'walk_in' || url.split('/')[6] == 'online_consultation')){
            matchPattern = "/doctorconsultation/categorydoctor/:doctorNameId/:specializationOrSymptomsId/:specializationOrSymptomsType/:onlineOrWalkInType";
        }
        page = "doctorDetailPage";
        isDoctorConsultation = true;
    }   else if(url.indexOf("/doctorconsultation/categorynamedoctor/") !== -1){
            if(url.split('/').length === 6){
                if(url.split('/')[5] === ''){
                matchPattern = "/doctorconsultation/categorynamedoctor/:doctorNameId/:specializationOrSymptomsId/";
                }
                if(url.split('/')[5] !== ''){
                matchPattern = "/doctorconsultation/categorynamedoctor/:doctorNameId/:specializationOrSymptomsId/:onlineOrWalkInType";
                }
            }
            page = "doctorDetailPage";
            isDoctorConsultation = true;
        }
    else if(url.indexOf("/doctorconsultation/doctors/") !== -1){
        if(url.split("/").length === 4 && (url.split('/')[3] == 'walk_in' || url.split('/')[3] == 'online_consultation')){
            matchPattern = "/doctorconsultation/doctors/:onlineOrWalkInType";
        } else{
            matchPattern = "/doctorconsultation/doctors/:specializationOrSymptomsId";
        }
        if(url.split("/").length === 5){
            if(url.split("/").length === 5 && url.split('/')[3] == 'viewall' && (url.split('/')[4] == 'walk_in' || url.split('/')[4] == 'online_consultation')){
                matchPattern = "/doctorconsultation/doctors/viewall/:onlineOrWalkInType";
            } 
            else if(url.split('/')[4] === ''){
                matchPattern = "/doctorconsultation/doctors/:specializationOrSymptomsId";
            }
            else{
                matchPattern = "/doctorconsultation/doctors/:specializationOrSymptomsId/:onlineOrWalkInType";
            }
        }
        page="doctorCatalogPage";
        isDoctorConsultation=true;
    }
    else if(url.indexOf("/doctorconsultation/categorydoctors/") !== -1){
        if(url.split("/").length === 6){
            if(url.split('/')[5] === ''){
                matchPattern = "/doctorconsultation/categorydoctors/:specializationOrSymptomsId/:specializationOrSymptomsType/";
            }
            else{
                matchPattern = "/doctorconsultation/categorydoctors/:specializationOrSymptomsId/:specializationOrSymptomsType/:onlineOrWalkInType";
            }
        }
        page="doctorCatalogPage";
        isDoctorConsultation=true;
    }
    else if(url.indexOf('/doctorconsultation/allCategories/') !== -1){
        if(url.split("/").length === 5){
            if(url.split('/')[4] === ''){
                matchPattern = "/doctorconsultation/allCategories/:specializationOrSymptomsType/";
            }
            else{
                matchPattern = "/doctorconsultation/allCategories/:specializationOrSymptomsType/:onlineOrWalkInType";
            }
        }
        page="doctorAllCategoriesPage";
        isDoctorConsultation=true;
    }
    else if(url.indexOf('/doctorconsultation/doctorfromviewall') !== -1){
        if(url.split('/').length === 6){
            matchPattern = '/doctorconsultation/doctorfromviewall/:doctorNameId/:isFromViewAll/:onlineOrWalkInType?';
        }
        page = "doctorDetailPage";
        isDoctorConsultation = true;
    }   
    else if(url.indexOf("/subscriptionPlan") !== -1){
        if(url.split("/").length==4){
            matchPattern=`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/:planNameId`;
        }
        page="medplusAdvantage";
    }
    else if(url === "/flexiRewards"){
        matchPattern="/flexiRewards";
        page="FLEXI_REWARDS";
         isStaticPage=true;
    }
    else if(url === "/viewPrescription"){
        matchPattern="/viewPrescription";
        page="VIEW_PRESCRIPTION";
         isStaticPage=true;
    }
    else if(url === "/ordersHistory"){
        matchPattern="/ordersHistory";
        page="ORDER_HISTORY";
         isStaticPage=true;
    }
    else if(url.indexOf("/mp/")!== -1){
        matchPattern="/mp/:promoId";
        page="marketingPage";
    }
    else if(url === "/sitemap"){
        matchPattern="/sitemap";
        page="SITEMAP";
         isStaticPage=true;
    }

    // else if(url.indexOf("/view-all-offers") !== -1 ){
    //     if(url.split("/").length === 4){
    //         matchPattern = "/view-all-offers/:page/:marketingSection";
    //         page="view-all-offers";
    //     }else if(url.split("/").length === 5){
    //         matchPattern = "/view-all-offers/:page/:marketingSection/:test"
    //         page="view-all-offers-test";
    //     }
    //      isDiagnostic=true;
    // }else if(url.indexOf("/category/view-all-tests") !== -1 ){
    //     matchPattern="/category/view-all-tests/:categoryNameId";
    //     page="category-view-all-tests";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/department/view-all-tests") !== -1 ){
    //     matchPattern="/department/view-all-tests/:categoryNameId";
    //     page="department-view-all-tests";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/lab-shopping-cart") !== -1 ){
    //     matchPattern = "/lab-shopping-cart";
    //     page="lab-shopping-cart";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/lab-delivery") !== -1 ){
    //     matchPattern = "/lab-delivery/:view";
    //     page="lab-check-out";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/schedule-slot") !== -1 ){
    //     matchPattern = "/schedule-slot/:view";
    //     page="lab-check-out";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/lab-review-cart") !== -1 ){
    //     matchPattern = "/lab-review-cart";
    //     page="lab-check-out";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/lab-payment") !== -1 ){
    //     matchPattern = "/lab-payment/:orderId";
    //     page="lab-check-out";
    //      isDiagnostic=true;
    // }else if(url.indexOf("/lab-thank-you") !== -1 ){
    //     matchPattern = "/lab-thank-you";
    //     page="lab-thank-you";
    //      isDiagnostic=true;
    // }

    const match = matchPath(url, {
        path: matchPattern,
        exact: true,
        strict: false
    });
    let dynamicPageResp;
    let isGrn = true;

    if(dynamicPages.indexOf(page) !== -1 || staticPages.indexOf(page) !== -1){
        /* if(page === "product"){
            let urlArr = url.split("/");
            let productId = splitProductIdFromParam(urlArr[urlArr.length - 1]);
            productId = decodeURI(decodeURI(productId));
            console.log(productId);
            if(productId.indexOf("?") !== -1){
                let productIdArr = productId.split("?");
                productId = productIdArr[0];
            }
            if(urlArr && urlArr.length){
                await SeoServices().getSeoInfoForProduct({productId}).then(data => {
                    if(data && data.statusCode === "SUCCESS"){
                        dynamicPageResp = data.dataObject;
                    }
                });
            }
        } else if(page === "healthy-life"){
            let urlArray = url.split("/");
            let postId=urlArray[urlArray.length-2];
            if(postId.indexOf('?') !== -1){
                let postIdArray = postId.split("?");
                postId=postIdArray[0];
            }
            if(urlArray && urlArray.length){
                await SeoServices().getSeoInfoForBlog({postId:postId}).then(data=>{
                    if(data && data.statusCode === "SUCCESS"){
                        dynamicPageResp= data.dataObject;
                    }
                })
            }
        } else  */
        if(page === "home"){
            await SeoService().getSeoInfoForMarketingSecProducts().then((response) => {
                if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                    dynamicPageResp = response.dataObject;
                }
            }).catch(error=>{
                console.log(error);
            });
        } else if(page === "categoryHome"){
            let urlArr = url.split("/");
            let currentCategoryId = getCategoryIdFromParam(urlArr[urlArr.length-1]);
            if(validate.isNotEmpty(currentCategoryId)){
                await SeoService().getSeoInfoForMarketingSecProducts({currentCategoryId: "MART_"+currentCategoryId}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if(page === "product") {
            let urlArr = url.split("/");
            if(urlArr && urlArr.length){
                let productId = getProductIdFromParam(urlArr[urlArr.length - 1]);
                await SeoService().getSeoInfoForProduct({productId: productId}).then(data => {
                    if(data && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject)){
                        dynamicPageResp = data.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if (page === "catalog") {
            let urlArr = url.split("/");
            urlArr = urlArr.filter(url => validate.isNotEmpty(url));
            let currentCategoryId = getCategoryIdFromParam(urlArr[urlArr.length - 1]);
            let parentCategoryId = undefined;
            if (urlArr.length > 2) {
                parentCategoryId = getCategoryIdFromParam(urlArr[urlArr.length - 2]);
            }
            if(validate.isNotEmpty(currentCategoryId)){
                await SeoService().getSeoInfoForCategoryPage({currentCategoryId: currentCategoryId, parentCategoryId: parentCategoryId, isGeneral: "Y"}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if(page === "brand") {
            let urlArr = url.split("/");
            let requestBrand = urlArr[urlArr.length-1];
            if(validate.isNotEmpty(requestBrand)){
                await SeoService().getSeoInfoForCategoryPage({requestBrand: requestBrand, isGeneral: "Y"}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if(page === "drugInfo") {
            let urlArr = url.split("/");
            let pharmacyCatId = getCategoryIdFromParam(urlArr[urlArr.length - 1]);
            if(validate.isNotEmpty(pharmacyCatId)){
                await SeoService().getSeoInfoForCategoryPage({pharmacyCatId: pharmacyCatId, isGeneral: "N"}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }else if(page === "manufacturer"){
            let urlArr = url.split("/");
            let manufacturer = urlArr[urlArr.length-1];
            if(validate.isNotEmpty(manufacturer)){
                await SeoService().getSeoInfoForCategoryPage({manufacturer: manufacturer, isGeneral: "N"}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if(page === "composition"){
            let urlArr = url.split("/");
            let compositionId = urlArr[urlArr.length-1];
            if(validate.isNotEmpty(compositionId)){
                await SeoService().getSeoInfoForCategoryPage({compositionId: compositionId}).then((response) => {
                    if(response && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                        dynamicPageResp = response.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if (page === "diagnosticTestDetail"){
            let urlArr = url.split("/");
            let testId = getTestCodeFromUrl(urlArr[urlArr.length - 1]);
            if(validate.isNotEmpty(testId)){
                await SeoService().getSeoTestsDetailsByTestId({testId}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.seoData)){
                        dynamicPageResp = data.dataObject.seoData;
                        url=data.dataObject.seoData.canonicalUrl;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if (page === "diagnosticsCategory" || page === "diagnosticsDepartment"){
            let urlArr = url.split("/");
            let categoryId = "";
            let derived = "N";
            let metaKey="";
            let seoData={};
            if(page === "diagnosticsDepartment") {
                categoryId = getDepartmentIdFromUrl(url.endsWith("/") ? urlArr[urlArr.length - 2] : urlArr[urlArr.length - 1]);
                if(validate.isNotEmpty(categoryId)){
                    metaKey=`DEPT_${categoryId}`;
                }
                derived = "Y";
            } else if(page === "diagnosticsCategory") {
                categoryId = getCategoryIdFromUrl(url.endsWith("/") ? urlArr[urlArr.length - 2] : urlArr[urlArr.length - 1]);
                if(validate.isNotEmpty(categoryId)){
                    metaKey=`${categoryId}`;
                }
                derived = "N";
            }
            if(validate.isNotEmpty(metaKey)){
                await SeoService().getMetaInformation({metaKey: metaKey,isDefaultRequired : false}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.responseData)){
                        seoData = data.responseData;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
            if(validate.isNotEmpty(categoryId)){
                await SeoService().getSeoTestsDetailsByCategoryId({categoryId: categoryId, derived: derived}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.seoDataList)){
                            seoData["seoDataList"] = data.dataObject.seoDataList;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
            dynamicPageResp=seoData;
        } else if (page === "doctorDetailPage"){
            let doctorId = match && match.params && match.params.doctorNameId ? match.params.doctorNameId.split("_")[1]: "";
            if(validate.isNotEmpty(doctorId)){
                await SeoService().getSeoDoctorInfo({doctorId: doctorId}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject)){
                        dynamicPageResp = data.dataObject;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
        else if(page==='medplusAdvantage'){
            let planNameId=match && match.params && match.params.planNameId;
            dynamicPageResp={};
            if(validate.isEmpty(planNameId)){
                dynamicPageResp["plans"]=[...SubscriptionPlans];
                    await SeoService().getMetaInformation({metaKey: 'MEDPLUS_ADVANTAGE'}).then(data => {
                        if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.responseData)){
                            dynamicPageResp = {...dynamicPageResp,...data.responseData};
                        }
                    }).catch(error=>{
                        console.log(error);
                    });
            } else{
                let planId=planNameId.split('_')[1];
                let subscription={};
                if(validate.isNotEmpty(planId)){
                    await SeoService().getSeoSubscriptionPlanDetails({"planId": planId}).then(data => {
                        if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject) &&  validate.isNotEmpty(data.dataObject.planDetails)){
                            const {displayName,price,amount,shortDesc}=data.dataObject.planDetails;
                            subscription["name"]=displayName;
                            subscription["price"]=price;
                            subscription["mrp"]=amount;
                            subscription["description"]=shortDesc;
                        }
                    }).catch(error=>{
                        console.log(error);
                    });
                }
                if(validate.isNotEmpty(subscription)){
                    dynamicPageResp.plans=[subscription];
                }
            }
        } else if(page==='doctorCatalogPage'){
            let visitType=match && match.params && match.params.onlineOrWalkInType || '';
            let specializationOrSymptomsId =match && match.params && match.params.specializationOrSymptomsId || '';
            let specializationOrSymptomsType=match && match.params && match.params.match && match.params && match.params.specializationOrSymptomsType || '';
            let payload={};
            dynamicPageResp={
                doctors:[],
                listingName:""
            }
            const consultationTypeCatalog=visitType !== '';
            payload['startIndex']=0;
            payload['visitType']=consultationTypeCatalog? (visitType==='walk_in'?'W':'T'):'';
            if(specializationOrSymptomsId !== '' ){
                 payload["requestFrom"]="WEB";
                 payload['paramValue']=specializationOrSymptomsId?specializationOrSymptomsId:'';
            }
            if(consultationTypeCatalog  && specializationOrSymptomsId === ''){
                payload['consultationTypeCatalog'] =consultationTypeCatalog;
                payload["priority"]=1;
                const priorityOnedoctorsData=await SeoService().getSeoDoctorsForCatalog(payload).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.doctors)){
                        dynamicPageResp.doctors = [...data.dataObject.doctors];
                        dynamicPageResp.listingName=data.dataObject.listingName ||'';
                    }
                }).catch(error=>{
                    console.log(error);
                });
                payload["priority"]=2;
                payload['paramValue']=consultationTypeCatalog?visitType:specializationOrSymptomsId;
                const priorityTwoDoctorsData=await SeoService().getSeoDoctorsForCatalog(payload).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.doctors)){
                       if(validate.isNotEmpty(dynamicPageResp)){
                        dynamicPageResp.doctors = [...dynamicPageResp.doctors,...data.dataObject.doctors];
                        dynamicPageResp.listingName=data.dataObject.listingName ||'';
                       }
                       else{
                        dynamicPageResp.doctors = [...data.dataObject.doctors];
                        dynamicPageResp.listingName=data.dataObject.listingName ||'';
                       }
                    }
                }).catch(error=>{
                    console.log(error);
                });
            } else {
                await SeoService().getSeoDoctorsForCatalog(payload).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.doctors)){
                        dynamicPageResp.doctors = [...data.dataObject.doctors];
                        dynamicPageResp.listingName=data.dataObject.listingName || '';
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        } else if(page === "paybackspecialsale"){
            var tokenIdFromCookies = null;
            if(cookies){
                const values = cookies.split(';').reduce((res, item) => {
                    const data = item.trim().split('=');
                    return { ...res, [data[0]]: data[1] };
                }, {});
        
                tokenIdFromCookies = values["tokenId"];
            }
            let obj = {paybackCatalogRequest: JSON.stringify({"startIndex" : 0,"limit" : 10}),"tokenId" : tokenIdFromCookies}
            await SeoService().getSeoPaybackCategoryProducts(obj).then(data => {
                if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" &&  validate.isNotEmpty(data.dataObject.giftRedemptionProducts)){
                    dynamicPageResp = data.dataObject.giftRedemptionProducts;
                }
            }).catch(error=>{
                console.log(error);
            });
        }
        else if(isStaticPage == true && staticPages.indexOf(page) !== -1){
            await SeoService().getMetaInformation({metaKey : page}).then((response)=>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS" &&  validate.isNotEmpty(response.responseData)){
                    dynamicPageResp = response.responseData;
                }
            }).catch(error=>{
                console.log(error);
            });
        }
        else if(page == 'healthy-life'){
            let metaKey ="";
            if(urlSplitLength === 2) {
                metaKey = "MEDPLUS_BLOG";
            } else {
                let postName=match && match.params && match.params.postName || '';
                let categoryName=match && match.params && match.params.categoryName || '';
                postName = getNameFromUrl(postName);
                categoryName = getNameFromUrl(categoryName);
                if(validate.isNotEmpty(postName)){
                    postName = postName.replaceAll(/[^a-zA-Z0-9]+/g, "");
                    metaKey =`BPAGE_${postName}`;
                } else{
                    categoryName =categoryName.replaceAll(" ","_").replaceAll(/[^a-zA-Z0-9_\\]+/g, "");
                    metaKey=`BCAT_${categoryName}`;
                }
            }
            if(validate.isNotEmpty(metaKey)){
                metaKey=metaKey.toUpperCase();
                await SeoService().getMetaInformation({metaKey: metaKey,isDefaultRequired : false}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.responseData)){
                        dynamicPageResp = data.responseData;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
            if(urlSplitLength === 2 || urlSplitLength === 4) {
                let SEARCH_CRITERIA = {
                    startIndex : 0,
                    ...(urlSplitLength === 4 && validate.isNotEmpty(match?.params?.categoryId) && {categoryId: match.params.categoryId})
                }
                await MartCatalogService().getBlogPostsList({ SEARCH_CRITERIA }).then((response) => {
                    if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                        dynamicPageResp = dynamicPageResp || {};
                        dynamicPageResp["blogsList"] = response.dataObject;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else if(validate.isNotEmpty(match?.params?.postId) && (urlSplitLength === 5 || urlSplitLength === 6)) {
                await MartCatalogService().getBlogPostDetail({postId: match.params.postId}).then((response) => {
                    if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response?.dataObject?.postDetails)) {
                        dynamicPageResp = dynamicPageResp || {};
                        let blogsList = [response.dataObject.postDetails];
                        if(validate.isNotEmpty(response.dataObject.relatedPosts)) {
                            blogsList = [...blogsList, ...response.dataObject.relatedPosts]
                        }
                        dynamicPageResp["blogsList"] = blogsList;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
        else if(page =='marketingPage'){
            let metaKey = "";
            metaKey = match?.params?.promoId || '';
            metaKey = getNameFromUrl(metaKey);
            metaKey =metaKey?.replaceAll(/[^a-zA-Z0-9-\\]+/g, "").replaceAll("-","_");
            if(metaKey){
                metaKey = `LPAGE_${metaKey}`.toUpperCase();
                await SeoService().getMetaInformation({metaKey: metaKey}).then(data => {
                    if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.responseData)){
                        dynamicPageResp = data.responseData;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
    }
    
    if(isDiagnostic){   
        let titleString = getDiagnosticTitleString(page, dynamicPageResp,  match) || getDiagnosticTitleString("home");
        let descriptionString = getDiagnosticDescString(page, dynamicPageResp , match) || getDiagnosticDescString("home");
        let keyword = getDiagnosticKeyWordString(page,  dynamicPageResp, match) || getDiagnosticKeyWordString("home");
        let pageUrl = SeoServerConfig.SEO_URL + url;
        const metaInfo = getMetaInfo(titleString, descriptionString, keyword, pageUrl, isGrn,dynamicPageResp,page);
        const richTextInfo = generateRichText(page, dynamicPageResp, match, pageUrl);
        return `${metaInfo} ${commonRichText} ${richTextInfo}`;
    } else if(isDoctorConsultation){
        let titleString = getDoctorTitleString(page, match,dynamicPageResp) || getDoctorTitleString("home");
        let descriptionString = getDoctorDescriptionString(page, match,dynamicPageResp) || getDoctorDescriptionString("home");
        let keyword = getDoctorKeywordString(page, match,dynamicPageResp) || getDoctorKeywordString("home");
        let pageUrl = SeoServerConfig.SEO_URL + url;
        const metaInfo = getMetaInfo(titleString, descriptionString, keyword, pageUrl, isGrn,dynamicPageResp,page);
        const richTextInfo = generateRichText(page, dynamicPageResp, match, pageUrl);
        return `${metaInfo} ${commonRichText} ${richTextInfo}`;
    } else {
        let titleString =   dynamicPageResp && dynamicPageResp.metaTitle ? dynamicPageResp.metaTitle : getTitleString(page, match);
        let descriptionString = dynamicPageResp  && dynamicPageResp.metaDescription ? dynamicPageResp.metaDescription : getDescString(page, match); 
        let keyword =  dynamicPageResp && dynamicPageResp.metaKeywords ? dynamicPageResp.metaKeywords : getKeyWordString(page, match);
        let pageUrl = getPageUrl(page, dynamicPageResp, url);
        const metaInfo = getMetaInfo(titleString, descriptionString, keyword, pageUrl,isGrn,dynamicPageResp,page);
        const richTextInfo = generateRichText(page, dynamicPageResp, match, pageUrl);
        return `${metaInfo} ${commonRichText} ${richTextInfo}`;
    }
}

const getPageUrl = (page, dynamicPageResp, url) => {
    switch(page) {
        case "product" :
            return SeoServerConfig.SEO_URL + getProductRedirectUrl(dynamicPageResp.productId, dynamicPageResp.name);
        case "catalog":
            const categoryNameIdArr = url.split("/");
            return SeoServerConfig.SEO_URL + (categoryNameIdArr.length > 0 ? "/categories/" + categoryNameIdArr[categoryNameIdArr.length - 1].split("?")[0] : url);
        case "home": 
            return SeoServerConfig.SEO_URL;
        default : return SeoServerConfig.SEO_URL + url;
    }
}

const generateRichText = (page, dynamicPageResp, match, url) => {
    const validate = Validate();
    if(dynamicPages.indexOf(page) !== -1 && dynamicPageResp === undefined){
        return ``;
    }
    switch(page){
        case "product" : 
            return prepareProductRichTextData(page, dynamicPageResp, match);
        case "home" :
            let richText = `<script type="application/ld+json">
                {
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebSite",
                            "name" : "MedPlus Mart",
                            "url": "https://www.medplusmart.com/"
                        },
                        {
                            "@type" : "Organization",
                            "legalName" : "Medplus Mart",
                            "name" : "MedPlus Mart",
                            "url" : "https://www.medplusmart.com/",
                            "contactPoint" : [{
                                "@type" : "ContactPoint",
                                "telephone" : "+91 040-6700 6700",
                                "contactType" : "customer service"
                            }],
                            "logo" : "https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/mart_identity.png",
                            "sameAs" : [ "https://www.facebook.com/IndiaMedPlus",
                                "https://www.youtube.com/channel/UCIkVRQNwi4cCWREexw307gg",
                                "https://twitter.com/MedPlusIndia",
                                "https://www.youtube.com/user/EliteSEMInc",
                                "https://in.linkedin.com/in/medplus",
                                "https://en.wikipedia.org/wiki/MedPlus"]
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":1,
                            "name": "Medicine Information",
                            "description": "Search and select the medicines you want; Upload your prescription at check out; Choose home delivery or store pick up",
                            "url":"https://www.medplusmart.com/pharmaHome"
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":2,
                            "name": "FlexiRewards",
                            "description": "With FlexiRewards, you have the flexibility to choose either a cash discount or free products. The products available under the scheme are regular use household products that you would otherwise buy on a regular basis. Opting for free products instead of cash would result in savings that are up to 3 or 4 times higher.",
                            "url":"https://www.medplusmart.com/flexiRewards"
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":3,
                            "name": "Medplus - Online Pharmacy Store in India. Best value on medicines",
                            "description": "One account allows access to all MedPlus services and products. Login or signup to order medicines online in India. Manage purchase history & health records.",
                            "url":"https://www.medplusmart.com/myProfile"
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":4,
                            "name": "Register at MedplusMart.com",
                            "description": "Register yourself with medplusmart.com. Avail offers on prescription medicines and general products. Home delivery and cash on delivery available.",
                            "url":"https://www.medplusmart.com/myProfile"
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":5,
                            "name": "Store Locator",
                            "description": "Find the nearest MedPlus store. Order medicines online at medplusmart.com, pick up from the nearest medplus store. Availability guaranteed. Cash on delivery.",
                            "url":"https://www.medplusmart.com/mCart/storeLocator/"
                        },
                        {
                            "@type":"SiteNavigationElement",
                            "position":6,
                            "name": "About Us",
                            "description": "At medplusmart.com you can order medicines and general products you buy from a trusted pharmacy in India. All orders fulfilled within stipulated timeline.",
                            "url":"https://www.medplusmart.com/aboutUs"
                        }
                    ]
                }
            </script>`;
            let richTextData = "";
            if (validate.isNotEmpty(dynamicPageResp)) {
                let productList = dynamicPageResp.displayProductList;
                productList.map((eachProduct) => richTextData = richTextData.concat(" ", prepareProductRichTextData(page, eachProduct, match)));
            }
            richText += richTextData;
            return richText;
        case "catalog":
        case "brand":
        case "drugInfo":
        case "manufacturer":
        case "composition":
        case "categoryHome":
            let productRichTextData = "";
            if (validate.isNotEmpty(dynamicPageResp)) {
                let productList = dynamicPageResp.displayProductList;
                productList.map((eachProduct) => productRichTextData = productRichTextData.concat(" ", prepareProductRichTextData(page, eachProduct, match)));
            }
            return productRichTextData;
        case "healthy-life" :
            let blogRichTextData = "";
            if (validate.isNotEmpty(dynamicPageResp) && validate.isNotEmpty(dynamicPageResp.blogsList)) {
                dynamicPageResp.blogsList.map((eachBlog) => blogRichTextData = blogRichTextData.concat(" ", prepareRichTextForBlog(eachBlog, url)));
            }
            return blogRichTextData;
        case "diagnosticTestDetail" :
            return prepareDiagnosticRichText(dynamicPageResp, match);
        case "diagnosticsCategory" : 
        let diagnosticRichTextForCategory = "";
            if(dynamicPageResp && dynamicPageResp.seoDataList){
            for (let eachIndex in dynamicPageResp.seoDataList) {
                diagnosticRichTextForCategory = diagnosticRichTextForCategory.concat(" ", prepareDiagnosticRichText(dynamicPageResp.seoDataList[eachIndex], match));
            }
        }
            return diagnosticRichTextForCategory;
        case "diagnosticsDepartment":
            let diagnosticRichText = "";
            if(dynamicPageResp && dynamicPageResp.seoDataList){
            for (let eachIndex in dynamicPageResp.seoDataList) {
                diagnosticRichText = diagnosticRichText.concat(" ", prepareDiagnosticRichText(dynamicPageResp.seoDataList[eachIndex], match));
            }
        }
            return diagnosticRichText;
        case "doctorDetailPage" :
            return prepareDoctorRichText(dynamicPageResp, match,url);
        case "medplusAdvantage":
            let medplusAdvantagetemp = "";
            if(validate.isNotEmpty(dynamicPageResp) && validate.isNotEmpty(dynamicPageResp.plans)){
                dynamicPageResp.plans.map(subscription=>medplusAdvantagetemp = medplusAdvantagetemp.concat(" ", medplusAdvantagetempsData(subscription)))
            }
            return medplusAdvantagetemp;
        case "paybackspecialsale":
            let paybackspecialsaletemp="";
            paybackspecialsaletemp=dynamicPageResp.reduce((total,product)=>total+paybackspecialsaletempsData(product),"");
            return paybackspecialsaletemp;
        case "doctorCatalogPage":
                let doctorRichTextData="";
                if(validate.isNotEmpty(dynamicPageResp)){
                dynamicPageResp.doctors.map(doctor=>doctorRichTextData = doctorRichTextData.concat(" ",prepareDoctorRichText(doctor,match,url))); 
                }
                return doctorRichTextData;    
        default : return ``;
    }
}


const commonRichText = `<script type="application/ld+json"> {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "MedPlus Health Services Limited",
    "email": "wecare@medplusindia.com",
    "areaServed": "IN",
    "founders": [{
        "@type": "Person",
        "name": "Madhukar Gangadi"
    }], 
    "foundingDate": "2006",
    "legalName": "Optival Health Solutions Private Limited",
    "url": "https://www.medplusindia.com",
    "brand": {
        "@type": "Brand",
        "name": "MedPlus"
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "M.No.11-6-56/C/NR, SY. No. 257 and 258/1 Opp: IDPL Railway Siding Moosapet, Kukatpally, Balanagar, Mandal Rangareddy Cir Dist",
        "addressLocality": "Hyderabad",
        "addressRegion": "IN-TS",
        "addressCountry": "IN",
        "postalCode": "500037"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "040 67006700",
        "contactType": "Customer Care",
        "email": "wecare@medplusindia.com",
        "areaServed": "IN"
    },
    "description": "MedPlus: One of the most trusted gateways to medicines and general provision. With an aim to eradicate fake and ineffective medicines, and supply high-quality medicines in India, MedPlus was launched in 2006 in Hyderabad. According to WHO research, every 1 or 2 in 10 medicines are proven to be adulterated in low/medium income countries like India and MedPlus aspires to bring about a change in this statistic. To encourage and elevate transparency in the functioning of the pharmaceutical industry, MedPlus has been successfully contributing in providing genuine and unadulterated medicines since its inception. Currently operating in 300+ cities, with 2000+ offline stores in India, MedPlus is the second largest pharmacy chain in India today. Welcome to a seamless and impeccable shopping experience.",
    "logo": "https://www.medplusindia.com/images/medplus_logo.png",
    "@id": "https://www.medplusindia.com/#Organization"
}
</script>`;

const paybackspecialsaletempsData=(item)=>{
    return( `<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type" : "Product",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "55"
        },
        ${item.productName?
        `"name":"${item.productName}",`:``}
        ${item.imageUrl?
        `"image":"${item.imageUrl.split(",")[0]}",`:``}
        "offers": {
            "@type": "Offer",
            ${item.packSizeMrp?
            `"price": "${item.packSizeMrp}"`:``}
            ${item.maxPrice?
                `"maxPrice": "${item.maxPrice}"`:``}
           
        }
    }
    </script>`

    )
}

const decodeUrl = (url)=> {
    while(url.indexOf('%') != -1){
    url = decodeURIComponent(url);
    }
    return url;
}
const medplusAdvantagetempsData = (item) =>{
    return(
        `<script type="application/ld+json">
        {
            "@context":"https://schema.org",
            "@type":"product",
            ${item.name ? `"name":"${item.name}",`:``}
            "image":"https://static2.medplusmart.com/live/webpwa/images/common/medplus-advantage-cat-icn.svg",
            "offers":{
                "@type":"Offer",
                "priceCurrency":"INR",
                ${item.mrp != item.price ? 
                    `"price" : ${item.mrp},
                    "itemOffered" : ${item.price},`:`"price" : ${item.mrp}`
                }
                ${item.description ? `"description" :"${item.description}"`:``}
            }
               
               
        }
        </script>`
    )
}
const prepareDiagnosticRichText = (testDetail, match) => {
    return (`<script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type" : "Product",
            ${testDetail.specialInstructions ? `"description" : "${testDetail.specialInstructions}",` : ``}
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "55"
            },
            "name" : "${testDetail.name ? testDetail.name : match && match.params && match.params.testNameId ? getTestNameFromUrl(match.params.testNameId) : ``}",
            ${testDetail.alternateKeywords ?
            `"alternateName" : "${testDetail.alternateKeywords.toString()}",` : ''}
            "offers":{
                "@type":"Offer",
                "priceCurrency":"INR",
                ${testDetail.mrp != testDetail.price ? 
                    `"price" : ${testDetail.mrp},
                    "itemOffered" : ${testDetail.price}`
                    :`"price" : ${testDetail.mrp}`
                }
            }
        }
    </script>`);
}

const prepareProductRichTextData = (page, productDetail, match) => {
    return(
        `<script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Product",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "ratingCount": "55"
                },
                ${productDetail.name ? `"name": "${productDetail.name && productDetail.name.indexOf("\"") !== -1 ? productDetail.name.replace("\"", "inch") : productDetail.name}",` : `"name": "${getTitleString(page, match)},"`}
                ${productDetail.image ? `"image": "${productDetail.image}",` : `"image":"https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/mart_identity.png",`}
                ${productDetail.productId ? `"sku": "${productDetail.productId}",` : ""}
                ${productDetail.isInStock ? `"availability": "${productDetail.isInStock == true ? "In Stock" :"Out Of Stock"}",` : ""}
                ${productDetail.brand ? `"brand": {
                  "@type": "Brand",
                  "name": "${productDetail.brand}"
                },` : ""}
                ${productDetail.productId ? `"productID": "${productDetail.productId}",` : ""}
                ${productDetail.productLongDescription ? `"description": "${productDetail.productLongDescription}",` : `"description": "${getDescString(page, match)}",`}
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "INR",
                  "offerCount": 1,
                  ${productDetail.mrp ? `"mrp": "${productDetail.mrp}",` : ""}
                  ${productDetail.url ? `"url": "${productDetail.url}"` : ""}
                }
            }
        </script>`
    )
}

const prepareRichTextForBlog = (blogDetails, url) => {
    return `<script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        "headline": "Healthy-Life Blog",
        ${blogDetails.title ? `"name": "${blogDetails.title}",` : ""}
        ${blogDetails.summary ? `"description": "${blogDetails.summary}",` : ""}
        ${blogDetails.dateCreated ? `"datePublished": "${moment(new Date(blogDetails.dateCreated)).format("MMMM DD, YYYY")}",` : ""}
        "publisher": {
            "@type": "Organization",
            "name": "MedPlus Health Services Limited",
            "email": "mailto:wecare@medplusindia.com",
            "areaServed": "IN",
            "founders": [{
                "@type": "Person",
                "name": "Madhukar Gangadi"
            }]
        },
        "image": {
            "@type": "ImageObject",
            ${blogDetails.featuredMedia && blogDetails.featuredMedia.featuredImage ? `"url": "${blogDetails.featuredMedia.featuredImage}"` : ""}
        },
        ${url ? `"url": "${url}",` : ""}
        "isPartOf": {
            "@type" : "Blog",
            ${Object.values(blogDetails.categories).length > 0 ? `"name": "${Object.values(blogDetails.categories).join(", ")}",` : ""}
            "publisher": {
                "@type": "Organization",
                "name": "MedPlusMart"
            }
        }
    }
    </script>`;
}

const prepareDoctorRichText = (doctorDetail, match,url) => {
    return (`<script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MedPlus Health Services Limited",
            
            "members": [{
                "@type": "Person",
                "name": "${doctorDetail.name ? doctorDetail.name : match && match.params && match.params.doctorNameId ? getTestNameFromUrl(match.params.doctorNameId) : ``}",
                ${doctorDetail.profile ? `"image" : "${doctorDetail.profile}",` : ``}
                ${doctorDetail.qualification ? `"educationRequirements" : "${doctorDetail.qualification.toString() }",`:``}
                ${doctorDetail.registrationNo ? `"termCode" : "${doctorDetail.registrationNo}",`:``}
                ${doctorDetail.speciality ? `"Occupation" :"${doctorDetail.speciality}"`:``}
            }], 
            "legalName": "Optival Health Solutions Private Limited",
            "url": "${url}",
            "brand": {
                "@type": "Brand",
                "name": "MedPlus"
            },
            ${doctorDetail.about ? `"Description" : "${doctorDetail.about}",` : ``}
            ${doctorDetail.personalAddress && doctorDetail.personalAddress.addressLine1 ? 
                `"address": {
                "@type": "postalAddress",
                "addressLocality": "${doctorDetail.personalAddress.addressLine1}"
            },`:''}
            "ContactPoint": {
                "@type": "ContactPoint",
                "contactType": "${(doctorDetail.priceData && doctorDetail.priceData.TELE_MEDICINE && doctorDetail.priceData.WALKIN) ? "Online and Walk-In Consultations" : (doctorDetail.priceData && doctorDetail.priceData.TELE_MEDICINE) ? "Online and Walk-In Consultations" : "Walk-In Consultation"}"
            },
            "logo": "${process.env.ASSETS_URL}images/medplus_logo.png"
        }
    </script>`);
}

const getMetaInfo = (titleString,descriptionString, keyword, url, isGrn,dynamicPageResp,page) => {
    let isProduction = false;
    let robottxt = 'noindex';
    if((process.env.ASSETS_URL && process.env.ASSETS_URL.indexOf("static2.medplusmart.com") !== -1) && isGrn){
        isProduction = true;
        robottxt = 'index,follow';
    }
    if(page ===''){
        robottxt = 'noindex';
    }
    if(titleString){
        if(titleString.trim().length > 70) {
            titleString = titleString.trim().substring(0, 70);
        }
        if(titleString.trim().endsWith("-")) {
            titleString = titleString.trim().substring(0, titleString.length-2);
        }
        
    }

    if(descriptionString){
        if(descriptionString.trim().length > 160) {
            descriptionString = descriptionString.trim().substring(0, 160);
        }
        if(descriptionString.trim().endsWith("-")) {
            descriptionString = descriptionString.trim().substring(0, descriptionString.length-2);
        }

    }
  
      let metaString = `
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
      <meta name="msapplication-TileColor" content="#f2f2f2">
      <link rel="canonical" href="${url}">
      <meta name="msapplication-TileImage" content="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/favicon/ms-icon-144x144.png?v=c6506c2347fe7cee92e39f5d1ad3db87">
      <meta property="og:locale" content="en_US">
      <meta property="og:type" content="website">
      ${titleString ? `<meta property="og:title" content="${titleString}">` : ``}
      ${descriptionString ?  `<meta property="og:description" content="${descriptionString}">` : ``}
      <meta property="og:url" content="${url}">
      <meta property="og:image" content="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/favicon-mart.ico?v=a311f798f2fd7e99418f27fe3f12ae1c"/>
	  <meta property="og:image:width" content="16"/>
	  <meta property="og:image:height" content="16"/>
      <meta name="msvalidate.01" content="E949E6E1941D89DC57150CFD5F56B628"/>
      ${titleString ? `<title>${titleString}</title>` :``}
      <meta name="googlebot" content="noarchive">
      <meta name="facebook-domain-verification" content="tt0sfy3uce0t3bs1bw1zyej6bbh0sp" />
      <meta name="google-site-verification" content="${isProduction ? `RBADLUdSYeDmQzW3bUEP4tzibO3jnpXXdyIZaA-YGvI` : ``}">
      ${titleString ? `<meta name="title" content="${titleString}">` : ``}
      ${keyword ? `<meta name="keywords" content="${keyword}">` : ``}
      ${descriptionString ? `<meta name="description" content="${descriptionString}">` : ``}
      <meta name="dcterms.rightsHolder" content="MedPlusMart"></meta>
      <meta name="Author" content="Sampath Kumar Ch"></meta>
      <meta name="contact" content="wecare at medplusmart dot com"></meta>
      <meta name="robots" content="${robottxt}"></meta>
      <meta name="dc.created" content="23/05/2014"></meta>
      <meta name="revisit-after" content="7 days"></meta>
      <meta name="theme-color" content="#CFCEC7"></meta>
    `;
    return metaString;
}

const getTitleString = (page, match) => {
    switch(page){
        case "catalog" : return `Buy ${match && match.params && match.params.currentCategoryName_Id ? getCategoryNameFromParam(match.params.currentCategoryName_Id) : ``} Products Online at Best Price  in India - MedplusMart`;
        case "product" : return `Buy ${page === 'product' ? `Product` : `Products`} Online at best Price in India - MedPlusMart`;
        case "medplusAdvantage" : return `MedPlus Advantage – Best Health Check up Packages for full family`;
        case "paybackspecialsale" : return `MedPlus Payback Points`;
        case "healthy-life" : return `${(match?.params?.categoryName || match?.params?.postName) ? getNameFromUrl(match.params.categoryName || match.params.postName) : "Online Pharmacy Store in India. Best value on medicines - MedPlusMart"}`;
        case "home": 
        default : return "Online Pharmacy Store in India. Best value on medicines - MedPlusMart"; 
    }
}

const getDescString = (page, match) => {
    switch(page){
        case "catalog" : return `${match && match.params && match.params.currentCategoryName_Id ? getCategoryNameFromParam(match.params.currentCategoryName_Id) : ``} Buy medicines online from India's favorite e-pharmacy. Buy prescription medicines, OTC products & household needs. Cash on delivery. Home delivery.`;
        case "medplusAdvantage" : return `MedPlus Advantage having various health checkup packages for complete family including full body health checkup and master health checkup at affordable rate`;
        case "home":
        default : return "Buy medicines online from India's favorite e-pharmacy. Buy prescription medicines, OTC products & household needs. Cash on delivery. Home delivery.";
    }
}

const getKeyWordString = (page, match) => {
    switch(page){
        case "catalog" : return `${match && match.params && match.params.currentCategoryName_Id ? getCategoryNameFromParam(match.params.currentCategoryName_Id) : ``} MedPlusmart, Online Pharmacy Store in India, online pharmacy, buy medicines online, best value added medicines, prescription medicines, MedPlus online pharmacy, buy medicines online in India, online medical products, save on medicines, Add best products to Cart`;
        case "medplusAdvantage" : return `complete body checkup, full body health checkup, master health checkup, health check up packages, complete body checkup packages, full body health checkup packages`;
        case "home":
        default : return "MedPlusmart, Online Pharmacy Store in India, online pharmacy, buy medicines online, best value added medicines, prescription medicines, MedPlus online pharmacy, buy medicines online in India, online medical products, save on medicines, Add best products to Cart";
    }
}

const getDiagnosticTitleString = (page, dynamicPageResp, match) => {
    switch(page){
        case "diagnosticsCategory" : return `${dynamicPageResp && dynamicPageResp.metaTitle ? (dynamicPageResp.metaTitle) : match && match.params && match.params.categoryNameId ? `${textCapitalize(getCategoryNameFromUrl(match.params.categoryNameId))},Clinical Diagnostic Lab Tests and Laboratory Tests by Sub-Category` :``}`;
        case "diagnosticsDepartment" : return `${dynamicPageResp && dynamicPageResp.metaTitle ? (dynamicPageResp.metaTitle) : match && match.params && match.params.categoryNameId ? `Book ${textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId))} lab Tests Online` :``}`;
        case "category-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)) : ``}, Medical Labs Test List | Online Laboratory Services`;
        case "department-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)) : ``}, Medical Labs Test List | Online Laboratory Services`;
        case "diagnosticTestDetail" : return `${dynamicPageResp && dynamicPageResp.metaTitle ? (dynamicPageResp.metaTitle) : (match && match.params && match.params.testNameId ? textCapitalize(getTestNameFromUrl(match.params.testNameId)).concat(`,Clinical Laboratory Test at discounted prices`) : ``)}`;
        case "category-home" : return `${match && match.params && match.params.category ? textCapitalize(getCategoryNameFromUrl(match.params.category)) : ``}, Clinical Diagnostic Lab Tests and Laboratory Tests by Category`;
        case "view-all-offers" : return `${match && match.params && match.params.marketingSection ? textCapitalize(getCategoryNameFromUrl(match.params.marketingSection)) : ``}, Medical Labs Offer Test List | Online Laboratory Services`;
        case "view-all-offers-test" : return `${match && match.params && match.params.test ? textCapitalize(getCategoryNameFromUrl(match.params.test)) : ``}, Medical Labs Offer Test List | Online Laboratory Services`;
        case "lab-shopping-cart" : return `Lab Shopping Cart - Clinical Diagnostic Lab Tests and Laboratory Tests Online`;
        case "lab-thank-you" : return `Thank You - Clinical Diagnostic Lab Tests and Laboratory Tests Online`;
        case "lab-check-out" : return `Lab CheckOut - Clinical Diagnostic Lab Tests and Laboratory Tests Online`;
        default : return `MedPlus Diagnostics – Book Lab Test for Blood, Health & Body Checkup`;
    }
}

const getDoctorTitleString = (page, match,dynamicPageResp) => {
    switch(page){
        case "doctorDetailPage" : return `${dynamicPageResp && dynamicPageResp.serviceMetaData && dynamicPageResp.serviceMetaData.metaTitle ? dynamicPageResp.serviceMetaData.metaTitle : (dynamicPageResp && dynamicPageResp.name ? `Doctor ${dynamicPageResp.name}`: '')}`;
        case "doctorCatalogPage" : return `${dynamicPageResp && dynamicPageResp.listingName ? match && match.params && match.params.specializationOrSymptomsId  && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId) && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId) === UrlTypeConstants.symptoms? `Know Symptoms of ${dynamicPageResp.listingName}` : `${dynamicPageResp.listingName} Specialist Appointment online`: match && match.params && match.params.onlineOrWalkInType  && (match.params.onlineOrWalkInType === 'online_consultation' ? 'MedPlusMart | Online Consultation' : 'MedPlusMart | Walk In') || ""}`;
        case "doctorAllCategoriesPage" : return `MedPlusMart.com | ${match && match.params && match.params.specializationOrSymptomsType ?textCapitalize(match.params.specializationOrSymptomsType): ''}`;
        case "home" :
        default : return `Book Appointment with Doctor - For Tele Consultation & Hospital Visit`;
    }
}

const getDoctorDescriptionString = (page,match,dynamicPageResp) => {
    switch(page){
        case "doctorDetailPage" : return `${dynamicPageResp && dynamicPageResp.serviceMetaData && dynamicPageResp.serviceMetaData.metaDescription ? dynamicPageResp.serviceMetaData.metaDescription : dynamicPageResp && dynamicPageResp.name ? `Book Online Consultation with Doctor ${dynamicPageResp.name} to get consultation at Video Call`: ''}`;
        case "doctorCatalogPage" : return `${dynamicPageResp && dynamicPageResp.listingName ? match && match.params && match.params.specializationOrSymptomsId  && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId) && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId)=== UrlTypeConstants.symptoms? `Know Symptoms of ${dynamicPageResp.listingName} - There are some Common Symptoms of ${dynamicPageResp.listingName} need to know before treatment` : `Book ${dynamicPageResp.listingName} Specialist Appointment online For Consultation and Treatment`: ""}`;
        case "home" :
        default : return `Book online Appointment with Specialist Doctor at MedPlusmart For Tele Consultation or Walk to their Hospital for consultation Visit`;
    }
}

const getDoctorKeywordString = (page, match,dynamicPageResp) => {
    switch(page){
        case "doctorDetailPage" : return `${dynamicPageResp && dynamicPageResp.serviceMetaData && dynamicPageResp.serviceMetaData.metaKeywords.length !== 0 ? dynamicPageResp.serviceMetaData.metaKeywords :  dynamicPageResp && dynamicPageResp.name ? `${dynamicPageResp.name}, Doctor ${dynamicPageResp.name}, Book Online Consultation with ${dynamicPageResp.name}`: ''}`;
        case "doctorCatalogPage" : return `${dynamicPageResp && dynamicPageResp.listingName ? match && match.params &&  match.params.specializationOrSymptomsId  && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId) && getPageTypeFromUrlValue(match.params.specializationOrSymptomsId) === UrlTypeConstants.symptoms? `What are the Symptoms of ${dynamicPageResp.listingName}, Common Symptoms of ${dynamicPageResp.listingName}` : `${dynamicPageResp.listingName} Specialist Appointment online, Book ${dynamicPageResp.listingName} Specialist Appointment online, ${dynamicPageResp.listingName} Specialist For Consultation`:  ""}`;
        case "home" :
        default : return `book doctor appointment for visit, book doctor appointment online india, book doctor appointment for tele consultation, doctor appointment for consultation visit`;
    }
}

let preparekeyWordString = (metaKeywords) => {
    metaKeywords =Array.from(metaKeywords);
    let metaKeywordsString = " ";
    for (let eachIndex in metaKeywords ){
        if(eachIndex!=metaKeywords.length-1)
        metaKeywordsString = metaKeywordsString.concat(metaKeywords[eachIndex]+",");
        else
        metaKeywordsString = metaKeywordsString.concat(metaKeywords[eachIndex]);

    }
    return metaKeywordsString;
}
const getDiagnosticKeyWordString = (page,dynamicPageResp, match) => {
    switch(page){
        case "diagnosticsCategory" : return `${dynamicPageResp && dynamicPageResp.metaKeywords ? (dynamicPageResp.metaKeywords):  match && match.params && match.params.categoryNameId ? `${textCapitalize(getCategoryNameFromUrl(match.params.categoryNameId))},Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`: ''}`;
        case "diagnosticsDepartment" : return `${dynamicPageResp && dynamicPageResp.metaKeywords ? (dynamicPageResp.metaKeywords):  match && match.params && match.params.categoryNameId ? `${textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId))}, Biochemistry, Clinical Pathology, Hematology, Microbiology, Molecular Biology, Profile Parameters, Serology.`:''}`;
        case "category-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)): ``}, Online Daignostics, MedPlus Labs, Home Sample Collection, Online Lab Tests, Home Diagnostic Services,  Blood Test from Home.`;
        case "department-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)): ``}, Online Daignostics, MedPlus Labs, Home Sample Collection, Online Lab Tests, Home Diagnostic Services,  Blood Test from Home.`;
        case "diagnosticTestDetail" : return `${dynamicPageResp && dynamicPageResp.metaKeywords ?  (preparekeyWordString(dynamicPageResp.metaKeywords)) : dynamicPageResp && dynamicPageResp.alternateKeywords ? preparekeyWordString(dynamicPageResp.alternateKeywords) : (match && match.params && match.params.testNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.testNameId)).concat(`, Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`): ``)}`;
        case "category-home" : return `${match && match.params && match.params.category ? textCapitalize(getCategoryNameFromUrl(match.params.category)): ``}, Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        case "view-all-offers" : return `${match && match.params && match.params.marketingSection? textCapitalize(getCategoryNameFromUrl(match.params.marketingSection)) : ``}, Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        case "view-all-offers-test" : return `${match && match.params && match.params.test ? textCapitalize(getCategoryNameFromUrl(match.params.test)) : ``}, Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        case "lab-shopping-cart" : return `Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        case "lab-thank-you" : return `Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        case "lab-check-out" : return `Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`;
        default : return `diagnostics center hyderabad, fine needle aspiration cytology test, blood test at home, diagnostic center secunderabad, lab tests, blood testing services, best diagnostic centers`;
    }
}

const getDiagnosticDescString = (page,dynamicPageResp, match) => {
    switch(page){
        case "diagnosticsCategory" : return `${dynamicPageResp && dynamicPageResp.metaDescription ? (dynamicPageResp.metaDescription) :  match && match.params && match.params.categoryNameId ? `${textCapitalize(getCategoryNameFromUrl(match.params.categoryNameId))}, Blood tests, Urine tests, Stool tests, and Body Fluid Tests by Department.`:''}`;
        case "diagnosticsDepartment" : return `${dynamicPageResp && dynamicPageResp.metaDescription ? (dynamicPageResp.metaDescription):  match && match.params && match.params.categoryNameId ? `${textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId))}, Clinical Pathology tests, Clinical Biochemistry tests, Hematology tests, Serology tests, Microbiology tests, Histopathology tests, Molecular Biology tests and Health Packages.`:''}`;
        case "category-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)): ``}, List of Clinical Lab Tests from one of top diagnostic labs in India. Book Lab Tests Online. Home sample collection available.`;
        case "department-view-all-tests" : return `${match && match.params && match.params.categoryNameId ? textCapitalize(getDepartmentNameFromUrl(match.params.categoryNameId)): ``}, List of Clinical Lab Tests from one of top diagnostic labs in India. Book Lab Tests Online. Home sample collection available.`;
        case "diagnosticTestDetail" : return ` ${dynamicPageResp && dynamicPageResp.metaDescription ? (dynamicPageResp.metaDescription): (match && match.params && match.params.testNameId ? `Book `.concat( textCapitalize(getDepartmentNameFromUrl(match.params.testNameId))).concat(`, and other Pathology tests online at Medplusmart.com`): ``)}`;
        case "category-home" : return `${match && match.params && match.params.category ? textCapitalize(getCategoryNameFromUrl(match.params.category)): ``}, Blood tests, Urine tests, Stool tests, and Body Fluid Tests by Department.`;
        case "view-all-offers" : return `${match && match.params && match.params.marketingSection ? textCapitalize(getCategoryNameFromUrl(match.params.marketingSection)) : ``}, Blood tests, Urine tests, Stool tests, and Body Fluid Tests by Department.`;
        case "view-all-offers-test" : return `${match && match.params && match.params.test ? textCapitalize(getCategoryNameFromUrl(match.params.test)) : ``}, Blood tests, Urine tests, Stool tests, and Body Fluid Tests by Department.`;
        case "lab-shopping-cart" : return `List of Clinical Lab Tests from one of top diagnostic labs in India. Book Lab Tests Online. Home sample collection available.`;
        case "lab-thank-you" : return `List of Clinical Lab Tests from one of top diagnostic labs in India. Book Lab Tests Online. Home sample collection available.`;
        case "lab-check-out" : return `List of Clinical Lab Tests from one of top diagnostic labs in India. Book Lab Tests Online. Home sample collection available.`;
        default : return `Book Lab Test for Blood, Health & Body Checkup at home including fine needle aspiration cytology test at best Diagnostics centers of Hyderabad & Secunderabad`;
    }
}
