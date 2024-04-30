import Validate from "./Validate";
import SubscriptionService from "../components/Subscription/services/SubscriptionService";
import DateValidator from "./DateValidator";
import LocalDB from "../DataBase/LocalDB";
import store from "../../redux/store";
import { RESET_USER_CONTACT_DETAILS, RESET_USER_INFO } from "../../redux/reducer/UserInfoReducer";
import moment from "moment";
import { SubscriptionPlanTypes } from "../components/Subscription/constants/SubscriptionConstants";
const validate = Validate();
const subscriptionService = SubscriptionService();

export const textCapitalize = (capitalizeText) => {
    let preparedCapitalizedText = ``;
    if (capitalizeText) {
        preparedCapitalizedText = capitalizeText.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    return preparedCapitalizedText;
}

export const getDecodedURL = (requestedURL) => {
    let decodedURL = undefined;
    if (requestedURL) {
        if (requestedURL.indexOf("+") != -1) {
            let nameArray = requestedURL.split("\+");
            if (nameArray.length > 1) {
                requestedURL = nameArray[0] + "+" + nameArray[1];
            }
        }
        decodedURL = requestedURL.replace(/&#038;/g,"&").replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-")
            .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    }

    return decodedURL;
}

export const getNameFromUrl = (urlName) => {
    let replaceNameString = undefined;
    if (urlName) {
        replaceNameString = urlName.replace(/percent/g, "%")
            .replace(/-and-/g, "\+").replace(/-n-/g, "&")
            .replace(/-/g, " ");
    }
    return replaceNameString;
}

export const getCategoryNameForUrl = (categoryName, categoryId) => {
    let preparedCategoryNameWithId = "";
    if (categoryName) {
        preparedCategoryNameWithId = categoryName.trim().replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-").replace(/ /g, "-")
            .replace(/\//g, "-or-").replace(/-+/g, "-");
    }
    if (categoryId) {
        preparedCategoryNameWithId = preparedCategoryNameWithId.concat("_").concat(categoryId.trim()).toLowerCase();
    }
    return preparedCategoryNameWithId;
}
export const getCategoryNameFromUrl = (url) => {
    let preapredCategoryName = "";
    let array = url.split("_labs_");
    url = array[0];
    if (url) {
        preapredCategoryName = url.replace(/percent/g, "%")
            .replace(/-and-/g, "\+").replace(/-n-/g, "&").replace(/-or-/g, "\/")
            .replace(/-/g, " ");
    }
    return preapredCategoryName;
}

export const getTestNameFromUrl = (url) => {
    let preapredTestName = undefined;
    let array = url.split("_");
    url = array[0];
    if (url) {
        preapredTestName = url.replace(/percent/g, "%")
            .replace(/-and-/g, "\+").replace(/-n-/g, "&").replace(/-or-/g, "\/")
            .replace(/-/g, " ");
    }
    return preapredTestName;
}

export const getCategoryIdFromUrl = (url) => {
    if (url === 'All')
        return 'All';
    let array = url.split("_labs_");
    if (array[1]) {
        return ("labs_" + array[1]).toUpperCase();
    }

}

export const getDepartmentNameFromUrl = (url) => {
    let preparedDepartmentName = undefined;
    let array = url.split("_");
    url = "";
    for (let eachpart in array) {
        if (eachpart != array.length - 1)
            url = url + array[eachpart]
    }
    if (url) {
        preparedDepartmentName = url.replace(/percent/g, "%")
            .replace(/-and-/g, "\+").replace(/-n-/g, "&")
            .replace(/-or-/g, "/").replace(/-/g, " ");
    }
    return preparedDepartmentName;
}
export const getDepartmentIdFromUrl = (url) => {
    let array = url.split("_");
    return array[array.length - 1];

}

export const getCategoryOrDepartmentNameFromUrl = (url) => {
    if (url) {
        return (url.includes("_labs_") || url.includes("_LABS_")) ? getCategoryNameForUrl(url) : getDepartmentNameFromUrl(url);
    }
}

export const getCategoryOrDepartmentIDFromUrl = (url) => {
    if (url) {
        return (url.includes("_labs_") || url.includes("_LABS_")) ? getCategoryIdFromUrl(url) : getDepartmentIdFromUrl(url);
    }
}


export const getFileName = (fileName) => {
    let decodedFileName = undefined;
    if (fileName) {
        if (fileName.indexOf("+") != -1) {
            let nameArray = fileName.split("\+");
            if (nameArray.length > 1) {
                fileName = nameArray[0] + "+" + nameArray[1];
            }
        }
        decodedFileName = fileName.replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-")
            .replace(/[^a-zA-Z0-9. ]/g, "-").replace(/-+/g, "-");
    }
    return decodedFileName;
}

export const getTestCodeFromUrl = (testNameId) => {
    let testCode = undefined;
    if (testNameId) {
        testCode = testNameId.substring(testNameId.length - 7);
    }
    return testCode;
}

export const getFileNameByType = (fileNameWithoutType, fileType) => {
    switch (fileType) {
        case "image/gif":
            return fileNameWithoutType + ".gif";
        case "image/jpeg":
            return fileNameWithoutType + ".jpeg"
        case "image/png":
            return fileNameWithoutType + ".png"
        case "application/pdf":
            return fileNameWithoutType + ".pdf"
        default:
            return fileNameWithoutType + ".jpg"
    }
}

export const getProductUrl = (productName, productId) => {
    let replacedNameString = undefined;
    if (productName) {
        if (productName.indexOf("+") != -1) {
            let nameArray = productName.split("\+");
            if (nameArray.length > 1) {
                productName = nameArray[0] + "+" + nameArray[1];
            }
        }
        replacedNameString = productName.replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-")
            .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    }
    return `product/${replacedNameString.toLowerCase()}_${productId.toLowerCase()}`;
}

export const getcategoryUrl = (categories) => {
    let url = "/categories/";
    let replacedNameString = undefined;
    categories.forEach((catId, catName) => {
        if (catName) {
            if (catName.indexOf("+") != -1) {
                let nameArray = catName.split("\+");
                if (nameArray.length > 1) {
                    catName = nameArray[0] + "+" + nameArray[1];
                }
            }
            replacedNameString = catName.replace(/%/g, "percent")
                .replace(/\+/g, "-and-").replace(/&/g, "-n-")
                .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
            url = `${url + replacedNameString.toLowerCase()}_${catId}/`
        }
    })
    return url.slice(0, -1);
}

export const getCatOrDeptIdFromUrl = (param) => {
    param = param.split("_");
    return param;
}
export const getCategoryIdFromParam = (param) => {
    let categoryId = "";
    if(validate.isNotEmpty(param)){
        let paramArray = param.split("_");
        categoryId = paramArray[paramArray.length - 1]; 
    }
    return categoryId;
}

export const getProductIdFromParam = (param) => {
    return param ? param.slice(-8).toUpperCase() : "";
}
export const sendLoginOtp = async (mobileNumber) => {
    return await new Promise((resolve, reject) => {
        if (validate.isNotEmpty(validate.mobileNumber(mobileNumber))) {
            reject("Invalid Mobile Number")
        }
        subscriptionService.customerGetOtp({ "MOBILE_NUMBER": mobileNumber }).then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                if (validate.isNotEmpty(data.responseData) || validate.isNotEmpty(data.dataObject)) {
                    resolve(mobileNumber)
                } else {
                    reject("Mobile Number Not registerd")
                }
            } else {
                reject(data.message)
            }
        }).catch(err => {
            console.log(err);
            reject("Something Went Wrong Please try again")
        })
    })
}

export const getDoctorsUrl = (topCategoryName, categoryName, categoryId) => {
    let doctorsSubCategoryUrl = "/doctorconsultation/";
    if (validate.isNotEmpty(topCategoryName) && validate.isNotEmpty(categoryName) && validate.isNotEmpty(categoryName)) {
        let preparedTopCategoryName = topCategoryName.split(" ");
        doctorsSubCategoryUrl = doctorsSubCategoryUrl + "doctors/" + preparedTopCategoryName[1].toLowerCase() + "_" + categoryName.toLowerCase().replace("&", "-n-").replace("%", "percent")
            .replace("+", "-and-").replace(" ", "-")
            .replace("/", "-or-") + "_" + categoryId.toLowerCase();
    }
    return doctorsSubCategoryUrl;
}

export const isProduction = () => {
    return process.env.API_URL.indexOf("www.medplusmart.com") > -1;
}

const decodeCategoryName = (urlName) => {
    if (urlName.includes("-n-")) {
        let urlNameArr = urlName.split("-n-");
        urlName = "";
        urlNameArr.map((each, index) => urlName += index + 1 === urlNameArr.length ? `${each}` : `${each} -n- `);
        urlName = urlName.trim();
    }
    return getNameFromUrl(urlName);
}

export const getCategoryNameFromParam = (param) => {
    return param ? decodeCategoryName(param).slice(0, -6).toLowerCase() : "";
}

export const getBlogUrl = (postId, title) => {
    return `/healthy-life/info/${postId}/${getDecodedURL(title).toLowerCase()}`;
}


export const getSubCategoryUrl = (categoryName, parentCategoryId, parentCategoryName, childCategoryId, childCategoryName) => {
    let preparedCatgeoryUrl = "/drugsInfo/";
    let parentCategoryIdArray = parentCategoryId.split("_");
    let childCategoryIdArray = childCategoryId.split("_");
    let parentCategoryNameId = getURLCategoryName(parentCategoryName, parentCategoryIdArray[1]);
    let childCategoryNameId = getURLCategoryName(childCategoryName, childCategoryIdArray[1]);
    preparedCatgeoryUrl = preparedCatgeoryUrl.concat(categoryName.toLowerCase()).concat("/").concat(parentCategoryNameId).concat("/").concat(childCategoryNameId);

    return preparedCatgeoryUrl;

}

export const getURLCategoryName = (categoryName, categoryId) => {
    let preparedCategoryNameWithId = undefined;
    let replacedNameString = null;
    if (validate.isNotEmpty(categoryName)) {
        if (categoryName.includes("+")) {
            let nameArray = categoryName.split("\\+");
            if (nameArray.length > 1) {
                categoryName = nameArray[0] + "+" + nameArray[1];
            }
        }
        replacedNameString = categoryName.replaceAll("%", "percent")
            .replaceAll("\\+", "-and-").replaceAll("&", "-n-")
            .replaceAll("[^a-zA-Z0-9]", "-").replaceAll(" ", "-").replaceAll(",", "-").replaceAll("-+", "-");

    }
    if (validate.isNotEmpty(categoryId)) {
        preparedCategoryNameWithId = replacedNameString.concat("_").concat(categoryId.trim()).toLowerCase();
    }
    return preparedCategoryNameWithId; 
}

export const isDrugSchduleX = (product) => {
    if (Validate().isEmpty(product) || Validate().isEmpty(product.drugSchedule)) {
        return false;
    }
    let isDrugSchduleX = false;
    product.drugSchedule.map(each => {
        if (each == 'X') {
            isDrugSchduleX = true;
        }
    })
    return isDrugSchduleX;
}

export const setGetNotifiedLocationConfirmationInCookie = () => {
    var now = new Date();
    var time = now.getTime();
    time += 60 * 60 * 1000;
    now.setTime(time);
    document.cookie = "getNotifyLocationConfirmed=true;path=/;expires=" + now.toUTCString() + ";";
}

export const getProductRedirectUrl = (productId = null, productName = null, topCategoryNameId = null, parentCategoryNameId = null, currentCategoryNameId = null) => {
    if(validate.isEmpty(productName) || validate.isEmpty(productId)) {
        return "/pageNotFound"
    }
    let urlToRedirect = "/product";
    if(validate.isNotEmpty(topCategoryNameId)) {
        urlToRedirect += "/" + topCategoryNameId;
    }
    if(validate.isNotEmpty(parentCategoryNameId)) {
        urlToRedirect += "/" + parentCategoryNameId;
    }
    if(validate.isNotEmpty(currentCategoryNameId)) {
        urlToRedirect += "/" + currentCategoryNameId;
    }
    let replacedNameString = "";
    if (productName) {
        if (productName.indexOf("+") != -1) {
            let nameArray = productName.split("\+");
            if (nameArray.length > 1) {
                productName = nameArray[0] + "+" + nameArray[1];
            }
        }
        replacedNameString = productName.replace(/%/g, "percent").replace(/\+/g, "-and-").replace(/&/g, "-n-").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    }
    return `${urlToRedirect}/${replacedNameString.toLowerCase()}_${productId.toLowerCase()}`;
}

export const getCompositionProductUrl = (compositionName, compositionId, productName, productId) => {
    const processString = (input) => {
        return input ? input.toLowerCase().replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-")
            .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-") : undefined;
    };
    let replacedNameString = processString(productName);
    return `/kym/product/${prepareCompositionName(compositionName)}_${compositionId}/${replacedNameString.toLowerCase()}_${productId.toLowerCase()}`;
};

export const getCompositionNameAndIdFromUrl = (compositionNameId) => {
    let [compositionName, compositionId] = compositionNameId.split("_");
    compositionName = compositionName.replace(/&frasl;/g, "/").replace(/percent/g, "%").replace(/-/g, " ");
    return [compositionName, compositionId];
}

export const prepareCompositionName = (compositionName) => {
    let compositions = [];
		if(compositionName != null && compositionName.length > 0){
			compositions = compositionName.split("+"); 
		}
		if(compositions.length > 1){
			compositionName = compositions[0] + "+" + compositions[1];
		}
		let pattern = new RegExp("/", "g");
		return compositionName.replace(pattern,'&frasl;').replace(/%/gi,'percent').replace(/ /g,'-');
}

export const getCompositionNameForUrl = (id, name, isKym) => {
	return (isKym ? "/kym/composition/" : "/compositionProducts/") + prepareCompositionName(name) + "/" + id;
}

export const fixUrl = (oldUrl,builtUrl) => {
    if(oldUrl!=builtUrl){
        window.history.replaceState(null,'', builtUrl);
    }
}

export const popOverPlacement = (cardIndexplace)=>{
    if(window.screen.width>1280 &&  window.screen.width<=1680){
       return cardIndexplace % 4  ? "right" : "left";
    }
    else if(window.screen.width<=1280){
        return cardIndexplace % 3  ? "right" : "left";
    }
    else if(window.screen.width>1680){
        return cardIndexplace % 5  ? "right" : "left";
    }
}
export const getDisplayableAge = (dateString) => {
    if (validate.isEmpty(dateString)) {
        return "";
    }
    let age = DateValidator().getDateDifference(dateString);
    if (age.years == 0 && age.months == 0 ) {
        return age.days + " day(s)";
    } else if (age.years == 0) {
        return age.months + " month(s)";
    } else {
        return age.years + " years"
    }
}

export const isMac = () => {
    if(typeof window !== 'undefined'){
        return window?.navigator?.platform?.indexOf('Mac') > -1;
    }
    else {
        return typeof process !='undefined' && process.platform=='darwin';
    }
}

export const getDisplayableAgeUnits = (ageType) => {
    switch (ageType){
        case "M": return "month(s)";
        case "D": return "day(s)";
        default : return "years"
    }
}

export const removeCustomerDetailsFromRedux = () => {
    LocalDB.removeValue("customerId");
    LocalDB.removeValue("SERVICE_MOBILE_NUMBER");
    LocalDB.removeValue("MOBILE_NUMBER");
    store.dispatch({type : RESET_USER_INFO})
    store.dispatch({type: RESET_USER_CONTACT_DETAILS});
}

export const getDetailsForFCM = (customer,locality) => {
  
    var customerID = customer ? (customer.userLoginId ? customer.userLoginId : null) : null;
    var mobileNumber = customer ? (customer.loginThrough ? customer.loginThrough : null) : null;
    var country = 'INDIA';
    var state = (locality && Object.keys(locality).length > 0) ? (locality.state ? locality.state : (locality.state_s ? locality.state_s : null) ) : "Telangana";
    var city = (locality && Object.keys(locality).length > 0) ?((locality.regionCode && locality.regionCode.length >=3)? locality.regionCode.slice(-3):(locality.city?locality.city:null)):"HYD";
    return {'customerId':customerID,'mobileNo':mobileNumber,'city':city,'state':state,'country':country}
}

export const checkIfCurrentDateIsBetweenGivenDates = (startDate, endDate) => {
    if(validate.isEmpty(startDate) || validate.isEmpty(endDate)){
        return null;
    }
    const startingDate = moment(new Date(startDate));
    const endingDate = moment(new Date(endDate));
    const currentDate = moment(new Date());
    return (currentDate.isBetween(startingDate, endingDate) || currentDate.isSame(startingDate) || currentDate.isSame(endingDate));
   
}

export const getPlanType = (plan) => {
    return SubscriptionPlanTypes[plan.type.type];
}