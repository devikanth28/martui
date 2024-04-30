import dateFormat from "dateformat";
import Validate from "../../helpers/Validate";
export const UrlTypeConstants = {
    "online": "online_consultation",
    "walkin": "walk_in",
    "symptoms": "symptoms",
    "specialization": "specialization",
    "clinics": "clinics"
}

export const CHECKOUT_TYPE_VISIT_ONLINE = "CHECKOUT_TYPE_VISIT_ONLINE"; // NORMAL_CHECKOUT_WHERE_VISIT_TYPE_IS_ONLINE
export const CHECKOUT_TYPE_VISIT_WALK_IN = "CHECKOUT_TYPE_VISIT_WALK_IN"; // NORMAL_CHECKOUT_WHERE_VISIT_TYPE_IS_WALK_IN
export const CHECKOUT_TYPE_VISIT_UNDEFINED = "CHECKOUT_TYPE_VISIT_UNDEFINED"; // CHECKOUT_WHERE_VISIT_TYPE_IS_NOT_DEFINED
export const CHECKOUT_TYPE_CLINIC_SEARCH = "CHECKOUT_TYPE_CLINIC_SEARCH"; // CHECKOUT_FROM_CLINIC_PAGE

export const ErrorMessagesMap = {
    "Invalid_PaymentType": "Invalid Payment",
    "Invalid_DoctorName": 'Invalid Doctor',
    "Invalid_TestId": "Unabe to process request",
    "SLOT_NOT_AVAILABLE": "Slot not available",
    "INVALID_CAPTCHA": "Invalid Captcha"
}

export const WalkIn = "WALKIN";
export const Telemedicine = "TELEMEDICINE";

export const VISIT_TYPE_ONLINE = "T";
export const VISIT_TYPE_WALK_IN = "W";
export const VISIT_TYPE_BOTH = "B";

export const CATEGORY_LIST_TYPE_SYMPTOMS = "SYMPTOMS_LIST";
export const CATEGORY_LIST_TYPE_SPECIALIZATIONS = "SPECIALIZATIONS_LIST";

export const getConsultationType = (visitType) => {
    if (visitType && visitType == UrlTypeConstants.online) {
        return VISIT_TYPE_ONLINE;
    } else if (visitType && visitType == UrlTypeConstants.walkin) {
        return VISIT_TYPE_WALK_IN;
    }
    return '';
}


export const getConsultationString = (visitType) => {
    if (visitType && visitType == VISIT_TYPE_ONLINE) {
        return UrlTypeConstants.online;
    } else if (visitType && visitType == VISIT_TYPE_WALK_IN) {
        return UrlTypeConstants.walkin;
    }
    return '';
}

export const getAvailabilityTime = (slot) => {
    try {
        let days = slot.startInDays;
        if (days > 1) {
            return `${getDateFormat(slot.displaySlotDate)} | ${slot.startTime12Hr}`;
        } else if (days == 1) {
            return "Tomorrow";
        } else {
            let minutes = slot.startInMinutes;
            if (minutes > 59) {
                var hours = Math.trunc(minutes / 60);
                var mins = minutes - (hours * 60);
                return `in next ${hours} ${hours > 1 ? `hrs` : `hr`} ${mins > 0 ? `${mins} ${mins > 1 ? `mins` : `min`}` : ``}`
            } else if (minutes > 1) {
                return `in next ${minutes} mins`;
            } else {
                return "Now";
            }
        }
    } catch (err) {
        return '';
    }
}

export const getDateFormat = (dateObject) => {
    try {
        let dateStr = dateObject.replace(/-/g, "/");
        const date = new Date(dateStr);
        let formattedDate = dateFormat(date, "dd mmm, yyyy");
        if (formattedDate !== "Today" && formattedDate !== "Tomorrow") {
            formattedDate = dateFormat(new Date(date), "dd mmm, yyyy");
        }
        return formattedDate;
    } catch (err) {
        console.log(err);
    }
    return "";
}

export const getDisplayTime = (slot) => {
    try {
        let startTime = slot.startTime12Hr;
        let endTime = slot.endTime12Hr;
        return `${startTime} - ${endTime}`;
    } catch (err) {
        return '';
    }
}

export const getTimeLeftForConsultation = (slot) => {
    try {
        let startTime = slot.startTime24Hr;
        let slotDate = slot.displaySlotDate.replace(/-/g, "/");
        let date = new Date(slotDate);
        let dateStr = dateFormat(date, "yyyy/mm/dd");
        let startTimeDate = new Date();
        let endTimeDate = new Date(`${dateStr} ${startTime}`);
        let difference = endTimeDate.getTime() - startTimeDate.getTime();
        return (difference / 1000);
    } catch (err) {
        return undefined;
    }
}

export const getSlotDuration = (slot) => {
    try {
        let startTime = slot.startTime24Hr;
        let endTime = slot.endTime24Hr;
        let slotDate = slot.displaySlotDate.replace(/-/g, "/");
        let date = new Date(slotDate);
        let dateStr = dateFormat(date, "yyyy/mm/dd");
        let startTimeDate = new Date(`${dateStr} ${startTime}`);
        let endTimeDate = new Date(`${dateStr} ${endTime}`);
        let difference = endTimeDate.getTime() - startTimeDate.getTime();
        return (difference / (1000 * 60));
    } catch (err) {
        return undefined;
    }
}

export const prepareCategories = (categoryType, ...categoryList) => {
    const resultCategories = [];
    if (categoryType == CATEGORY_LIST_TYPE_SPECIALIZATIONS) {
        categoryList.forEach(element => {
            let obj = {};
            obj['name'] = element.displayName;
            obj['id'] = element.specialityid;
            resultCategories.push(obj)
        });
    } else if (categoryType == CATEGORY_LIST_TYPE_SYMPTOMS) {
        categoryList.forEach(element => {
            let obj = {};
            obj['name'] = element.displayName;
            obj['id'] = element.symptomId;
            resultCategories.push(obj)
        });
    }
    return resultCategories;
}


export const sortAndFilterResponseConst = {
    SPECIALITIES: "SPECIALITY",
    GENDERS: "GENDER",
    ONLINE_STATUS: "ONLINE_STATUS",
    CONSULTATION_TYPES: "CONSULTATION_TYPE",
    SORT: "SORT",
}

export const sortAndFilterNamesToShow = {
    [sortAndFilterResponseConst.SPECIALITIES] : "Specialization",
    [sortAndFilterResponseConst.GENDERS] : "Gender",
    [sortAndFilterResponseConst.ONLINE_STATUS] : "Online Status",
    [sortAndFilterResponseConst.CONSULTATION_TYPES] : "Consultation Type",
    [sortAndFilterResponseConst.SORT] : "Sort"
}

export const sortAndFilterRequestConst = {
    SPECIALITIES_IDS: "specialitiesIds",
    GENDER: "gender",
    ONLINE_STATUS: "online",
    CONSULTATION_TYPE: "consultationType",
    SORT: "sort",
}

let initialFiltersAndSort = {
    [sortAndFilterResponseConst.SPECIALITIES]: [],
    [sortAndFilterResponseConst.GENDERS]: "",
    [sortAndFilterResponseConst.ONLINE_STATUS]: "",
    [sortAndFilterResponseConst.CONSULTATION_TYPES]: "",
    [sortAndFilterResponseConst.SORT]: ""
}

export const getSelectedFiltersAndSortFromUrl = (sortAndFilterString) => {
    if (Validate().isEmpty(sortAndFilterString)) {
        return initialFiltersAndSort;
    }
    if (typeof atob === "undefined") {
        return initialFiltersAndSort;
    }
    try {
        let str = atob(sortAndFilterString);
        let strArr = str.split("::");
        let initialFiltersAndSortFromUrl = { ...initialFiltersAndSort };
        strArr.map(each => {
            if (each.indexOf(sortAndFilterRequestConst.SPECIALITIES_IDS) !== -1) {
                let value = getValueFromString(each);
                if (value) {
                    let specializations = value.split(",");
                    initialFiltersAndSortFromUrl[sortAndFilterResponseConst.SPECIALITIES] = [...specializations];
                }
            } else if (each.indexOf(sortAndFilterRequestConst.GENDER) !== -1) {
                let value = getValueFromString(each);
                if (value) {
                    initialFiltersAndSortFromUrl[sortAndFilterResponseConst.GENDERS] = value;
                }
            } else if (each.indexOf(sortAndFilterRequestConst.ONLINE_STATUS) !== -1) {
                let value = getValueFromString(each);
                if (value) {
                    initialFiltersAndSortFromUrl[sortAndFilterResponseConst.ONLINE_STATUS] = value;
                }
            } else if (each.indexOf(sortAndFilterRequestConst.CONSULTATION_TYPE) !== -1) {
                let value = getValueFromString(each);
                if (value) {
                    initialFiltersAndSortFromUrl[sortAndFilterResponseConst.CONSULTATION_TYPES] = value;
                }
            } else if (each.indexOf(sortAndFilterRequestConst.SORT) !== -1) {
                let value = getValueFromString(each);
                if (value) {
                    initialFiltersAndSortFromUrl[sortAndFilterResponseConst.SORT] = value;
                }
            }
        })
        return initialFiltersAndSortFromUrl;
    }
    catch (err) {
        return initialFiltersAndSort;
    }
}

const getValueFromString = (each) => {
    if (!each || each.split("=").length != 2 || Validate().isEmpty(each.split("=")[0]) || Validate().isEmpty(each.split("=")[1])) {
        return undefined;
    }
    return each.split("=")[1];
}

export const getButtonClass = (btnType) => {
    switch (btnType) {
        case "CANCEL":
            return "brand-secondary rounded-pill";
        case "REDIRECTION":
            return "btn-brand-gradient rounded-pill";
        case "TIMER":
        case "CONSULTATION_END":
            return "btn-outline-dark rounded-pill";
        case "DOCTOR_JOINED_CALL":
        case "PATIENT_JOINED_CALL":
            return "btn-success";
        default:
            return "px-4"
    }
}

export const isVaildConsultationType = (visitType) => {
    return (visitType && (visitType == UrlTypeConstants.online || visitType == UrlTypeConstants.walkin));
}

export const isVaildCategoryType = (categoryType) => {
    return (categoryType && (categoryType == UrlTypeConstants.symptoms || categoryType == UrlTypeConstants.specialization));
}

export const checkIfTimerRequired = (consultations) => {
    let isTimerRequired = false;
    consultations.every(consultation => {
        const consultationInfo = consultation && consultation.consultationInfo;
        const timeSlot = consultationInfo && consultationInfo.timeSlot;
        const startInMinutes = timeSlot.startInMinutes;
        if (Validate().isNotEmpty(startInMinutes) && startInMinutes <= 360) {
            isTimerRequired = true;
            return false;
        }
        return true;
    });
    return isTimerRequired;
}