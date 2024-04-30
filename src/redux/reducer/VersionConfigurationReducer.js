export const SET_ALL_VERSION_DATA = "SET_ALL_VERSION_DATA";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_ALL_VERSION_DATA:
            return {
                ...state,
                versionData : action.data
            }
        default : 
            return state;
    }
}