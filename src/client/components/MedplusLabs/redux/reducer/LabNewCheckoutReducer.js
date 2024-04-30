export const LAB_SHOPPING_CART= 'LAB_SHOPPING_CART';
export const CLEAR_LAB_SHOPPING_CART = 'CLEAR_LAB_SHOPPING_CART';
export const IS_NEW_ADDRESS_ADDED = 'IS_NEW_ADDRESS_ADDED';
export const SET_VISIT_TYPE = 'SET_VISIT_TYPE';
export const SET_NEW_ADDRESS = 'SET_NEW_ADDRESS';
export const REMOVE_VISIT_TYPE = 'REMOVE_VISIT_TYPE';
export const SAVE_LAB_ORDER_ID = 'SAVE_LAB_ORDER_ID';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LAB_SHOPPING_CART:
            return {
                ...state,
                labShoppingCart: action.data
            };
        case SET_VISIT_TYPE:
            return {
                ...state,
                visitType: action.data
            };
        case REMOVE_VISIT_TYPE:
            return {
                ...state,
                visitType : undefined
            };
        case SET_NEW_ADDRESS:
            return {
                ...state,
                newAddress : action.data
            };
        case SAVE_LAB_ORDER_ID:
            return {
                ...state,
                labOrderId : action.data
            };
        case CLEAR_LAB_SHOPPING_CART:
            return INITIAL_STATE;
        default:
            return state;
    }
}