import { getDisplayStatus, statusColour } from "../../../DoctorConsultation/helper/DoctorConsulationHelper"
import { getLabOrderDisplayStatus } from "../../../helpers/LabOrderHelper"

export const getChatHeaderData = (chatType, chatHeaderData) => {
    
    switch(chatType){
        case "LAB_ORDER" : 
            return {
                orderId: chatHeaderData.orderId,
                displayOrderId: chatHeaderData.displayOrderId,
                status: getLabOrderDisplayStatus(chatHeaderData.status, false, chatHeaderData.gateWayStatus),
                statusClass: (chatHeaderData.status == "C" || chatHeaderData.gateWayStatus== "F") ? "text-brand" : chatHeaderData.gateWayStatus == "I" ? "text-orange" : "text-success",
                amount: parseFloat(chatHeaderData.totalAmount).toFixed(2)
            }
        case "MART_ORDER" :
        case "MART_ORDER_HEADER" :
            return {
                orderId: chatHeaderData.orderId,
                displayOrderId: chatHeaderData.displayOrderId,
                status: chatType === "MART_ORDER_HEADER" ? chatHeaderData.displayStatus : chatHeaderData.status,
                statusClass: getMartStatusClass(chatHeaderData.status),
                amount: parseFloat(chatHeaderData.orderAmount).toFixed(2)
            }
        case "DOCTOR_CONSULTATION_ORDER" :
            return {
                orderId: chatHeaderData.orderId,
                displayOrderId: chatHeaderData.displayOrderId,
                status: getDisplayStatus(chatHeaderData.status, chatHeaderData),
                statusClass: statusColour(chatHeaderData),
                amount: parseFloat(chatHeaderData.doctorServiceInfo.price).toFixed(2)
            }
    }
}

export const getMartStatusClass = (status) =>{
    switch(status) {
    case "I":
        return "text-orange";
    case "A":
    case "M":
    case "P":
    case "SI":
    case "D":
    case "T":
    case "E":
    case "R":
    case "SD":
    case "SR":
    case "SW":
    case "SA":
    case "SC":
    case "SE":
    case "SF":
    case "SU":
    case "SO":
    case "NM":
    case "--":
            return"text-success";
    case "C":
    case "F":
    case "X":
            return "text-brand";
    default:
        return "text-success";
    }
}