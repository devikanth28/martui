export const SHOPPING_CART_ITEMS = 'SHOPPING_CART_ITEMS';
export const RESET_SHOPPING_CART_INFO = 'RESET_SHOPPING_CART_INFO';
export const IS_PRESCRIPTION_STEP_REQUIRED = 'IS_PRESCRIPTION_STEP_REQUIRED';
export const COMPLIMENTARY_CART_ITEM = 'COMPLIMENTARY_CART_ITEM';
export const RESET_COMPLIMENTARY_CART_ITEM = 'RESET_COMPLIMENTARY_CART_ITEM';
const INITIAL_STATE = [];

export default (state = {}, action) => {
    switch (action.type) {
        case SHOPPING_CART_ITEMS:
            return {
                ...state,
                shoppingCartItem: action.data
            };
        case RESET_SHOPPING_CART_INFO:
            return {
                ...state,
                shoppingCartItem: INITIAL_STATE
            };
        case IS_PRESCRIPTION_STEP_REQUIRED:
            return {
                ...state,
                isPrescriptionStepRequired: action.data
            };
        case COMPLIMENTARY_CART_ITEM:
            return {
                ...state,
                complimentaryCartItem: action.data
            };
        case RESET_COMPLIMENTARY_CART_ITEM:
            return {
                ...state,
                complimentaryCartItem: {}
            };
        default:
            return state;
    }
}
