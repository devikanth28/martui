export const SET_PRESCRIPTION_OPTION_DETAILS = 'SET_PRESCRIPTION_OPTION_DETAILS';
export const RESET_PRESCRIPTION_OPTION_DETAILS = 'RESET_PRESCRIPTION_OPTION_DETAILS';
export const SELECTED_DELIVERY_INFO = 'SELECTED_DELIVERY_INFO';
export const RESET_SELECTED_DELIVERY_INTO = 'RESET_SELECTED_DELIVERY_INTO';
export const IS_NEW_ADDRESS_ADDED = 'IS_NEW_ADDRESS_ADDED';
export const RESET_CHECKOUT_DETAILS = 'RESET_CHECKOUT_DETAILS';
export const SET_CART_ID = "SET_CART_ID";
export const IS_PAYBACK_ORDER = "IS_PAYBACK_ORDER";
export const UPDATE_MWALLET_ORDER_DETAILS = "UPDATE_MWALLET_ORDER_DETAILS";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRESCRIPTION_OPTION_DETAILS:
            return {
                ...state,
                prescriptionOptionDetails: action.data
            };
        case RESET_PRESCRIPTION_OPTION_DETAILS:
            return {
                ...state,
                prescriptionOptionDetails: INITIAL_STATE
            };
        case SELECTED_DELIVERY_INFO:
            return {
                ...state,
                deliveryDetails: action.data
            };
        case RESET_SELECTED_DELIVERY_INTO:
            return {
                ...state,
                deliveryDetails: INITIAL_STATE
            };
        case IS_NEW_ADDRESS_ADDED:
            return {
                ...state,
                isNewAddressAdded: action.data
            };
        case RESET_CHECKOUT_DETAILS:
            return INITIAL_STATE;
        case SET_CART_ID:
            return {
                ...state,
                cartId: action.data
            }
        case IS_PAYBACK_ORDER:
            return {
                ...state,
                isPaybackOrder: action.data
            }
        case UPDATE_MWALLET_ORDER_DETAILS:
            return {
                ...state,
                mWalletDetails : {...state?.mWalletDetails ,...action.data}
            }       
        default:
            return state;
    }
}