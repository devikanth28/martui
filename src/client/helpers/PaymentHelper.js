import { useSelector } from "react-redux";
import LocalDB from "../DataBase/LocalDB";
import Validate from "./Validate";

const validate = Validate();

export const preparePaymentFormData = (data, redirectUrl) => {
    var inputArray = [];
    var formValues = {
        "formId": "paymentForm",
        "formAction": redirectUrl,
        "formMethod": "post",
        "formStyle": { display: 'none' }
    };
    inputArray.push({ "name": "tokenId", "value": LocalDB.getValue("SESSIONID") });
    inputArray.push({ "name": "instrument", "value": data?.paymentMode });
    inputArray.push({ "name": "MODE", "value": data?.paymentMode });
    inputArray.push({ "name": "orderID", "value": data?.retryOrderId });
    inputArray.push({ "name": "referenceId", "value": data?.retryOrderId });
    inputArray.push({ "name": "amount", "value": parseFloat(data?.totalAmount).toFixed(2) });
    inputArray.push({ "name": "company", "value": "optival" });
    inputArray.push({ "name": "COMPANY", "value": "optival" });
    inputArray.push({ "name": "mobileNo", "value": data.mobileNo });
    inputArray.push({ "name": "pincode", "value": data?.pincode });
    inputArray.push({ "name": "userId", "value": data.customerId });
    inputArray.push({ "name": "customerId", "value": data.customerId });
    inputArray.push({ "name": "state", "value": data?.state });
    inputArray.push({ "name": "city", "value": data?.city });
    inputArray.push({ "name": "customerName", "value": data.name });
    inputArray.push({ "name": "country", "value": "IND" });
    inputArray.push({ "name": "address", "value": data?.combination });
    return { ...formValues, inputArray: inputArray };
}

export const isUserLoggedIn = () => {
    const userDetails = useSelector(state => state.userInfo);
    if(validate.isEmpty(userDetails) || validate.isEmpty(userDetails?.userInfo) || validate.isEmpty(userDetails?.userInfo?.medplusId)) {
        return false;
    }
    return true;
}