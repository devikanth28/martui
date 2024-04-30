export const SET_COOKIE_VERSION_IN_REDUX = "SET_COOKIE_VERSION_IN_REDUX";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_COOKIE_VERSION_IN_REDUX:
            return {
                ...state,
                cookieVersion : action.data
            }
        default : 
            return state;
    }
}