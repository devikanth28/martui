import Validate from './Validate';

export const getLabOrderDisplayStatus = (status, isItemStatus, gateWayStatus) => {
    const labOrderStatus = {
        "I":"Created",
        "A":"Approved",
        "E":"Assigned to Collection Center",
        "G":"Assigned to Agent",
        "S":"Sample Collected",
        "U":"Unable to Collect Sample",
        "T":"Sample Accepted",
        "R":"Sample Rejected",
        "P":"Processing",
        "D":"Ready to Print",
        "C":"Cancelled",
        "X":"Force Cancelled",
        "K": "Acknowledged"
    };
    const displayOrderStatus = {
        "I":"Created",
        "A":"Approved",
        "E":"Processing",
        "G":"Processing",
        "S":"Processing",
        "U":"Processing",
        "T":"Processing",
        "R":"Processing",
        "P":"Processing",
        "D":"Completed",
        "C":"Cancelled",
        "X":"Cancelled",
        "K":"Acknowledged"
    };
    /* const createdStatus = ["I"];
    const approvedStatus = ["A"];
    const processingStatus = ["E", "G", "S", "U", "T", "R", "P"];
    const completedStatus = ["D"];
    const cancelledStatus = ["C", "X"];
    const acknowledgedStatus = ["K"]; */
    if(Validate().isNotEmpty(status) && Object.keys(labOrderStatus).includes(status)) {
        if(isItemStatus) {
            return labOrderStatus[status];
        }
        if(Validate().isNotEmpty(gateWayStatus)){
            if(gateWayStatus==="I" && (status !="C" && status !="X")){
                return "Payment Processing";
            }
            if(gateWayStatus === "F" && (status !="C" && status !="X")){
                return "Payment Failed";
            }
        }
        return displayOrderStatus[status];
    } else {
        return status;
    }
}

export const getLabOrderPaymentType = (paymentType) => {
    const labOrderPaymentTypes = {
        "COSC":"Cash on Collection",
        "PAY_ONLINE":"Online"
    };
    if(Validate().isNotEmpty(paymentType) && Object.keys(labOrderPaymentTypes).includes(paymentType)) {
        return labOrderPaymentTypes[paymentType];
    } else {
        return paymentType;
    }
}
export const getLabOrderPaymentTypeFromEnum = (paymentType) => {
    const labOrderPaymentTypes = {
        "COSC":"C",
        "PAY_ONLINE":"O"
    };
    if(Validate().isNotEmpty(paymentType) && Object.keys(labOrderPaymentTypes).includes(paymentType)) {
        return labOrderPaymentTypes[paymentType];
    } else {
        return paymentType;
    }
}

export const getLabOrderVisitType = (visitType) => {
    const labOrderVisitTypes = {
        "HOME":"Home Sample Pickup",
        "LAB":"Store Sample Collection"
    };
    if(Validate().isNotEmpty(visitType) && Object.keys(labOrderVisitTypes).includes(visitType)) {
        return labOrderVisitTypes[visitType];
    } else {
        return visitType;
    }
}

export const isLabOrderStatusAllowedToDisplayAgent = (labOrderStatus) => {
    const labOrderStatusAllowedToDisplayAgent = ["G", "U", "R"];
    return (Validate().isNotEmpty(labOrderStatus) && labOrderStatusAllowedToDisplayAgent.includes(labOrderStatus));
}

export const getPaymentDisplayMode = (paymentMode) => {
    const paymentModes = {
        "PPI":"Paytm Wallet",
        "PPE":"PhonePe",
        "MK":"MobiKwik",
        "JM":"JioMoney",
        "CC":"Credit Card",
        "DC":"Debit Card",
        "NB":"Net Banking",
        "cod":"Cash On delivery",
        "PPES":"PhonePe",
        "cash":"Cash",
        "MDX": "MDx Wallet"
    };
    if(Validate().isNotEmpty(paymentMode) && Object.keys(paymentModes).includes(paymentMode)) {
        return paymentModes[paymentMode];
    } else {
        return paymentMode;
    }
}

export const getPaymentDisplayStatus = (paymentStatus) => {
    const paymentStatusList = {
        "REFUND_DONE":"Refund Done",
        "PAYMENT_COMPLETE":"Payment Completed",
        "PAYMENT_PARTIAL":"Partial Payment",
        "PAYMENT_DONE":"Payment Done"
    };
    if(Validate().isNotEmpty(paymentStatus) && Object.keys(paymentStatusList).includes(paymentStatus)) {
        return paymentStatusList[paymentStatus];
    } else {
        return paymentStatus;
    }
}

export const isLabOrderStatusAllowedForCancel = (labOrderStatus) => {
    const labOrderStatusAllowedForCancel = ["A", "E", "G", "I", "R", "U"];
    return (Validate().isNotEmpty(labOrderStatus) && labOrderStatusAllowedForCancel.includes(labOrderStatus));
}

export const isNoteAllowedToDisplay = (labOrderStatus) => {
    const labOrderStatusAllowedForNote = ["I", "E", "A", "G"];
    return (Validate().isNotEmpty(labOrderStatus) && labOrderStatusAllowedForNote.includes(labOrderStatus));
}
