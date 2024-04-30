export const SAVE_LAB_ORDERS = 'SET_LAB_ORDERS';
export const CLEAR_LAB_ORDERS = 'CLEAR_LAB_ORDERS';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_LAB_ORDERS:
            return {
                ...state, ...action.data
            };
        case CLEAR_LAB_ORDERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}