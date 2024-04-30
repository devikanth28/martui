import serverRequest from "../axios";
import { PAYMENT_CONFIG } from "../components/UnauthPayments/constants/PaymentConfig";

export default function PaymentService() {

    function getPaymentOrderDetails(obj){
        return serverRequest(PAYMENT_CONFIG.API.GET_PAYMENT_ORDER_DETAILS.HEADER.method, obj, PAYMENT_CONFIG.API.GET_PAYMENT_ORDER_DETAILS.PATH);
    }

    return Object.freeze({getPaymentOrderDetails});
}
