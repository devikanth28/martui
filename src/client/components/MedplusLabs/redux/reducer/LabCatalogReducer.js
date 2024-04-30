export const SET_SUBSCRIBED ="SET_SUBSCRIBED";
export const TOP_LEVEL_CATEGORIES = 'TOP_LEVEL_CATEGORIES';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       
        case SET_SUBSCRIBED:
            return {
                ...state,
                isSubscribed: action.data
            };
        case TOP_LEVEL_CATEGORIES:
            return {
                ...state,
                topLevelCategories : action.data
            };
        default:
            return state;
    }
}