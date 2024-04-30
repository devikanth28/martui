import { useSelector, useDispatch } from 'react-redux';
import { SAVE_LAB_ORDERS, CLEAR_LAB_ORDERS} from '../reducer/LabOrderReducer';

export default function LabOrderAction() {
    let labOrdersInfo = useSelector(state => state.labOrdersInfo);
    const dispatch = useDispatch();

    function saveLabOrders(labOrdersData) {
        return dispatch({type: SAVE_LAB_ORDERS, data: labOrdersData});
    }

    function getLabOrders() {
        return labOrdersInfo;
    }

    function clearLabOrders() {
        return dispatch({type: CLEAR_LAB_ORDERS});
    }

    return Object.freeze({
        saveLabOrders,
        getLabOrders,
        clearLabOrders,
    })
}