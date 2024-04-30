import {getNameFromUrl, getDecodedURL} from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";
import { WalkIn, Telemedicine, getTimeLeftForConsultation, getSlotDuration } from "../constants/DoctorConsultationConstants";

export const getIdFromTheUrlValue = (value)=>{
    if(!value)
        return;
    let splitValue = value.split("_");
    if(splitValue.length > 2)
        return splitValue[splitValue.length-1];
}

export const prepareCartSummaryObjFromDoctorConsultation = (doctorConsultationObj) =>{
    let cartSummaryObj = {};
    if(Validate().isEmpty(doctorConsultationObj)) {
        return cartSummaryObj;
    }
    cartSummaryObj = {
        paymentType : doctorConsultationObj.paymentType,
        totalPrice :doctorConsultationObj.totalPrice,
        totalDiscount : doctorConsultationObj.totalDiscount,
        grandTotal :doctorConsultationObj.grandTotal,
        couponCode :doctorConsultationObj.couponCode,
        paymentTypeCode :doctorConsultationObj.paymentTypeCode
    }
    return cartSummaryObj;
    
}
export const getNameFromUrlValue = (value)=>{
     if(!value)
        return;
    let splitValue = value.split("_");
    if(splitValue.length > 2){
        let paramValue =splitValue[1];
        try{
            if(paramValue &&paramValue.includes("-n-")){
                let paramNameArray = paramValue.split("-n-");
                paramValue = "";
                paramNameArray.map((each, index) => paramValue += index+1 === paramNameArray.length ? `${each}` : `${each} -n- `);
                paramValue = paramValue.trim();
            }
        }catch(err){
            console.log(err);
        }
        let nameFromUrl = getNameFromUrl(paramValue);
        if(!nameFromUrl)
            return;
        return nameFromUrl.replace(/\+/g, " and ")
    }
}

export const getClinicIdFromUrlValue = (value) => {
    if(!value)
    return;
    let splitValue = value.split("_");
    if(splitValue.length > 2)
        return splitValue[splitValue.length-1];
}

export const getPageTypeFromUrlValue = (value)=>{
    if(!value)
        return;
    let splitValue = value.split("_");
    if(splitValue.length > 2)
        return splitValue[0];
}


export const prepareSeachStringParam=(id, pageType, nameOfType)=>{
    let pageName = getDecodedURL(nameOfType);
    pageName = pageName ? pageName.toLowerCase() : "";
    if (pageType) {
        return `${pageType}_${pageName}_${id}`;
    }
    return `${id}`;
}


export const getDisplayConsultation= (type)=>{
    switch(type){
      case WalkIn: return "Clinic Consultation";
      case Telemedicine: return "Online Consultation";
      default : return "";
    }
}

export const getDisplayStatus = (status, consultationInfo) => {
    switch (status) {
        case "ORDER_STATUS_CREATED": return getDisplayMessageForProcessing(consultationInfo);
        case "ORDER_STATUS_APPROVED": return "Confirmed";
        case "ORDER_STATUS_CANCEL": return "Cancelled";
        case "ORDER_STATUS_PROCESSING": return "In Progress";
        case "ORDER_STATUS_READY_FOR_PRINT": return "Completed";
        case "ORDER_STATUS_PATIENT_ACKNOWLEDGED": return "Acknowledged"
    }
}

export const getDisplayMessageForProcessing = (consultation) => {
    const timeSlot = consultation.consultationInfo.timeSlot;
    const timeLeftForConsultation = getTimeLeftForConsultation(timeSlot);
    const slotDuration = getSlotDuration(timeSlot);
    if ((timeLeftForConsultation / 60) + slotDuration < 0) {
        return "Expired";
    }
    return "Payment Processing";
}

export const statusColour = (consultation) =>{
    let statusInfo = consultation.statusCode;

    switch(statusInfo){
        case "I" : return "text-orange font-weight-bold";
        case "C" : return "text-brand font-weight-bold";
        case "F" : return "text-brand font-weight-bold";
        default : return "text-success font-weight-bold";
    }
}