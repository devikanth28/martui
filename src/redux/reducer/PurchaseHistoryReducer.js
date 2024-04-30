export const SAVE_PURCHASE_HISTORY = 'SET_PRESCRIPTION_OPTION_DETAILS';
export const CLEAR_PURCHASE_HISTORY = 'RESET_PRESCRIPTION_OPTION_DETAILS';
export const SAVE_NON_PERSISTENT_PURCHASE_HISTORY = "SAVE_NON_PERSISTENT_PURCHASE_HISTORY";
export const SAVE_CANCELED_ORDER_PARAMETERS = "SAVE_CANCELED_ORDER_PARAMETERS";
export const SAVE_NORMAL_ORDER_PARAMETERS = "SAVE_NORMAL_ORDER_PARAMETERS";
export const ORDER_HEADER_FOR_VIEW = "ORDER_HEADER_FOR_VIEW";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_PURCHASE_HISTORY:
            return {
                ...state, ...action.data
            };
        case CLEAR_PURCHASE_HISTORY:
            return INITIAL_STATE;
        case SAVE_NON_PERSISTENT_PURCHASE_HISTORY:
            return {
                ...state, ...action.data
            }
        case SAVE_CANCELED_ORDER_PARAMETERS:
            return {
                ...state, ...action.data
            }
        case SAVE_NORMAL_ORDER_PARAMETERS:
            return {
                ...state, ...action.data
            }
        case ORDER_HEADER_FOR_VIEW:
            return {
                ...state,
                orderHeaderForView: action.data
            };
        default:
            return state;
    }

}