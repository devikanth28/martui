export const SAVE_DISPLAY_ORDER_ID_FOR_TRACKING = "SAVE_DISPLAY_ORDER_ID_FOR_TRACKING";
export const SAVE_ORDER_ID_FOR_TRACKING = "SAVE_ORDER_ID_FOR_TRACKING";
export const SAVE_ORDER_INFO_FOR_TRACKING = "SAVE_ORDER_INFO_FOR_TRACKING";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case SAVE_DISPLAY_ORDER_ID_FOR_TRACKING :
            return {
                ...state,
                displayOrderId: action.data
            }
        case SAVE_ORDER_ID_FOR_TRACKING :
            return {
                ...state,
                orderId: action.data
            }
        case SAVE_ORDER_INFO_FOR_TRACKING :
            return {
                ...state,
                orderInfo: action.data
            }
        default:
            return state;
    }
}