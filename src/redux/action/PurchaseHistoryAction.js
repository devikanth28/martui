import { useSelector, useDispatch } from 'react-redux';
import { SAVE_PURCHASE_HISTORY, CLEAR_PURCHASE_HISTORY, SAVE_NON_PERSISTENT_PURCHASE_HISTORY,SAVE_NORMAL_ORDER_PARAMETERS, SAVE_CANCELED_ORDER_PARAMETERS, ORDER_HEADER_FOR_VIEW} from '../reducer/PurchaseHistoryReducer';
import Validate from '../../client/helpers/Validate';
import moment from "moment";

export default function PurchaseHistoryAction() {

    const validate = Validate();
    const dispatch = useDispatch();
    let purchaseHistory = useSelector(state => state.purchaseHistory);

    function savePurchaseHistory(purchaseHistoryData) {
        return dispatch({type: SAVE_PURCHASE_HISTORY, data: purchaseHistoryData});
    }

    function saveNonPersistentPurchaseHistory(purchaseHistoryData) {
        return dispatch({type: SAVE_NON_PERSISTENT_PURCHASE_HISTORY, data: purchaseHistoryData});
    }

    function getPurchaseHistory() {
        return  useSelector(state => state.purchaseHistory);
    }

    function clearPurchaseHistory() {
        return dispatch({type: CLEAR_PURCHASE_HISTORY});
    }

    function saveCanceledOrdersParameters(data){
        return dispatch({type: SAVE_CANCELED_ORDER_PARAMETERS, data});
    }

    function saveNormalOrdersParameters(data){
        return dispatch({type: SAVE_NORMAL_ORDER_PARAMETERS, data});
    }

    function saveOrderHeaderForView(orderHeader){
        return dispatch({type: ORDER_HEADER_FOR_VIEW, data: orderHeader});
    }

    function getOrderHeaderForView() {
        let orderHeaderForView = [];
        if(validate.isNotEmpty(purchaseHistory) && validate.isNotEmpty(purchaseHistory.orderHeaderForView)) {
            orderHeaderForView = purchaseHistory.orderHeaderForView;
        }
        return  orderHeaderForView;
    }
    return Object.freeze({
        savePurchaseHistory,
        saveNonPersistentPurchaseHistory,
        getPurchaseHistory,
        clearPurchaseHistory,
        saveCanceledOrdersParameters,
        saveNormalOrdersParameters,
        saveOrderHeaderForView,
        getOrderHeaderForView
    });

}