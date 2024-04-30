export const SET_USER_INFO = 'SET_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const SET_USER_CONTACT_DETAILS = 'SET_USER_CONTACT_DETAILS';
export const RESET_USER_CONTACT_DETAILS = 'RESET_USER_CONTACT_DETAILS';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            };
        case RESET_USER_INFO:
            return {
                ...state,
                userContactDetails: INITIAL_STATE,
                userInfo: INITIAL_STATE
            };
        case SET_USER_CONTACT_DETAILS:
            return {
                ...state,
                userContactDetails: action.data
            };
        case RESET_USER_CONTACT_DETAILS:
            return {
                ...state,
                userContactDetails: INITIAL_STATE
            };
        default:
            return state;
    }
}