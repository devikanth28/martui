export const BannerPageValues = {
    "CORPORATE_PLANS" : "CORPORATEPLANS",
    "HOME" : "MEMBERSHIPHOME",
    "PLAN_DETAIL" : "PLAN_DETAIL",
    "REQUEST_CORPORATE" : "REQUESTCORPORATE",
    "SEARCH_CORPORATE" : "SEARCHCORPORATE"
}

export const BannerCorporatePlans = "CORPORATE_PLANS";
export const BannerHomePage = "HOME";
export const BannerPlanDetail = "PLAN_DETAIL";
export const BannerRequestCorporate = "REQUEST_CORPORATE";
export const BannerSearchCorporate = "SEARCH_CORPORATE";

export const MEDPLUS_ADVANTAGE_HOME = '/medplusadvantage';
export const MEDPLUS_ADVANTAGE_URL_PREFIX = '/medplusadvantage'; //any change in this constant you need to do the same in mart-common-components for seo helper

export const PhotoIdTypeName = {
    AADHAAR_CARD : "Aadhaar Card",
    BIRTH_CERTIFICATE : "Birth Certificate",
    DRIVING_LICENSE : "Driving License",
    PENSION_PASSBOOK : "Pension Passbook",
    NPR_SMART_CARD : "NPR Smart Card",
    PASSPORT : "Passport",
    PAN_CARD : "PAN Card",
    SCHOOL_LEAVING_CERTIFICATE : "School Leaving Certificate",
    VOTER_ID : "Voter ID Card"
}

export const  photoIdInputMaxLength = {
	    "AADHAAR_CARD" : 12,
	    "DRIVING_LICENSE" : 16,
	    "PAN_CARD" : 10,
	    "PASSPORT" : 8,
	    "PENSION_PASSBOOK" : 12,
	    "NPR_SMART_CARD" : 16,
	    "VOTER_ID" : 10
}
    
export const SubscriptionBenefitType = {
    PHARMA: 'PHARMACY',
    HEALTHCARE: 'HEALTH_CARE',
}
export const SubscriptionPlanTypes = {
    INDIVIDUAL: "I",
    ORGANIZATION: "O",
    INDIVIDUAL_COMBO: "IC",
    ORGANIZATION_COMBO: "OC"
}


export const getPlanUrlStringParam=(planName, planId)=>{
    let replacedNameString = undefined;
    if (planName) {
        if (planName.indexOf("+") != -1) {
            let nameArray = planName.split("\+");
            if (nameArray.length > 1) {
                productName = planName[0] + "+" + planName[1];
            }
        }
        replacedNameString = planName.replace(/%/g, "percent")
            .replace(/\+/g, "-and-").replace(/&/g, "-n-")
            .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    }
    return `${replacedNameString.toLowerCase()}_${planId}`;
}

export const getPlanNameFromUrl = (value) => {
    if(!value)
        return;
    let splitValue = value.split("_");
    if(splitValue.length == 2){
        const urlName = splitValue[0];
        if(urlName) {
            const replaceNameString = urlName.replace(/percent/g, "%")
                    .replace(/-and-/g, "\+").replace(/-n-/g, "&")
                    .replace(/-/g, " ");
            return replaceNameString;
        } 
    }     
}

export const getPlanIdFromUrl = (value)=>{
    if(!value)
        return;
    let splitValue = value.split("_");
    if(splitValue.length == 2)
        return splitValue[1];
}

export const getBenefitTypeKey = (benefitType) => {
    switch (benefitType) {
        case SubscriptionBenefitType.HEALTHCARE: return "H";
        case SubscriptionBenefitType.PHARMA: return "P";
        default: return "C"
    }
}