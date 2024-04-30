export const VISIT_TYPE_HOME = "1";
export const VISIT_TYPE_LAB = "2";
export const VISIT_TYPE_BOTH = "3";
export const DIAGNOSTICS_URL_PREFIX = "/diagnostics"; //any change in this constant you need to do the same in mart-common-components for seo helper
export const DIAGNOSTICS_HOME = "diagnostics";

export const LabVisitTypeLabel = {
    [VISIT_TYPE_HOME] : "Home Sample Pickup",
    [VISIT_TYPE_LAB ]: "Sample Collection Center"
}

export const LabVisitTypeSubLabel = {
    [VISIT_TYPE_HOME] : "Patient Address",
    [VISIT_TYPE_LAB] : "Collection Center Address"
}

export const Gender = {
    "M" : "Male",
    "F" : "Female",
    "O" : "Others"
}


export const getServiceOption = (serviceOption) => {
    if (serviceOption === 'WALKIN_TO_LAB') {
        return "Lab Walk-in";
    }
    if (serviceOption === 'HOME_COLLECTION') {
        return "Home collection";
    }
    if (serviceOption === 'HOME_COLLECTION_AND_WALKIN') {
        return "Home collection & Lab Walk-in";
    }
    if (serviceOption === 'TELE_MEDICINE') {
        return "Tele Medicine";
    }
    if (serviceOption === 'WALKIN') {
        return "Lab Walk-in";
    }
}
