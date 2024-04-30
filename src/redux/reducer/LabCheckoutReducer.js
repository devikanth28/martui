export const LAB_SHOPPING_CART= 'LAB_SHOPPING_CART';
export const CLEAR_LAB_SHOPPING_CART = 'CLEAR_LAB_SHOPPING_CART';
export const IS_NEW_ADDRESS_ADDED = 'IS_NEW_ADDRESS_ADDED';
export const REMOVE_NEW_ADDRESS = 'REMOVE_NEW_ADDRESS';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LAB_SHOPPING_CART:
            return {
                ...state,
                labShoppingCart: action.data
            };
        case IS_NEW_ADDRESS_ADDED:
            return {
                ...state,
                isNewAddressAdded: action.data
            };
        case CLEAR_LAB_SHOPPING_CART:
            return INITIAL_STATE;
        case REMOVE_NEW_ADDRESS:
            let obj = {...state}
            delete obj["newAddress"]
            return obj;
        default:
            return state;
    }
}